import React, { useState } from 'react';
import './Twit.css';
import verification_icon from './assets/verified.png'
import dayjs from 'dayjs';

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
}

interface Props {
    data: TwitProps
}

function Twit(props: Props) {


    function timeFromPost(){
        let time:string = "0s ago"
        if(dayjs().diff(dayjs(props.data.timeposted),"y") >= 1) {
            time = dayjs().diff(dayjs(props.data.timeposted),"y") + "y ago"
        }
        else if(dayjs().diff(dayjs(props.data.timeposted),"m") >= 1) {
            time = dayjs().diff(dayjs(props.data.timeposted),"m") + "m ago"
        }
        else if(dayjs().diff(dayjs(props.data.timeposted),"w") >= 1) {
            time = dayjs().diff(dayjs(props.data.timeposted),"w") + "w ago"
        }
        else if(dayjs().diff(dayjs(props.data.timeposted),"d") >= 1) {
            time = dayjs().diff(dayjs(props.data.timeposted),"d") + "d ago"
        }
        else if(dayjs().diff(dayjs(props.data.timeposted),"s") >= 0) {
            time = dayjs().diff(dayjs(props.data.timeposted),"s") + "s ago"
        }

        return time
    }
    return (
        <div className='twit-body'>
            <div className='twit-devider'>
                <div className='twit-devider-photo'>
                    <img className='twit-img' src={props.data.accountImgUrl} alt="profile" />
                </div>
                <div className='twit-devider-text'>
                    <div className='twit-devider-text-upperpart'>
                        <p className='twit-username'>{props.data.userName}</p>
                        {props.data.isVerified ? <img className='twit-verification_icon' src={verification_icon} alt="profile" /> : <></>}
                        <p className='twit-accountname'>{props.data.acountName}</p>
                        <p className='twit-timeposted'>{timeFromPost()}</p>
                    </div>
                    <p className='twit-content'>{props.data.content}</p>
                    <div className='twit-post-image-conteiner'>
                        <img className='twit-post-image' src={props.data.postImage} alt="" />
                    </div>
                </div>
                <div className='twit-options'>
                    <Dots />
                </div>
            </div>
            {/* TODO: add actions to buttons*/}
            <div className='twit-buttons'>
                <div className='twit-button-comment'>
                    <div className='twit-button-comment-warper'>
                        <div className='svg-warper'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="twit-button-comment-svg"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                        </div>
                        <p>{props.data.numberOfComments}</p>
                    </div>
                </div>
                <div className='twit-button-retwit'>
                    <div className='twit-button-retwit-warper'>
                        <div className='svg-warper'>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>
                        </div>
                        <p>{props.data.numberOfRetwits}</p>
                    </div>
                </div>
                <div className='twit-button-like'>
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
                <div>Edit</div>
                <div>Delete</div>
            </div>
        </div>
    )
}

export default Twit;