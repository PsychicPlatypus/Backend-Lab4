import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db.sqlite3");

export function getUsers() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export function getUser(userId) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE userId = ?", userId, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

export function addUser(rawData, password) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO users (userId, role, password) VALUES (?, ?, ?)",
            rawData.userId,
            rawData.role,
            password,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}
