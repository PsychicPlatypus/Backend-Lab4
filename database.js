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
