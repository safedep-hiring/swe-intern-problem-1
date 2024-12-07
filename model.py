from core.config import get_db


def create_table():
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS commands(
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   command VARCHAR(20) NOT NULL
                   )
    """)
    connection.commit()
    cursor.close()
    connection.close()



