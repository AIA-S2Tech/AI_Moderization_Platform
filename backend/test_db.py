
import os
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL

# Explicitly load backend/.env
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

print("Environment file:", ENV_PATH)
print("File exists:", ENV_PATH.exists())

load_dotenv(ENV_PATH, override=True)

# Check loaded values
print("DB_HOST:", repr(os.getenv("DB_HOST")))
print("DB_PORT:", repr(os.getenv("DB_PORT")))
print("DB_USER:", repr(os.getenv("DB_USER")))
print("DB_NAME:", repr(os.getenv("DB_NAME")))

# Build connection URL
url = URL.create(
    drivername="postgresql+psycopg2",
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT", "5432")),
    database=os.getenv("DB_NAME")
)

engine = create_engine(url)

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version()"))
        print("\nPostgreSQL connected successfully!")
        print(result.fetchone()[0])

except Exception as error:
    print("\nDatabase connection failed:", error)

finally:
    engine.dispose()
