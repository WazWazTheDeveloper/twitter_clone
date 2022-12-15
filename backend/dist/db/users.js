"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserInDB = void 0;
// Importing SQLite3 to our project.
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");
db.serialize(function () {
    // Create a table if doesn't exist
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT NOT NULL, password TEXT NOT NULL, userName TEXT NOT NULL, accountName TEXT NOT NULL, accountImgUrl TEXT, UNIQUE(accountName))");
});
function createUserInDB(user) {
    let email = String(user.email);
    let password = String(user.password);
    let userName = String(user.userName);
    let accountName = String(user.accountName);
    let accountImgUrl = String(user.accountImgUrl);
    const promise = new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (email,password,userName,accountName,accountImgUrl) VALUES (?,?,?,?,?)`, [email, password, userName, accountName, accountImgUrl], function (error) {
            if (error) {
                reject(new Error("error"));
            }
            else {
                resolve(true);
            }
        });
    });
    return promise;
}
exports.createUserInDB = createUserInDB;
