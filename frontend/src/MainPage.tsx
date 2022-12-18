import React, { useState } from 'react';
import TwitSection from './components/TwitSection';
import SignupBar from './components/SignupBar';
import SignupMenu from './components/SignupMenu';
import LoginMenu from './components/LoginMenu';
import './MainPage.css';
import './App.css';

function MainPage() {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)
    const [showSignup, setShowSignup] = useState<Boolean>(false)
    const [showLogin, setShowLogin] = useState<Boolean>(false)
    const [accountName, setAccountName] = useState<string>("")

    
    function setLoginAccountName(_accountName:string) {
        setAccountName(_accountName);
        setShowSignup(false)
        console.log(`logged in as ${_accountName}`);
        setIsLoggedIn(true)
    }

    function changeShowSignup() {
        setShowSignup(!showSignup)
    }

    function changeShowLogin() {
        setShowLogin(!showLogin)
    }

    return (
        <>
            <div className={`main-page ${isLoggedIn ? "" : "main-page-with-signup-bar"}`}>
                <div className='main-page-left'></div>
                <div className='main-page-center'>
                    <TwitSection accountName={accountName}/>
                </div>
                <div className='main-page-right'></div>

                {isLoggedIn ? <></> : <SignupBar openLoginMenu={changeShowLogin} openSignupMenu={changeShowSignup} />}
            </div>
            {isLoggedIn ? <></> : <div className='main-page-signup-bar-spacer'></div>}
            {showSignup ? <SignupMenu closeWindow={changeShowSignup} loginFunction={setLoginAccountName} /> : <></>}
            {showLogin ? <LoginMenu closeWindow={changeShowLogin} loginFunction={setLoginAccountName} /> : <></>}
        </>
    )
}

export default MainPage;
