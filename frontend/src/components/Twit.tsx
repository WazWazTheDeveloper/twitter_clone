import React, { useState, useEffect } from 'react';
import './Twit.css';
import verification_icon from '../assets/verified.png'
import default_img from '../assets/default-img.png'
import dayjs from 'dayjs';
import { deleteTwit, updateTwits, likeTwit, retwitTwit, getTwit } from '../api/Twits'


export interface TwitProps {
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
    retwitId: string
}

interface Props {
    data: TwitProps
    updateTwits: Function
    accountName: string
    getUpdatedTwit: Function
    canContainRetwit : boolean
}

const emptyTwit = {
    id: "",
    isVerified: false,
    userName: "",
    acountName: "",
    timeposted: 0,
    content: "",
    accountImgUrl: "",
    postImage: "",
    numberOfComments: 0,
    numberOfRetwits: 0,
    numberOfLikes: 0,
    retwitId: ""
}

function Twit(props: Props) {
    const [isTwitEditeable, setIsTwitEditable] = useState<boolean>(false) //saves the state of if the twit is editable
    const [twitContent, setTwitContent] = useState<string>(props.data.content) // saves the state of the content on the editedtwit
    const [retwitData, setRetwitData] = useState<TwitProps>(emptyTwit);

    useEffect(() => {
        if (props.data.retwitId != "") {
            getTwit(props.data.retwitId).then((data) => { setRetwitData(data) })
        }
    }, [])

    /***
     * handles the actions when user click the like button
     */
    async function handleOnClickLike() {
        await likeTwit(props.data.id, props.accountName)
        props.getUpdatedTwit(props.data.id)
        props.updateTwits()
    }

    /***
    * handles the actions when user click the share button
    */
    async function handleOnClickRetwit() {
        // TODO: add the actual retwit part
        await retwitTwit(props.data.id, props.accountName, "").then(() => {
            props.updateTwits()
        })
    }



    /**
    * handles the action when user what to delete a twit
    */
    function handleDeleteTwit() {
        let id: string = props.data.id
        deleteTwit(id, props.updateTwits())
    }

    /**
    * handles the action when user click the edit/save button 
    */
    function handleEditTwit() {
        if (isTwitEditeable) {
            handleSaveEditedTwit()
        }
        setIsTwitEditable(!isTwitEditeable)
    }

    /**
    * handles the action when user edit the twits content
    */
    function handleTwitOnChange(e: React.ChangeEvent<HTMLDivElement>) {
        setTwitContent(e.target.innerHTML)
    }

    /**
    * handles the action when user when user saves the twit
    */
    function handleSaveEditedTwit() {
        updateTwits(props.data.id, twitContent)
            .then((response) => {
                if (response.ok) {
                    props.updateTwits()
                }
            })
    }


    /**
    * calculate how much time ago post was made and puts it into text form
    */
    function timeFromPost() {
        let time: string = "0s ago"
        if (dayjs().diff(dayjs(props.data.timeposted), "d") >= 1) {
            time = dayjs(props.data.timeposted).format("MMM D")
        }
        else if (dayjs().diff(dayjs(props.data.timeposted), "h") >= 1) {
            time = dayjs().diff(dayjs(props.data.timeposted), "h") + "h"
        }
        else if (dayjs().diff(dayjs(props.data.timeposted), "m") >= 1) {
            time = dayjs().diff(dayjs(props.data.timeposted), "m") + "m"
        }
        else if (dayjs().diff(dayjs(props.data.timeposted), "s") >= 0) {
            time = dayjs().diff(dayjs(props.data.timeposted), "s") + "s"
        }

        return time
    }
    return (
        <div className='twit-body'>
            <div className='twit-devider'>
                <div className='twit-devider-photo'>
                    {/* TODO: add check if accountImgUrl is a valid url*/}
                    <img className='twit-img' src={props.data.accountImgUrl != "" ? props.data.accountImgUrl : default_img} alt="profile" />
                </div>
                <div className='twit-devider-text'>
                    <div className='twit-devider-text-upperpart'>
                        <p className='twit-username'>{props.data.userName}</p>
                        {props.data.isVerified ? <img className='twit-verification_icon' src={verification_icon} alt="profile" /> : <></>}
                        <p className='twit-accountname'>{props.data.acountName}</p>
                        <p className='twit-timeposted'>{timeFromPost()}</p>
                    </div>
                    <div contentEditable={true} onInput={handleTwitOnChange} className='twit-content' suppressContentEditableWarning={true}>{props.data.content}</div>
                    <div className='twit-post-image-conteiner'>
                        {props.data.retwitId !== "" && props.canContainRetwit ? <Twit canContainRetwit={false} data={retwitData} getUpdatedTwit={props.getUpdatedTwit} accountName={props.accountName} updateTwits={props.updateTwits} /> : <></>}
                        {(props.data.postImage != "" && props.data.retwitId == "" || !props.canContainRetwit) ? <img className='twit-post-image' src={props.data.postImage} alt="" /> : <></>}
                    </div>
                </div>
                <div className='twit-options'>
                    <Dots deleteTwit={handleDeleteTwit} editTwit={handleEditTwit} isTwitEditeable={isTwitEditeable} />
                </div>
            </div>
            {/* TODO: add actions to buttons */}
            <div className='twit-buttons'>
                <div className='twit-button-comment'>
                    <div className='twit-button-comment-warper'>
                        <div className='svg-warper'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="twit-button-comment-svg"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                        </div>
                        <p>{props.data.numberOfComments}</p>
                    </div>
                </div>
                <div onClick={handleOnClickRetwit} className='twit-button-retwit'>
                    <div className='twit-button-retwit-warper'>
                        <div className='svg-warper'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
                        </div>
                        <p>{props.data.numberOfRetwits}</p>
                    </div>
                </div>
                <div onClick={handleOnClickLike} className='twit-button-like'>
                    <div className='twit-button-like-warper'>
                        <div className='svg-warper'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                        </div>
                        <p>{props.data.numberOfLikes}</p>
                    </div>
                </div>
                <div className='twit-button-share'>
                    <div className='twit-button-share-warper'>
                        <div className='svg-warper'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path></g></svg>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}


function Dots(props: any) {
    // TODO: add actions to buttons
    const [dropdownshow, setDropdownshow] = useState(false)

    function showDropdown() {
        setDropdownshow(!dropdownshow)
    }
    return (
        <div className="twit-dropdown">
            <div className="twit-dropbtn" onClick={showDropdown}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div id="twit-dropdown-menu" className={"twit-dropdown-menu" + (dropdownshow ? " show" : "")}>
                <div onClick={props.editTwit}>{props.isTwitEditeable ? "save" : "Edit"}</div>
                <div onClick={props.deleteTwit}>Delete</div>
            </div>
        </div>
    )
}

export default Twit;