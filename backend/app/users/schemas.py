from marshmallow import Schema, fields, validate

class RegisterSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True, validate=validate.Length(min=6))
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    phone = fields.String()
    department = fields.String()
    designation = fields.String()
    role_name = fields.String(required=True)  # e.g., "candidate"

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.String(required=True)

class UserProfileSchema(Schema):
    first_name = fields.String()
    last_name = fields.String()
    phone = fields.String()
    department = fields.String()
    designation = fields.String()

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email()
    is_active = fields.Boolean()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    roles = fields.List(fields.String())  # list of role names
    profile = fields.Nested(UserProfileSchema)
