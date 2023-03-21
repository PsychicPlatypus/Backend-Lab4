import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db.sqlite3");

// ● Add 4 users to the table.
// - User1, userID: id1, name: user1, role: student and password: password
// - User2, userID: id2, name: user2, role: student and password: password2
// - User3, userID: id3, name: user3, role: teacher and password: password3
// - Admin, userID: admin, name: admin, role: admin and password: admin

db.serialize(function () {
    db.run(
        "CREATE TABLE if not exists users (id INTEGER PRIMARY KEY AUTOINCREMENT, userID TEXT, name TEXT, role TEXT, password TEXT)"
    );
});

const data = [
    { userId: "id1", name: "user1", role: "student", password: "password" },
    { userId: "id2", name: "user2", role: "student", password: "password2" },
    { userId: "id3", name: "user3", role: "teacher", password: "password3" },
    { userId: "admin", name: "admin", role: "admin", password: "admin" },
];

db.serialize(function () {
    data.forEach((user) => {
        db.run(
            "INSERT INTO users (userID, name, role, password) VALUES (?, ?, ?, ?)",
            [user.userId, user.name, user.role, user.password],
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    });
});
