import express, { Request, Response } from "express";
const router = express.Router()
import { v4 as uuidv4 } from 'uuid'
import { isPostLiked, likePost, dislikePost } from "../db/likes";
import { addTwit, deleteTwit, getTwits, updateTwit, getTwit, retwitPost } from "../db/twit";
import { getAccountImgUrlFromAccountName, getUserFromAccountName } from "../db/users";

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


router.get('/', (req: Request, res: Response) => {
    res.send('yeet')
})

router.get('/getTwits', async (req: Request, res: Response) => {
    // add response based on pagenumber

    // TODO: add catch after then
    getTwits().then((data: any) => {
        Promise.all(data).then(data => {
            res.send(data)
            console.log("twits send");
        })
    })

})

router.get('/getTwit', async (req: Request, res: Response) => {
    // add response based on pagenumber
    if (req.query.twitId != undefined) {
        // @ts-ignore
        let id: string = req.query.twitId
        getTwit(id).then((data: any) => {
            res.send(data)
            console.log(`${id} was resend`);
            //may couse a problem of crashing later
        }).catch(() => {
            console.log("error");
        })
    }
})

router.post('/createTwit', async (req: Request, res: Response) => {

    let newTwit = {
        "id": uuidv4(),
        "isVerified": true,
        "userName": await getUserFromAccountName(req.body.acountName).then((userName) => userName).catch(() => ""),
        "acountName": req.body.acountName,
        "timeposted": req.body.timeposted,
        "content": req.body.content,
        "accountImgUrl": await getAccountImgUrlFromAccountName(req.body.acountName).then((ImgUrl) => ImgUrl).catch(() => ""),
        "postImage": req.body.postImage,
        "numberOfComments": 0,
        "numberOfRetwits": 0,
        "numberOfLikes": 0,
    }

    // TODO: add catch after then
    addTwit(newTwit).then(() => {
        res.status(201)
        res.send();
        console.log("twits created");
    })
})

router.post('/updateTwit', (req: Request, res: Response) => {
    // TODO: make it wait until the update is complate
    updateTwit(req.body)
    res.status(201)
    res.send();
    console.log("twits updated");


})

router.delete('/deleteTwit', (req: Request, res: Response) => {
    // TODO: add catch after then
    deleteTwit(req.body.id).then(() => {
        res.send();
        console.log("twits deleted");
    })

})

router.post('/liketwit', (req: Request, res: Response) => {
    let accountName = req.body.accountName
    let twitId = req.body.twitId
    isPostLiked(accountName, twitId).then((isLiked) => {
        if (isLiked) {
            dislikePost(accountName, twitId).then(() => {
                res.send();
                console.log(`${twitId} got a dislike`);
            })
        }
        else {
            likePost(accountName, twitId).then(() => {
                res.send();
                console.log(`${twitId} got a like`);
            })
        }

    }).catch(() => {
    })


})

router.post('/retwittwit', (req: Request, res: Response) => {
    let accountName = req.body.accountName
    let twitId = req.body.twitId
    retwitPost(accountName, twitId).then(() => {
        res.send();
        console.log(`${twitId} retwited`);
    })

    // isPostShared(accountName, twitId).then((isShared) => {
    //     if (isShared) {
    //         unsharePost(accountName, twitId).then(() => {
    //             res.send();
    //             console.log(`${twitId} unshared`);
    //         })
    //     }
    //     else {
    //     }


    // }).catch(() => {
    // })

})

module.exports = router