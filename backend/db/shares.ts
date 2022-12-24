var sqlite3 = require("sqlite3").verbose();

// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");

function unsharePost(accountName: string, twitId: string): Promise<boolean> {
    console.log("disliked");

    const promise = new Promise<boolean>((resolve, reject) => {
        db.run(`DELETE FROM shares WHERE accountName=? and id=?`, [accountName, twitId],
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

function sharePost(accountName: string, twitId: string): Promise<boolean> {
    console.log("liked");

    const promise = new Promise<boolean>((resolve, reject) => {
        db.run(`
            INSERT INTO shares (accountName,id)
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

function isPostShared(accountName: string, twitId: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        db.each(`SELECT * FROM shares WHERE accountName=? and id=?`, [accountName, twitId],
            function (error: Error,row:any) {                  
                if (error) {
                    reject(new Error("error"));
                }
                resolve(true)
            },()=>{
                resolve(false)
            })
    })

    return promise

}

function getShareCount(postId: string):Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
        db.each(`
            SELECT COUNT(*)
            FROM twits
            INNER JOIN shares
            ON twits.id = shares.id
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

export { sharePost,getShareCount,isPostShared,unsharePost }