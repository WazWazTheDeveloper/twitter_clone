import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 5000;

// TODO: bring the creation of the db tables to here

app.use(express.json());
const twitsRouter = require('./routes/twitsRouter')
const userRouter = require('./routes/userRouter')

app.use("/twits", twitsRouter)
app.use("/users", userRouter)

// create a GET route
app.get('/express_backend', (req: Request, res: Response) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})



// TODO: delete this part

// // Importing SQLite3 to our project.
// var sqlite3 = require("sqlite3").verbose();
// // Setting up a database for storing data.
// var db = new sqlite3.Database("./db/db.sqlite");
// console.log("lol");
// import { User, createUserInDB } from "./db/users";

// db.serialize(function () {
//   // Create a table if doesn't exist
//   db.run("CREATE TABLE IF NOT EXISTS twits (id TEXT,isVerified Boolean,userName TEXT,acountName TEXT,timeposted BIGINT, content TEXT,accountImgUrl TEXT,postImage TEXT,numberOfComments INT,numberOfRetwits INT,numberOfLikes INT)");
//   db.run("CREATE TABLE IF NOT EXISTS users (email TEXT NOT NULL, password TEXT NOT NULL, userName TEXT NOT NULL, accountName TEXT NOT NULL, accountImgUrl TEXT, UNIQUE(accountName))");
// })

// let user: User = {
//   email: "1",
//   password: "1",
//   userName: "1",
//   accountName: "1",
//   accountImgUrl: "1",
// }

// createUserInDB(user)
// .then((seccseful) => {
//     if (seccseful) {
//         console.log("user created");
//     }
//     else {
//         console.log("failed to create a user");
//     }
// }).catch(error => console.log(error.message));