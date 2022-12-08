import React, { useState } from 'react';
import { deflate } from 'zlib';
import './CreateTwit.css';

function CreateTwit() {
    function test(x:any) {
        console.log(x);
        x.preventDefault();
    }
    return (
        <div className='create-twit'>
            <form onSubmit={test}>
                <div className='create-twit-devider'>
                    <div className='create-twit-devider-photo'>
                        <img className='create-twit-img' src={"https://pbs.twimg.com/profile_images/1539412982190329862/90rLsmfU_400x400.jpg"} alt="profile" />
                    </div>
                    <div className='create-twit-devider-text'>
                        <textarea className='create-twit-content' placeholder={"What's happening"} name="contentText" onChange={test}/>
                    </div>
                </div>
                <div className='create-twit-button-section'>
                    <input className='create-twit-submit' type="submit" value="Twit"/>
                </div>
            </form>
        </div>
    )
}

export default CreateTwit;