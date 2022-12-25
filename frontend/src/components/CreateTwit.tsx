import { useEffect, useState } from 'react';
import './CreateTwit.css';
import dayjs from "dayjs";
import { createTwit } from '../api/Twits'
import { RequestAccountImgUrlFromAccountName } from '../api/Users';
import default_img from '../assets/default-img.png'

function CreateTwit(props: any) {
    const [twitContent, setTwitContent] = useState<string>("") //saves the state of the content of the twit
    const [twitAccountImg, setTwitAccountImg] = useState<string>();

    useEffect(() => {
        getUserAccountImg()
    })

    /**
     * handles changes in the textarea elemts and save it into a state
     * @param e React.ChangeEvent<HTMLTextAreaElement>
     */
    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTwitContent(e.target.value)
    }

    /**
     * send a request to the server to create new twit
     * @param e React.SyntheticEvent
     */
    function handleCreateTwitButton(e: React.SyntheticEvent) {
        e.preventDefault();
        createTwit(twitContent, props.accountName)
            .then(() => props.updateTwits())
    }

    function getUserAccountImg() {
        if(props.accountName){
            RequestAccountImgUrlFromAccountName(props.accountName)
            .then(response => response.text())
            .then(data => { setTwitAccountImg(data) })
        }
        else {
            setTwitAccountImg("")
        }
    }

    return (
        <div className='create-twit'>
            <form>
                <div className='create-twit-devider'>
                    <div className='create-twit-devider-photo'>
                        <img className='create-twit-img' src={twitAccountImg !="" ? twitAccountImg:default_img} alt="profile" />
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