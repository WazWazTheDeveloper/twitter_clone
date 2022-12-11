import { useState } from 'react';
import './CreateTwit.css';
import dayjs from "dayjs";
import {createTwit} from '../api/Twits'

function CreateTwit(props:any) {
    const [twitContent, setTwitContent] = useState<string>("")
    
    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTwitContent(e.target.value)
    }

    function handleCreateTwitButton(e: React.SyntheticEvent) {
        e.preventDefault();
        createTwit(twitContent,props.updateTwits())
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
                    <button className='create-twit-submit' onClick={handleCreateTwitButton}> Twit </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTwit;