"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");
db.serialize(function () {
    // Create a table if doesn't exist
    db.run("CREATE TABLE IF NOT EXISTS twits (id TEXT,isVerified Boolean,userName TEXT,acountName TEXT,timeposted BIGINT, content TEXT,accountImgUrl TEXT,postImage TEXT,UNIQUE(id))");
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT NOT NULL, password TEXT NOT NULL, userName TEXT NOT NULL, accountName TEXT NOT NULL, accountImgUrl TEXT, UNIQUE(accountName),UNIQUE(email))");
    db.run("CREATE TABLE IF NOT EXISTS likes (accountName TEXT NOT NULL , id TEXT NOT NULL,UNIQUE(accountName,id))");
});
app.use(express_1.default.json());
const twitsRouter = require('./routes/twitsRouter');
const userRouter = require('./routes/userRouter');
app.use("/twits", twitsRouter);
app.use("/users", userRouter);
// create a GET route
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// getLikeCount("761c2b4b-abaf-4c19-8f3c-e9f66dc12119").then((a) => console.log(a)).catch((err:any) => {console.log(err);
// });
