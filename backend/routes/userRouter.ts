import express, { Request, Response } from "express";
const router = express.Router()
import { v4 as uuidv4 } from 'uuid'
import { User, createUserInDB } from "../db/users";

router.post('/createUser', (req: Request, res: Response) => {
    // TODO: add check for un defined
    let body = req.body
    let user: User = {
        email: body.email,
        password: body.password,
        userName: body.userName,
        accountName: body.accountName,
        accountImgUrl: body.accountImgUrl,
    }


    createUserInDB(user)
        .then((seccseful) => {
            if (seccseful) {
                res.status(201)
                res.send(user.accountName);
                console.log("user created");
            }
            else {
                res.status(406)
                res.send("");
                console.log("failed to create a user");
            }
        }).catch(error => console.log(error.message));
})

module.exports = router