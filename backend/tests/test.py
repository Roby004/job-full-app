import os
from dotenv import load_dotenv

load_dotenv()

print("✅ DB_NAME =", os.getenv("DB_NAME"))
