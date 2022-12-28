// Importing SQLite3 to our project.
var sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
var db = new sqlite3.Database("./db/db.sqlite");

db.serialize(function () {
    // Create a table if doesn't exist
})

export interface User {
    email: string
    password: string
    userName: string
    accountName: string
    accountImgUrl: string
}


/***
 * create user in the database
 * @param user - data of user to be created
 */
function createUserInDB(user: User): Promise<boolean> {
    let email: string = String(user.email)
    let password: string = String(user.password)
    let userName: string = String(user.userName)
    let accountName: string = String(user.accountName)
    let accountImgUrl: string = String(user.accountImgUrl)


    const promise = new Promise<boolean>((resolve, reject) => {
        if(email==="" || password==="" || userName==="" || accountName==="") {
            reject(new Error("invalid input"))
        }
        db.run(`INSERT INTO users (email,password,userName,accountName,accountImgUrl) VALUES (?,?,?,?,?)`, [email, password, userName, accountName, accountImgUrl],
            function (error: Error) {
                if (error) {
                    reject(error)
                }
                else {
                    resolve(true)
                }
            }
        )
    })

    return promise
}

async function getUserFromAccountName(accountName:string) {
    const promise = new Promise<string>((resolve, reject) => {
        db.each('SELECT userName FROM users WHERE accountName=?',[accountName],
        function(error: Error,row:any){
            if (error) {
                    reject(new Error("failed to accses"))
            }
            else {
                    resolve(row.userName)
            }
        },()=>{console.log("done");})
    });

    return promise
}

async function getAccountImgUrlFromAccountName(accountName:string) {
    const promise = new Promise<string>((resolve, reject) => {
        db.each('SELECT accountImgUrl FROM users WHERE accountName=?',[accountName],
        function(error: Error,row:any){
            if (error) {
                    reject(new Error("failed to retrive"))
            }
            else {
                    resolve(row.accountImgUrl)
            }
        },()=>{reject(new Error("failed to accses"))})
    });

    return promise
}

/***
 * check if email and password match users
 * @param email - email to be checked
 * @param password - password to be checked
 */
function loginUser(email: string, password: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
        db.each(`SELECT accountName FROM users WHERE email=? AND password=?`, [email,password],
            function (error: Error,row:any) {
                if (error) {
                    reject(new Error("failed to login"))
                }
                else {
                    resolve(row.accountName)
                }
            }
        )
    })
    return promise
}

export { createUserInDB,loginUser,getUserFromAccountName,getAccountImgUrlFromAccountName}