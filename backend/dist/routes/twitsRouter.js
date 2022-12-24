"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const uuid_1 = require("uuid");
const likes_1 = require("../db/likes");
const shares_1 = require("../db/shares");
const twit_1 = require("../db/twit");
const users_1 = require("../db/users");
// TODO: dont remove just in case of need for a banch of data
// const temp_data: any = {
//     twits: [
//         {
//             "id": "761c2b4b-abaf-4c19-8f3c-e9f66dc12119",
//             "isVerified": true,
//             "userName": "Steve Harvey",
//             "acountName": "1",
//             "timeposted": 1670719416318,
//             "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
//             "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
//             "postImage": "https://pbs.twimg.com/media/FjYjMzdWIAAKvAx?format=jpg&name=small",
//             "numberOfComments": 140,
//             "numberOfRetwits": 160,
//             "numberOfLikes": 69,
//         }, {
//             "id": "ae3f0880-7c2f-4224-b7b2-25b9b6d55dc6",
//             "isVerified": true,
//             "userName": "Vincent Kompany",
//             "acountName": "@VincentKompany",
//             "timeposted": 1670719416318,
//             "content": "The end of something special. To two genuinely amazing people, thank you for the moments and the many incredible memories. No doubt there are still plenty of pages to be written but it has been an honour to be a part of this chapter. 👊🏾",
//             "accountImgUrl": "https://pbs.twimg.com/profile_images/1541454752067764224/2ZCL4HGv_400x400.jpg",
//             "postImage": "",
//             "numberOfComments": 687,
//             "numberOfRetwits": 453,
//             "numberOfLikes": 420,
//         }, {
//             "id": "55e0b9dc-2522-4ed4-9d68-9440fa755248",
//             "isVerified": true,
//             "userName": "Steve Harvey",
//             "acountName": "1",
//             "timeposted": 1670719416318,
//             "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
//             "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
//             "postImage": "https://pbs.twimg.com/media/FjY8hVYWQAIzqEH?format=jpg&name=small",
//             "numberOfComments": 150,
//             "numberOfRetwits": 120,
//             "numberOfLikes": 69,
//         }, {
//             "id": "66060519-defa-4cb4-80e4-5a9ef83e687d",
//             "isVerified": true,
//             "userName": "Steve Harvey",
//             "acountName": "1",
//             "timeposted": 1670719416318,
//             "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
//             "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
//             "postImage": "",
//             "numberOfComments": 150,
//             "numberOfRetwits": 120,
//             "numberOfLikes": 69,
//         }, {
//             "id": "e502e9d3-a5db-4343-8ded-65fbdf88166e",
//             "isVerified": false,
//             "userName": "Steve Harvey",
//             "acountName": "1",
//             "timeposted": 1670719416318,
//             "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
//             "accountImgUrl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
//             "postImage": "",
//             "numberOfComments": 150,
//             "numberOfRetwits": 120,
//             "numberOfLikes": 69,
//         },
//     ]
// }
// for (let i = 0; i < temp_data.twits.length; i++) {
//     addTwit(temp_data.twits[i])
// }
router.get('/', (req, res) => {
    res.send('yeet');
});
router.get('/getTwits', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // add response based on pagenumber
    // TODO: add catch after then
    (0, twit_1.getTwits)().then((data) => {
        Promise.all(data).then(data => {
            res.send(data);
            console.log("twits send");
        });
    });
}));
router.get('/getTwit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // add response based on pagenumber
    if (req.query.twitId != undefined) {
        // @ts-ignore
        let id = req.query.twitId;
        (0, twit_1.getTwit)(id).then((data) => {
            res.send(data);
            console.log(`${id} was resend`);
            //may couse a problem of crashing later
        }).catch(() => {
            console.log("error");
        });
    }
}));
router.post('/createTwit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newTwit = {
        "id": (0, uuid_1.v4)(),
        "isVerified": true,
        "userName": yield (0, users_1.getUserFromAccountName)(req.body.acountName).then((userName) => userName).catch(() => ""),
        "acountName": req.body.acountName,
        "timeposted": req.body.timeposted,
        "content": req.body.content,
        "accountImgUrl": yield (0, users_1.getAccountImgUrlFromAccountName)(req.body.acountName).then((ImgUrl) => ImgUrl).catch(() => ""),
        "postImage": req.body.postImage,
        "numberOfComments": 0,
        "numberOfRetwits": 0,
        "numberOfLikes": 0,
    };
    // TODO: add catch after then
    (0, twit_1.addTwit)(newTwit).then(() => {
        res.status(201);
        res.send();
        console.log("twits created");
    });
}));
router.post('/updateTwit', (req, res) => {
    // TODO: make it wait until the update is complate
    (0, twit_1.updateTwit)(req.body);
    res.status(201);
    res.send();
    console.log("twits updated");
});
router.delete('/deleteTwit', (req, res) => {
    // TODO: add catch after then
    (0, twit_1.deleteTwit)(req.body.id).then(() => {
        res.send();
        console.log("twits deleted");
    });
});
router.post('/liketwit', (req, res) => {
    let accountName = req.body.accountName;
    let twitId = req.body.twitId;
    (0, likes_1.isPostLiked)(accountName, twitId).then((isLiked) => {
        if (isLiked) {
            (0, likes_1.dislikePost)(accountName, twitId).then(() => {
                res.send();
                console.log(`${twitId} got a dislike`);
            });
        }
        else {
            (0, likes_1.likePost)(accountName, twitId).then(() => {
                res.send();
                console.log(`${twitId} got a like`);
            });
        }
    }).catch(() => {
    });
});
router.post('/sharetwit', (req, res) => {
    let accountName = req.body.accountName;
    let twitId = req.body.twitId;
    (0, shares_1.isPostShared)(accountName, twitId).then((isShared) => {
        if (isShared) {
            (0, shares_1.unsharePost)(accountName, twitId).then(() => {
                res.send();
                console.log(`${twitId} unshared`);
            });
        }
        else {
            (0, shares_1.sharePost)(accountName, twitId).then(() => {
                res.send();
                console.log(`${twitId} shared`);
            });
        }
    }).catch(() => {
    });
});
module.exports = router;
