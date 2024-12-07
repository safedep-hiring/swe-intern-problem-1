from core.config import get_db
from schema import Command,CommandCreate
import sqlite3


class CommandServices:
    @staticmethod
    def post_command(command:CommandCreate):
        connection = get_db()
        cursor = connection.cursor()
        try:
            cursor.execute("INSERT INTO commands (command) VALUES (?)",(command.command,))
            connection.commit()
            id = cursor.lastrowid
            return Command(id = id,command = command.command)
        except sqlite3.Error as e:
            connection.rollback()
            return e
        finally:
            cursor.close()
            connection.close()


    @staticmethod
    def search_command(keyword:str):
        connection = get_db()
        cursor = connection.cursor()
        try:
            cursor.execute("SELECT * FROM commands WHERE command LIKE ?",('%'+keyword+'%',))
            connection.commit()
            rows = cursor.fetchall()
            commands = [Command(id = row[0], command = row[1]) for row in rows]
            return commands
        except sqlite3.Error as e:
            connection.rollback()
            return e
        finally:
            cursor.close()
            connection.close()
