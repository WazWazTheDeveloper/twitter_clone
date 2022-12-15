import React, { useState } from 'react';
import TwitSection from './components/TwitSection';
import SignupBar from './components/SignupBar';
import SignupMenu from './components/SignupMenu';
import './MainPage.css';
import './App.css';

function MainPage() {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)
    const [showSignup, setShowSignup] = useState<Boolean>(false)
    const [accountName, setAccountName] = useState<string>("")

    
    function login(_accountName:any) {
        _accountName.json().then((data:any) => console.log(data))
        

        // setAccountName(_accountName);
    }

    function changeShowSignup() {
        setShowSignup(!showSignup)
    }

    return (
        <>
            <div className={`main-page ${isLoggedIn ? "" : "main-page-with-signup-bar"}`}>
                <div className='main-page-left'></div>
                <div className='main-page-center'>
                    <TwitSection />
                </div>
                <div className='main-page-right'></div>

                {isLoggedIn ? <></> : <SignupBar openSignupMenu={changeShowSignup} />}
            </div>
            {isLoggedIn ? <></> : <div className='main-page-signup-bar-spacer'></div>}
            {showSignup ? <SignupMenu closeWindow={changeShowSignup} loginFunction={login} /> : <></>}
        </>
    )
}

export default MainPage;
