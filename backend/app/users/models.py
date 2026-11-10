from extensions import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# User table
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    roles = db.relationship(
        'Role',
        secondary='user_roles',
        back_populates='users',
        lazy='dynamic'
    )
    profile = db.relationship(
        'UserProfile',
        back_populates='user',
        uselist=False,
        cascade="all, delete-orphan"
    )

    # Password methods
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# Role table
class Role(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), unique=True, nullable=False, index=True)

    users = db.relationship(
        'User',
        secondary='user_roles',
        back_populates='roles',
        lazy='dynamic'
    )


# UserRoles table (association table)
class UserRoles(db.Model):
    __tablename__ = "user_roles"
    user_id = db.Column(
        db.BigInteger,
        db.ForeignKey('users.id', ondelete="CASCADE"),
        primary_key=True
    )
    role_id = db.Column(
        db.BigInteger,
        db.ForeignKey('roles.id', ondelete="CASCADE"),
        primary_key=True
    )


# UserProfile table
class UserProfile(db.Model):
    __tablename__ = "user_profiles"
    user_id = db.Column(
        db.BigInteger,
        db.ForeignKey('users.id', ondelete="CASCADE"),
        primary_key=True
    )
    first_name = db.Column(db.String(100), nullable=True)
    last_name = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    department = db.Column(db.String(100), nullable=True)
    designation = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)

    user = db.relationship('User', back_populates='profile')
