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
exports.updateTwit = exports.deleteTwit = exports.getTwits = exports.addTwit = void 0;
var sqlite3 = require("sqlite3").verbose();
const likes_1 = require("./likes");
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");
/***
 * adding
 *
 */
function addTwit(data) {
    //TODO: add check that account exist
    const promise = new Promise((resolve, reject) => {
        // Add a twit to the table..
        db.run("INSERT INTO twits (id, isVerified, userName, acountName, timeposted, content, accountImgUrl, postImage) VALUES (?,?,?,?,?,?,?,?)", [data.id,
            data.isVerified,
            data.userName,
            data.acountName,
            data.timeposted,
            data.content,
            data.accountImgUrl,
            data.postImage], function (error) {
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
exports.addTwit = addTwit;
function getTwits(twitsCount, twitsNotToGet) {
    const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        let twits = [];
        db.each('select * from twits', (err, row) => __awaiter(this, void 0, void 0, function* () {
            const twitPromiss = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let twit = {
                    id: row.id,
                    isVerified: row.isVerified == 1,
                    userName: row.userName,
                    acountName: row.acountName,
                    timeposted: row.timeposted,
                    content: row.content,
                    accountImgUrl: row.accountImgUrl,
                    postImage: row.postImage,
                    numberOfComments: 0,
                    numberOfRetwits: 0,
                    numberOfLikes: yield (0, likes_1.getLikeCount)(row.id).then((likes) => likes).catch(() => 0)
                };
                resolve(twit);
            }));
            twits.push(twitPromiss);
        }), (error) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                reject(new Error("error"));
            }
            else {
                resolve(twits);
            }
        }));
    }));
    return promise;
}
exports.getTwits = getTwits;
function deleteTwit(idToDelete) {
    const promise = new Promise((resolve, reject) => {
        db.run('DELETE FROM twits WHERE (ID=?)', [idToDelete], function (error) {
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
exports.deleteTwit = deleteTwit;
function updateTwit(newData) {
    // const promise = new Promise<boolean>((resolve, reject) => {
    db.run('UPDATE twits SET content=?, postImage=? WHERE (id=?)', [newData.content, newData.postImage, newData.id]);
}
exports.updateTwit = updateTwit;
