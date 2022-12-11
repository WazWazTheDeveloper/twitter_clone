import express, { Request, Response } from "express";
const router = express.Router()
import { v4 as uuidv4 } from 'uuid'

const temp_data: any = {
    twits: [
        {
            "id": "761c2b4b-abaf-4c19-8f3c-e9f66dc12119",
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
            "id": "ae3f0880-7c2f-4224-b7b2-25b9b6d55dc6",
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
            "id": "55e0b9dc-2522-4ed4-9d68-9440fa755248",
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
            "id": "66060519-defa-4cb4-80e4-5a9ef83e687d",
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
            "id": "e502e9d3-a5db-4343-8ded-65fbdf88166e",
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
}

router.get('/', (req: Request, res: Response) => {
    res.send('yeet')
})

router.get('/getTwits', (req: Request, res: Response) => {
    res.send(temp_data)
    console.log("twits were sent");

})

router.post('/createTwit', (req: Request, res: Response) => {
    let newTwit = {
        "id": uuidv4(),
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
    }     

    temp_data.twits.push(newTwit);

    res.status(201)
    res.send();
} )

router.delete('/deleteTwit', (req: Request, res: Response) => {
    console.log(req.body.id);
    for (let i = 0; i < temp_data.twits.length; i++) {
        if(temp_data.twits[i].id == req.body.id){
            temp_data.twits.splice(i,1)
        }
    }
    
    
    res.send();
} )

module.exports = router