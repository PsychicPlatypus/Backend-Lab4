import express from "express";
import cors from "cors";
import { getUsers } from "./database.js";

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

app.get("/admin", async function (_req, res) {
    const users = await getUsers();

    res.render("admin.ejs", { users: users });
});

app.get("/student1", function (req, res) {
    res.render("student1.ejs");
});

app.get("/student2", function (req, res) {
    res.render("student2.ejs");
});

app.get("/teacher", function (req, res) {
    res.render("teacher.ejs");
});

app.listen(5000, function () {
    console.log("Server started at port http://localhost:5000/");
});
