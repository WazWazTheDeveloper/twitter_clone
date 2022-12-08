import React from 'react';
import Twit from './Twit';
import CreateTwit from './CreateTwit';
import './MainPage.css';
import './App.css';
import { isDataView } from 'util/types';

function MainPage() {
    //create twit components
    let twits = {
        twits: [
            {
                "id": 1,
                "isVerified": true,
                "userName": "Steve Harvey",
                "acountName": "@IAmSteveHarvey",
                "timeposted": "5h",
                "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
                "imgurl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
                "postImage" : "https://pbs.twimg.com/media/FjYjMzdWIAAKvAx?format=jpg&name=small",
            }, {
                "id": 2,
                "isVerified": true,
                "userName": "Vincent Kompany",
                "acountName": "@VincentKompany",
                "timeposted": "3h",
                "content": "The end of something special. To two genuinely amazing people, thank you for the moments and the many incredible memories. No doubt there are still plenty of pages to be written but it has been an honour to be a part of this chapter. 👊🏾",
                "imgurl": "https://pbs.twimg.com/profile_images/1541454752067764224/2ZCL4HGv_400x400.jpg",
                "postImage" : "",
            }, {
                "id": 3,
                "isVerified": true,
                "userName": "Steve Harvey",
                "acountName": "@IAmSteveHarvey",
                "timeposted": "5h",
                "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
                "imgurl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
                "postImage" : "https://pbs.twimg.com/media/FjY8hVYWQAIzqEH?format=jpg&name=small",
            }, {
                "id": 4,
                "isVerified": true,
                "userName": "Steve Harvey",
                "acountName": "@IAmSteveHarvey",
                "timeposted": "5h",
                "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
                "imgurl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
                "postImage" : "",
            }, {
                "id": 5,
                "isVerified": false,
                "userName": "Steve Harvey",
                "acountName": "@IAmSteveHarvey",
                "timeposted": "5h",
                "content": "Help me win an argument 🤣 Do you keep your dry cereal in the refrigerator?",
                "imgurl": "https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg",
                "postImage" : "",
            },
        ]
    }

    let twitsComp = twits.twits.map((data) => <Twit key={data.id} data={data} />)
    return (
        <div className='main-page'>
            <div className='main-page-left'></div>
            <div className='main-page-center'>
                <CreateTwit />
                {twitsComp}

            </div>
            <div className='main-page-right'></div>
        </div>
    )
}

export default MainPage;
