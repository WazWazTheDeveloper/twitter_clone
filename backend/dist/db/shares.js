"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsharePost = exports.isPostShared = exports.getShareCount = exports.sharePost = void 0;
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");
function unsharePost(accountName, twitId) {
    console.log("unShared");
    const promise = new Promise((resolve, reject) => {
        db.run(`DELETE FROM shares WHERE accountName=? and id=?`, [accountName, twitId], function (error) {
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
exports.unsharePost = unsharePost;
function sharePost(accountName, twitId) {
    console.log("shared");
    const promise = new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO shares (accountName,id)
            SELECT *
            FROM (VALUES (?,?))
            WHERE EXISTS (SELECT accountName from users WHERE accountName==?)
            `, [accountName, twitId, accountName], function (error) {
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
exports.sharePost = sharePost;
function isPostShared(accountName, twitId) {
    const promise = new Promise((resolve, reject) => {
        db.each(`SELECT * FROM shares WHERE accountName=? and id=?`, [accountName, twitId], function (error, row) {
            if (error) {
                reject(new Error("error"));
            }
            resolve(true);
        }, () => {
            resolve(false);
        });
    });
    return promise;
}
exports.isPostShared = isPostShared;
function getShareCount(postId) {
    const promise = new Promise((resolve, reject) => {
        db.each(`
            SELECT COUNT(*)
            FROM twits
            INNER JOIN shares
            ON twits.id = shares.id
            WHERE twits.id=?
                `, [postId], function (error, row) {
            if (error) {
                reject(new Error("error"));
            }
            else {
                resolve(row["COUNT(*)"]);
            }
        });
    });
    return promise;
}
exports.getShareCount = getShareCount;
