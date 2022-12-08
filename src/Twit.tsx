import React, { useState } from 'react';
import './Twit.css';
import verification_icon from './assets/verified.png'

interface TwitProps {
    data: {
        id: number
        isVerified: boolean
        userName: string
        acountName: string
        timeposted: string
        content: string
        imgurl: string
        postImage: string
    }
}

function Twit(props: TwitProps) {
    return (
        <div className='twit-body'>
            <div className='twit-devider'>
                <div className='twit-devider-photo'>
                    <img className='twit-img' src={props.data.imgurl} alt="profile" />
                </div>
                <div className='twit-devider-text'>
                    <div className='twit-devider-text-upperpart'>
                        <p className='twit-username'>{props.data.userName}</p>
                        {props.data.isVerified ? <img className='twit-verification_icon' src={verification_icon} alt="profile" /> : <></>}
                        <p className='twit-accountname'>{props.data.acountName}</p>
                        <p className='twit-timeposted'>{props.data.timeposted}</p>
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



        </div>
    )
}

function Dots(props: any) {
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