"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTwit = exports.deleteTwit = exports.getTwits = exports.addTwit = void 0;
// Importing SQLite3 to our project.
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");
db.serialize(function () {
    // Create a table if doesn't exist
    db.run("CREATE TABLE IF NOT EXISTS twits (id TEXT,isVerified Boolean,userName TEXT,acountName TEXT,timeposted BIGINT, content TEXT,accountImgUrl TEXT,postImage TEXT,numberOfComments INT,numberOfRetwits INT,numberOfLikes INT)");
});
function addTwit(data) {
    const promise = new Promise((resolve, reject) => {
        // Add a twit to the table..
        db.run("INSERT INTO twits (id, isVerified, userName, acountName, timeposted, content, accountImgUrl, postImage, numberOfComments, numberOfRetwits, numberOfLikes) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [data.id,
            data.isVerified,
            data.userName,
            data.acountName,
            data.timeposted,
            data.content,
            data.accountImgUrl,
            data.postImage,
            data.numberOfComments,
            data.numberOfRetwits,
            data.numberOfLikes], function (error) {
            if (error) {
                reject(false);
            }
            else {
                resolve(true);
            }
        });
    });
    return promise;
}
exports.addTwit = addTwit;
function getTwits(twitsCount, twitsNotToGet) {
    const promise = new Promise((resolve, reject) => {
        let twits = [];
        db.each('select * from twits', (err, row) => {
            let twit = {
                id: row.id,
                isVerified: row.isVerified == 1,
                userName: row.userName,
                acountName: row.acountName,
                timeposted: row.timeposted,
                content: row.content,
                accountImgUrl: row.accountImgUrl,
                postImage: row.postImage,
                numberOfComments: row.numberOfComments,
                numberOfRetwits: row.numberOfRetwits,
                numberOfLikes: row.numberOfLikes
            };
            twits.push(twit);
        }, () => {
            resolve(twits);
        });
    });
    return promise;
}
exports.getTwits = getTwits;
function deleteTwit(idToDelete) {
    const promise = new Promise((resolve, reject) => {
        db.run('DELETE FROM twits WHERE (ID=?)', [idToDelete], function (error) {
            if (error) {
                reject(false);
            }
            else {
                resolve(true);
            }
        });
    });
    return promise;
}
exports.deleteTwit = deleteTwit;
function updateTwit(newData) {
    // const promise = new Promise<boolean>((resolve, reject) => {
    db.run('UPDATE twits SET content=?, postImage=? WHERE (id=?)', [newData.content, newData.postImage, newData.id]);
}
exports.updateTwit = updateTwit;
