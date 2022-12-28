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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRetwitCount = exports.retwitPost = exports.getTwit = exports.updateTwit = exports.deleteTwit = exports.getTwits = exports.addTwit = void 0;
var sqlite3 = require("sqlite3").verbose();
const dayjs_1 = __importDefault(require("dayjs"));
const likes_1 = require("./likes");
const users_1 = require("./users");
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");
/***
 * adding
 *
 */
function addTwit(data) {
    let timePosted = (0, dayjs_1.default)().valueOf();
    //TODO: add check that account exist
    const promise = new Promise((resolve, reject) => {
        // Add a twit to the table..
        db.run("INSERT INTO twits (id, isVerified, userName, acountName, timeposted, content, accountImgUrl, postImage, retwitId) VALUES (?,?,?,?,?,?,?,?,?)", [data.id,
            data.isVerified,
            data.userName,
            data.acountName,
            timePosted,
            data.content,
            data.accountImgUrl,
            data.postImage,
            data.retwitId], function (error) {
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
function getTwit(twitId) {
    let twitPromiss;
    const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        db.each(`SELECT * FROM twits WHERE id=?`, [twitId], (err, row) => __awaiter(this, void 0, void 0, function* () {
            twitPromiss = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let twit = {
                    id: row.id,
                    isVerified: row.isVerified == 1,
                    userName: row.userName,
                    acountName: row.acountName,
                    timeposted: row.timeposted,
                    content: row.content,
                    accountImgUrl: yield (0, users_1.getAccountImgUrlFromAccountName)(row.acountName).then((ImgUrl) => ImgUrl).catch(() => ""),
                    postImage: row.postImage,
                    numberOfComments: 0,
                    numberOfRetwits: yield getRetwitCount(row.id).then((shares) => shares).catch(() => 0),
                    numberOfLikes: yield (0, likes_1.getLikeCount)(row.id).then((likes) => likes).catch(() => 0),
                    retwitId: row.retwitId
                };
                resolve(twit);
            }));
        }), (error) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                reject(error);
            }
            else {
                resolve(twitPromiss);
            }
        }));
    }));
    return promise;
}
exports.getTwit = getTwit;
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
                    accountImgUrl: yield (0, users_1.getAccountImgUrlFromAccountName)(row.acountName).then((ImgUrl) => ImgUrl).catch((err) => { return ""; }),
                    postImage: row.postImage,
                    numberOfComments: 0,
                    numberOfRetwits: yield getRetwitCount(row.id).then((shares) => shares).catch(() => 0),
                    numberOfLikes: yield (0, likes_1.getLikeCount)(row.id).then((likes) => likes).catch(() => 0),
                    retwitId: row.retwitId
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
function retwitPost(accountName, twitId) {
    console.log("shared");
    const promise = new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO retwits (accountName,id)
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
exports.retwitPost = retwitPost;
function getRetwitCount(postId) {
    const promise = new Promise((resolve, reject) => {
        db.each(`
            SELECT COUNT(*)
            FROM twits
            INNER JOIN retwits
            ON twits.id = retwits.id
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
exports.getRetwitCount = getRetwitCount;
