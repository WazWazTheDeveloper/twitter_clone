// Importing SQLite3 to our project.
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");

db.serialize(function () {
    // Create a table if doesn't exist
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT NOT NULL, password TEXT NOT NULL, userName TEXT NOT NULL, accountName TEXT NOT NULL, accountImgUrl TEXT, UNIQUE(accountName))");
})

export interface User {
    email: string
    password: string
    userName: string
    accountName: string
    accountImgUrl: string
}

function createUserInDB(user: User): Promise<boolean> {
    let email: string = String(user.email)
    let password: string = String(user.password)
    let userName: string = String(user.userName)
    let accountName: string = String(user.accountName)
    let accountImgUrl: string = String(user.accountImgUrl)


    const promise = new Promise<boolean>((resolve, reject) => {
        db.run(`INSERT INTO users (email,password,userName,accountName,accountImgUrl) VALUES (?,?,?,?,?)`, [email, password, userName, accountName, accountImgUrl],
            function (error: Error) {
                if (error) {
                    reject(new Error("error"))
                }
                else {
                    resolve(true)
                }
            }
        )
    })

    return promise
}

export { createUserInDB }