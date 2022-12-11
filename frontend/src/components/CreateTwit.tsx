import { useState } from 'react';
import './CreateTwit.css';
import dayjs from "dayjs";

function CreateTwit(props:any) {
    const [twitContent, setTwitContent] = useState<string>("")
    
    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTwitContent(e.target.value)
    }

    function createTwit(e: React.SyntheticEvent) {
        e.preventDefault();
        let options: RequestInit = {
            method:'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "userName": "Steve Harvey",
                    "acountName": "@IAmSteveHarvey",
                    "timeposted": dayjs().valueOf(),
                    "content": twitContent,
                    "postImage": "https://pbs.twimg.com/media/FjYjMzdWIAAKvAx?format=jpg&name=small",
                }        
            )
        } 

        fetch("/twits/createTwit", options)
            .then((response) => {
                if(response.ok) {
                    props.updateTwits()
                }
            })
    }
    return (
        <div className='create-twit'>
            <form>
                <div className='create-twit-devider'>
                    <div className='create-twit-devider-photo'>
                        <img className='create-twit-img' src={"https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg"} alt="profile" />
                    </div>
                    <div className='create-twit-devider-text'>
                        <textarea onChange={handleContentChange} className='create-twit-content' placeholder={"What's happening"} name="contentText" />
                    </div>
                </div>
                <div className='create-twit-button-section'>
                    <button className='create-twit-submit' onClick={createTwit}> Twit </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTwit;