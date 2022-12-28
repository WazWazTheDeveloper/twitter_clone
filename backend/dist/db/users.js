"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountImgUrlFromAccountName = exports.getUserFromAccountName = exports.loginUser = exports.createUserInDB = void 0;
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
                reject(error);
            }
            else {
                resolve(true);
            }
        });
    });
    return promise;
}
exports.createUserInDB = createUserInDB;
function getUserFromAccountName(accountName) {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = new Promise((resolve, reject) => {
            db.each('SELECT userName FROM users WHERE accountName=?', [accountName], function (error, row) {
                if (error) {
                    reject(new Error("failed to accses"));
                }
                else {
                    resolve(row.userName);
                }
            }, () => { console.log("done"); });
        });
        return promise;
    });
}
exports.getUserFromAccountName = getUserFromAccountName;
function getAccountImgUrlFromAccountName(accountName) {
    return __awaiter(this, void 0, void 0, function* () {
        const promise = new Promise((resolve, reject) => {
            db.each('SELECT accountImgUrl FROM users WHERE accountName=?', [accountName], function (error, row) {
                if (error) {
                    reject(new Error("failed to retrive"));
                }
                else {
                    resolve(row.accountImgUrl);
                }
            }, () => { reject(new Error("failed to accses")); });
        });
        return promise;
    });
}
exports.getAccountImgUrlFromAccountName = getAccountImgUrlFromAccountName;
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
