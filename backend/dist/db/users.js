"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUserInDB = void 0;
// Importing SQLite3 to our project.
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");
db.serialize(function () {
    // Create a table if doesn't exist
});
/***
 * create user in the database
 * @param user - data of user to be created
 */
function createUserInDB(user) {
    let email = String(user.email);
    let password = String(user.password);
    let userName = String(user.userName);
    let accountName = String(user.accountName);
    let accountImgUrl = String(user.accountImgUrl);
    const promise = new Promise((resolve, reject) => {
        if (email === "" || password === "" || userName === "" || accountName === "") {
            reject(new Error("invalid input"));
        }
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
/***
 * check if email and password match users
 * @param email - email to be checked
 * @param password - password to be checked
 */
function loginUser(email, password) {
    const promise = new Promise((resolve, reject) => {
        db.each(`SELECT accountName FROM users WHERE email=? AND password=?`, [email, password], function (error, row) {
            if (error) {
                reject(new Error("failed to login"));
            }
            else {
                resolve(row.accountName);
            }
        });
    });
    return promise;
}
exports.loginUser = loginUser;
