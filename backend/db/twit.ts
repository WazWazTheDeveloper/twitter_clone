var sqlite3 = require("sqlite3").verbose();
import dayjs from "dayjs";
import { getLikeCount } from "./likes";
import { getShareCount } from "./shares";
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
        db.run("INSERT INTO twits (id, isVerified, userName, acountName, timeposted, content, accountImgUrl, postImage) VALUES (?,?,?,?,?,?,?,?)",
            [data.id,
            data.isVerified,
            data.userName,
            data.acountName,
            timePosted,
            data.content,
            data.accountImgUrl,
            data.postImage],
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
                        numberOfRetwits: await getShareCount(row.id).then((shares) => shares).catch(() => 0),
                        numberOfLikes: await getLikeCount(row.id).then((likes) => likes).catch(() => 0)
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
                        accountImgUrl: await getAccountImgUrlFromAccountName(row.acountName).then((ImgUrl) => ImgUrl).catch((err) => {console.log(err); return""}),
                        postImage: row.postImage,
                        numberOfComments: 0,
                        numberOfRetwits: await getShareCount(row.id).then((shares) => shares).catch(() => 0),
                        numberOfLikes: await getLikeCount(row.id).then((likes) => likes).catch(() => 0)
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
export { addTwit, getTwits, deleteTwit, updateTwit,getTwit }