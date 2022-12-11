"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const temp_data = {
    twits: [
        {
            "id": "1",
            "isVerified": true,
            "userName": "Steve Harvey",
            "acountName": "@IAmSteveHarvey",
            "timeposted": 1670719416318,
            "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
            "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
            "postImage": "https://pbs.twimg.com/media/FjYjMzdWIAAKvAx?format=jpg&name=small",
            "numberOfComments": 140,
            "numberOfRetwits": 160,
            "numberOfLikes": 69,
        }, {
            "id": "2",
            "isVerified": true,
            "userName": "Vincent Kompany",
            "acountName": "@VincentKompany",
            "timeposted": 1670719416318,
            "content": "The end of something special. To two genuinely amazing people, thank you for the moments and the many incredible memories. No doubt there are still plenty of pages to be written but it has been an honour to be a part of this chapter. 👊🏾",
            "accountImgUrl": "https://pbs.twimg.com/profile_images/1541454752067764224/2ZCL4HGv_400x400.jpg",
            "postImage": "",
            "numberOfComments": 687,
            "numberOfRetwits": 453,
            "numberOfLikes": 420,
        }, {
            "id": "3",
            "isVerified": true,
            "userName": "Steve Harvey",
            "acountName": "@IAmSteveHarvey",
            "timeposted": 1670719416318,
            "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
            "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
            "postImage": "https://pbs.twimg.com/media/FjY8hVYWQAIzqEH?format=jpg&name=small",
            "numberOfComments": 150,
            "numberOfRetwits": 120,
            "numberOfLikes": 69,
        }, {
            "id": "4",
            "isVerified": true,
            "userName": "Steve Harvey",
            "acountName": "@IAmSteveHarvey",
            "timeposted": 1670719416318,
            "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
            "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
            "postImage": "",
            "numberOfComments": 150,
            "numberOfRetwits": 120,
            "numberOfLikes": 69,
        }, {
            "id": "5",
            "isVerified": false,
            "userName": "Steve Harvey",
            "acountName": "@IAmSteveHarvey",
            "timeposted": 1670719416318,
            "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
            "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
            "postImage": "",
            "numberOfComments": 150,
            "numberOfRetwits": 120,
            "numberOfLikes": 69,
        },
    ]
};
router.get('/', (req, res) => {
    res.send('yeet');
});
router.get('/getTwits', (req, res) => {
    res.send(temp_data);
    console.log("twits were sent");
});
router.post('/createTwit', (req, res) => {
    let newTwit = {
        "id": temp_data.twits.count,
        "isVerified": true,
        "userName": req.body.userName,
        "acountName": req.body.acountName,
        "timeposted": req.body.timeposted,
        "content": req.body.content,
        "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
        "postImage": req.body.postImage,
        "numberOfComments": 0,
        "numberOfRetwits": 0,
        "numberOfLikes": 0,
    };
    temp_data.twits.push(newTwit);
    res.status(201);
    res.send();
});
module.exports = router;
