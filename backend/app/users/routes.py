import logging
from flask import Blueprint, request, jsonify
from extensions import db
from app.users.models import User, Role, UserRoles, UserProfile
from app.users.schemas import RegisterSchema, LoginSchema, UserSchema
from marshmallow import ValidationError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from flask import session
from datetime import timedelta
import math

auth_bp = Blueprint('auth', __name__)
register_schema = RegisterSchema()
login_schema = LoginSchema()
user_schema = UserSchema()

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json(force=True)
        logging.debug(f"Register request data: {data}")
        validated_data = register_schema.load(data)
    except ValidationError as err:
        logging.warning(f"Validation error: {err.messages}")
        return jsonify(err.messages), 400

    if User.query.filter_by(email=validated_data['email']).first():
        return jsonify({"error": "Email already exists"}), 409

    # Create User
    user = User(email=validated_data['email'])
    user.set_password(validated_data['password'])
    db.session.add(user)
    db.session.flush()  # flush to get user.id

    DEFAULT_ROLE = "user"

    # Get role_name from request (may be missing / invalid)
    requested_role = validated_data.get("role_name")

    # Try requested role first
    role = None
    if requested_role:
        role = Role.query.filter_by(name=requested_role).first() if validated_data.get("role_name") else None

    # Fallback to USER if role not found or not provided
    if not role:
        role = Role.query.filter_by(name=DEFAULT_ROLE).first()

        # If USER role does not exist, create it
        if not role:
            role = Role(name=DEFAULT_ROLE)
            db.session.add(role)
            db.session.flush()

    # Assign role to user
    #user.roles.append(role)

    # Create UserProfile
    profile = UserProfile(
        user_id=user.id,
        first_name=validated_data['first_name'],
        last_name=validated_data['last_name'],
        phone=validated_data.get('phone'),
        department=validated_data.get('department'),
        designation=validated_data.get('designation')
    )
    db.session.add(profile)
    db.session.commit()

    logging.info(f"User {user.email} registered successfully.")
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json(force=True)
        validated_data = login_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    user = User.query.filter_by(email=validated_data['email']).first()
    if user and user.check_password(validated_data['password']):
        access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(days=1))  # <-- access token
        refresh_token = create_refresh_token(identity=str(user.id), expires_delta=timedelta(days=7))  # <-- refresh token

        session['user_id'] = user.id
        session['email'] = user.email

        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token,   # send refresh token to client
            "user": user_schema.dump(user)
        }), 200

    return jsonify({"error": "Invalid email or password"}), 401

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user_schema.dump(user)), 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # user_id =int(get_jwt_identity())
    # user = User.query.get(user_id)
    # if not user:
    #     return jsonify({"error": "User not found"}), 404
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)  # requires refresh token
def refresh():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id, expires_delta=timedelta(days=1))
    return jsonify({"access_token": new_access_token}), 200

@auth_bp.route('/admin/users', methods=['GET'])
@jwt_required()
def get_all_users():
    user_id = int(get_jwt_identity())
    current_user = User.query.get(user_id)
    # print("Current User Roles:- ", current_user, current_user.roles)
    if not current_user or not any(r.name == "super_admin" for r in current_user.roles):
        return jsonify({"error": "Forbidden"}), 403

    try:
        # ---------------- Query params ----------------
        page = request.args.get("page", default=1, type=int)
        limit = request.args.get("limit", default=5, type=int)

        offset = (page - 1) * limit

        # ---------------- Base query ----------------
        query = User.query.order_by(User.created_at.desc())

        total = query.count()

        users = query.offset(offset).limit(limit).all()

        return jsonify({
            "data": UserSchema(many=True).dump(users),
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total,
                "totalPages": math.ceil(total / limit)
            }
        }), 200

    except Exception as e:
        print("Error fetching users:", e)
        return jsonify({"error": "Internal server error"}), 500
@auth_bp.route('/admin/users/<int:user_id>/role', methods=['PUT'])
@jwt_required()
def update_user_role(user_id):
    current_user = User.query.get(int(get_jwt_identity()))

    if not any(r.name == "super_admin" for r in current_user.roles):
        return jsonify({"error": "Forbidden"}), 403

    data = request.get_json()
    role_name = data.get("role_name")

    valid_roles = ["user", "manager", "developer", "super_admin", "admin"]
    if role_name not in valid_roles:
        return jsonify({"error": "Invalid role"}), 400

    user = User.query.get_or_404(user_id)

    # ✅ Clear existing roles (dynamic relationship)
    for role in user.roles.all():
        user.roles.remove(role)

    role = Role.query.filter_by(name=role_name).first()
    if not role:
        role = Role(name=role_name)
        db.session.add(role)
        db.session.flush()

    user.roles.append(role)
    db.session.commit()

    return jsonify({"message": "Role updated successfully"}), 200
    
@auth_bp.route('/admin/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = User.query.get(int(get_jwt_identity()))

    if not any(r.name == "super_admin" for r in current_user.roles):
        return jsonify({"error": "Forbidden"}), 403

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200

@auth_bp.route("/settings/profile", methods=["GET"])
@jwt_required()
def get_profile():

    user_id = get_jwt_identity()

    profile = UserProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not profile:
        return jsonify({
            "success": False,
            "message": "Profile not found"
        }), 404

    return jsonify({
        "success": True,
        "data": {
            "first_name": profile.first_name,
            "last_name": profile.last_name,
            "phone": profile.phone,
            "department": profile.department,
            "designation": profile.designation,
            "email": profile.user.email
        }
    })

@auth_bp.route("/settings/profile", methods=["PUT"])
@jwt_required()
def update_profile():

    user_id = get_jwt_identity()

    data = request.get_json()

    profile = UserProfile.query.filter_by(
        user_id=user_id
    ).first()

    if not profile:
        return jsonify({
            "success": False,
            "message": "Profile not found"
        }), 404

    profile.first_name = data.get(
        "first_name",
        profile.first_name
    )

    profile.last_name = data.get(
        "last_name",
        profile.last_name
    )

    profile.phone = data.get(
        "phone",
        profile.phone
    )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Profile updated successfully"
    })