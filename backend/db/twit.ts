var sqlite3 = require("sqlite3").verbose();
import dayjs from "dayjs";
import { getLikeCount } from "./likes";
import { getAccountImgUrlFromAccountName } from "./users";
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");

interface TwitProps {
    id: string
    isVerified: boolean
    userName: string
    acountName: string
    timeposted: number
    content: string
    accountImgUrl: string
    postImage: string
    numberOfComments: number
    numberOfRetwits: number
    numberOfLikes: number
    retwitId: string
}           

/***
 * adding
 * 
 */
function addTwit(data: TwitProps): Promise<boolean> {
    let timePosted = dayjs().valueOf();
    //TODO: add check that account exist
    const promise = new Promise<boolean>((resolve, reject) => {
        // Add a twit to the table..
        db.run("INSERT INTO twits (id, isVerified, userName, acountName, timeposted, content, accountImgUrl, postImage, retwitId) VALUES (?,?,?,?,?,?,?,?,?)",
            [data.id,
            data.isVerified,
            data.userName,
            data.acountName,
            timePosted,
            data.content,
            data.accountImgUrl,
            data.postImage,
            data.retwitId],
            function (error: Error) {
                if (error) {
                    reject(new Error("error"));
                } else {
                    resolve(true)
                }
            }
        );
    });

    return promise

}

function getTwit(twitId: string): Promise<Promise<TwitProps>> {
    let twitPromiss: Promise<TwitProps>
    const promise = new Promise<Promise<TwitProps>>(async (resolve, reject) => {
        db.each(`SELECT * FROM twits WHERE id=?`, [twitId],
            async (err: Error, row: any) => {
                twitPromiss = new Promise<TwitProps>(async (resolve, reject) => {
                    let twit: TwitProps = {
                        id: row.id,
                        isVerified: row.isVerified == 1,
                        userName: row.userName,
                        acountName: row.acountName,
                        timeposted: row.timeposted,
                        content: row.content,
                        accountImgUrl: await getAccountImgUrlFromAccountName(row.acountName).then((ImgUrl) => ImgUrl).catch(() => ""),
                        postImage: row.postImage,
                        numberOfComments: 0,
                        numberOfRetwits: await getRetwitCount(row.id).then((shares) => shares).catch(() => 0),
                        numberOfLikes: await getLikeCount(row.id).then((likes) => likes).catch(() => 0),
                        retwitId: row.retwitId
                    }
                    resolve(twit)
                })
            }, async (error: Error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(twitPromiss)
                }
            })

        }
        )
    return promise
}

function getTwits(twitsCount?: number, twitsNotToGet?: Array<string>): Promise<Array<Promise<TwitProps>>> {
    const promise = new Promise<Array<Promise<TwitProps>>>(async (resolve, reject) => {
        let twits: Array<Promise<TwitProps>> = []
        db.each('select * from twits',
            async (err: Error, row: any) => {
                const twitPromiss = new Promise<TwitProps>(async (resolve, reject) => {
                    let twit: TwitProps = {
                        id: row.id,
                        isVerified: row.isVerified == 1,
                        userName: row.userName,
                        acountName: row.acountName,
                        timeposted: row.timeposted,
                        content: row.content,
                        accountImgUrl: await getAccountImgUrlFromAccountName(row.acountName).then((ImgUrl) => ImgUrl).catch((err) => {return""}),
                        postImage: row.postImage,
                        numberOfComments: 0,
                        numberOfRetwits: await getRetwitCount(row.id).then((shares) => shares).catch(() => 0),
                        numberOfLikes: await getLikeCount(row.id).then((likes) => likes).catch(() => 0),
                        retwitId: row.retwitId
                    }
                    resolve(twit)
                })
                twits.push(twitPromiss)
            }, async (error: Error) => {
                if (error) {
                    reject(new Error("error"));
                }
                else {
                    resolve(twits)
                }
            })
    });

    return promise

}

function deleteTwit(idToDelete: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        db.run('DELETE FROM twits WHERE (ID=?)', [idToDelete],
            function (error: Error) {
                if (error) {
                    reject(new Error("error"));
                } else {
                    resolve(true)
                }
            })
    })

    return promise
}

function updateTwit(newData: any) {
    // const promise = new Promise<boolean>((resolve, reject) => {
    db.run('UPDATE twits SET content=?, postImage=? WHERE (id=?)', [newData.content, newData.postImage, newData.id])
}

function retwitPost(accountName: string, twitId: string): Promise<boolean> {
    console.log("shared");

    const promise = new Promise<boolean>((resolve, reject) => {
        db.run(`
            INSERT INTO retwits (accountName,id)
            SELECT *
            FROM (VALUES (?,?))
            WHERE EXISTS (SELECT accountName from users WHERE accountName==?)
            `, [accountName, twitId, accountName],
            function (error: Error) {
                if (error) {
                    reject(new Error("error"));
                } else {
                    resolve(true)
                }
            })
    })

    return promise

}

function getRetwitCount(postId: string):Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
        db.each(`
            SELECT COUNT(*)
            FROM twits
            INNER JOIN retwits
            ON twits.id = retwits.id
            WHERE twits.id=?
                `, [postId],
            function (error: Error, row:any) {
                if (error) {
                    reject(new Error("error"));
                } else {
                    resolve(row["COUNT(*)"])
                }
            })
    })

    return promise
}
export { addTwit, getTwits, deleteTwit, updateTwit,getTwit ,retwitPost ,getRetwitCount}