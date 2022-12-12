// Importing SQLite3 to our project.
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");

db.serialize(function () {
    // Create a table if doesn't exist
    db.run("CREATE TABLE IF NOT EXISTS twits (id TEXT,isVerified Boolean,userName TEXT,acountName TEXT,timeposted BIGINT, content TEXT,accountImgUrl TEXT,postImage TEXT,numberOfComments INT,numberOfRetwits INT,numberOfLikes INT)");
})

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

function addTwit(data: TwitProps): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        // Add a twit to the table.
        db.run("INSERT INTO twits (id, isVerified, userName, acountName, timeposted, content, accountImgUrl, postImage, numberOfComments, numberOfRetwits, numberOfLikes) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [data.id,
            data.isVerified,
            data.userName,
            data.acountName,
            data.timeposted,
            data.content,
            data.accountImgUrl,
            data.postImage,
            data.numberOfComments,
            data.numberOfRetwits,
            data.numberOfLikes],
            function (error: Error) {
                if (error) {
                    reject(false);
                } else {
                    resolve(true)
                }
            }
        );
    });

    return promise

}

function getTwits(twitsCount?: number, twitsNotToGet?: Array<string>): Promise<Array<TwitProps>> {
    const promise = new Promise<Array<TwitProps>>((resolve, reject) => {
        let twits: Array<TwitProps> = []
        db.each('select * from twits',
            (err: Error, row: any) => {
                let twit: TwitProps = {
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
                }
                twits.push(twit)
            }, () => {
                resolve(twits)
            })
    });

    return promise

}

function deleteTwit(idToDelete: string): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        db.run('DELETE FROM twits WHERE (ID=?)', [idToDelete],
            function (error: Error) {
                if (error) {
                    reject(false);
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
export { addTwit, getTwits, deleteTwit, updateTwit }