
import logging
from flask import Flask
from config import Config
from extensions import db, jwt, migrate
from flask_cors import CORS


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    # Verify database host without exposing credentials
    from sqlalchemy.engine import make_url
    print(
        "Flask database host:",
        make_url(app.config["SQLALCHEMY_DATABASE_URI"]).host
    )

    # Logging setup
    logging.basicConfig(
        level=logging.DEBUG,
        format='%(asctime)s [%(levelname)s] %(message)s'
    )

    # CORS configuration
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:3000",
                    "http://127.0.0.1:5000"
                ]
            }
        },
        supports_credentials=True,
        methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type"]
    )


    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    from app.users.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    with app.app_context():

        # Import ALL model modules here.
        from app.users.models import User
        from app.repositories import models as repository_models  # noqa: F401  (T-32)

        # Import your other model modules here.
        # Example:
        # from app.projects.models import Project
        # from app.systems.models import System

        logging.info("Database extensions initialized.")

    # CLI: flask --app run seed-repositories [--reset]  (T-32)
    from app.repositories.seed import seed_repositories_command
    app.cli.add_command(seed_repositories_command)

    return app
