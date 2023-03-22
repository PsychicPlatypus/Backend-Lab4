import express from "express";
import cors from "cors";
import { getUsers, getUser, addUser } from "./database.js";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
config();

let currentToken = null;
let currentUser = null;

const app = express();
app.set("view-engine", "ejs");
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.static("public"));

app.get("/", authenticateToken, function (req, res) {
    res.render("start.ejs");
});

app.get("/identify", function (req, res) {
    res.render("identify.ejs");
});

app.post("/identify", async function (req, res) {
    const user = await getUser(req.body.userId);
    if (user == null) {
        return res.redirect("/identify");
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign(
                {
                    userId: user.userID,
                    role: user.role,
                },
                process.env.TOKEN
            );

            currentToken = token;
            currentUser = user;
            res.redirect(`/users/${user.userID}`);
        } else {
            res.redirect("/identify");
        }
    } catch {
        res.redirect("/identify");
    }
});

app.get("/users/:userId", async function (req, res) {
    const user = await getUser(req.params.userId);
    res.render("userPage.ejs", {
        user: user,
    });
});

app.get("/register", function (req, res) {
    res.render("register.ejs");
});

app.get("/admin", authenticateToken, async function (req, res) {
    if (req.user.role != "admin") {
        res.redirect("/identify");
        return;
    }
    const users = await getUsers();
    res.render("admin.ejs", { users: users });
});

app.get("/student1", authenticateToken, function (req, res) {
    if (!["student1", "teacher", "admin"].includes(req.user.role)) {
        res.redirect("/identify");
        return;
    }
    res.render("student1.ejs");
});

app.get("/student2", authenticateToken, function (req, res) {
    if (!["student2", "teacher", "admin"].includes(req.user.role)) {
        res.redirect("/identify");
        return;
    }
    res.render("student2.ejs", { user: currentUser });
});

app.get("/teacher", authenticateToken, function (req, res) {
    if (!["teacher", "admin"].includes(req.user.role)) {
        res.redirect("/identify");
        return;
    }
    res.render("teacher.ejs");
});

app.post("/register", async function (req, res) {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    addUser(req.body, hashedPassword);
    res.redirect("/identify");
});

app.listen(5000, function () {
    console.log("Server started at port http://localhost:5000/");
});

function authenticateToken(req, res, next) {
    if (currentToken == null) return res.redirect("/identify");
    jwt.verify(currentToken, process.env.TOKEN, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}
