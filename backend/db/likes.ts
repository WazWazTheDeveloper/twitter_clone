var sqlite3 = require("sqlite3").verbose();

// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");

function dislikePost(accountName: string, twitId: string): Promise<boolean> {
    console.log("disliked");
    console.log(accountName);
    console.log(twitId);

    const promise = new Promise<boolean>((resolve, reject) => {
        db.run(`DELETE FROM likes WHERE accountName=? and id=?`, [accountName, twitId],
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

function likePost(accountName: string, twitId: string): Promise<boolean> {
    console.log("liked");
    
    console.log(accountName);
    console.log(twitId);

    const promise = new Promise<boolean>((resolve, reject) => {
        db.run(`
            INSERT INTO likes (accountName,id)
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

function isPostLiked(accountName: string, twitId: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        db.each(`SELECT * FROM likes WHERE accountName=? and id=?`, [accountName, twitId],
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

function getLikeCount(postId: string):Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
        db.each(`
            SELECT COUNT(*)
            FROM twits
            INNER JOIN likes
            ON twits.id = likes.id
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

export { likePost,getLikeCount,isPostLiked,dislikePost }