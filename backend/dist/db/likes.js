"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikePost = exports.isPostLiked = exports.getLikeCount = exports.likePost = void 0;
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");
function dislikePost(accountName, twitId) {
    console.log("disliked");
    const promise = new Promise((resolve, reject) => {
        db.run(`DELETE FROM likes WHERE accountName=? and id=?`, [accountName, twitId], function (error) {
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
exports.dislikePost = dislikePost;
function likePost(accountName, twitId) {
    console.log("liked");
    const promise = new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO likes (accountName,id)
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
exports.likePost = likePost;
function isPostLiked(accountName, twitId) {
    const promise = new Promise((resolve, reject) => {
        db.each(`SELECT * FROM likes WHERE accountName=? and id=?`, [accountName, twitId], function (error, row) {
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
exports.isPostLiked = isPostLiked;
function getLikeCount(postId) {
    const promise = new Promise((resolve, reject) => {
        db.each(`
            SELECT COUNT(*)
            FROM twits
            INNER JOIN likes
            ON twits.id = likes.id
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
exports.getLikeCount = getLikeCount;
