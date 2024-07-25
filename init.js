const Database = require("better-sqlite3")
const db = new Database("courses.db")


db.exec(`
    CREATE TABLE IF NOT EXISTS courses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        duration INTEGER,
        price INTEGER,
        cover TEXT
    )

`)

db.exec(`
        CREATE TABLE IF NOT EXISTS module(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titel TEXT,
        duration INTEGER,
        courseId INTEGER,
        FOREIGN KEY(courseId) REFERENCES courses(id) ON DELETE CASCADE
        )
    `)