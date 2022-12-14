"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_1 = require("../db/users");
router.post('/createUser', (req, res) => {
    // TODO: add check for un defined
    let body = req.body;
    let user = {
        email: body.email,
        password: body.password,
        userName: body.userName,
        accountName: body.accountName,
        accountImgUrl: body.accountImgUrl,
    };
    (0, users_1.createUserInDB)(user)
        .then((seccseful) => {
        if (seccseful) {
            res.status(201);
            res.send(user.accountName);
            console.log("user created");
        }
        else {
            res.status(406);
            res.send();
            console.log("failed to create a user");
        }
    }).catch(error => {
        console.log(error.message);
        res.status(406);
        res.send();
    });
});
router.post('/login', (req, res) => {
    let body = req.body;
    let email = body.email;
    let password = body.password;
    (0, users_1.loginUser)(email, password).then((accountName) => {
        res.status(201);
        res.send(accountName);
        console.log(`${accountName} logged in`);
    }).catch(error => {
        console.log(error.message);
        res.status(406);
        res.send("");
    });
});
router.get('/getAccountImgUrlFromAccountName', (req, res) => {
    let body = req.query;
    // @ts-ignore
    (0, users_1.getAccountImgUrlFromAccountName)(body.accountName).then((imgUrl) => {
        res.status(201);
        res.send(imgUrl);
        console.log(`${imgUrl} accountImg was sent`);
    }).catch(error => {
        console.log(error.message);
        res.status(406);
        res.send("");
    });
});
module.exports = router;
