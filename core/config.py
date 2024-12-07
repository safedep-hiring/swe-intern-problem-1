import sqlite3

DATABASE_URL = "./database.db"

def get_db():
    connection = sqlite3.connect(DATABASE_URL)
    return connection
