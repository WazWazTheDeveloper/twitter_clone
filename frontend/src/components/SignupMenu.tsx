import React, { useState } from 'react';
import './SignupMenu.css'
import logo from '../assets/logo.svg'
import { User, RequestCreateNewAccount } from '../api/Users';
import { response } from 'express';

function SignupMenu(props: any) {
    const [emailInput, setEmailInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [userNameInput, setUserNameInput] = useState<string>("")
    const [accountNameInput, setAccountNameInput] = useState<string>("")
    const [accountImgUrlInput, setAccountImgUrlInput] = useState<string>("")

    function onSubmit(e:React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    function onEmailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailInput(e.target.value)
    }
    function onPasswordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value)
    }
    function onUserNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserNameInput(e.target.value)
    }
    function onccountNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAccountNameInput(e.target.value)
    }
    function onccountImgUrlInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAccountImgUrlInput(e.target.value)
    }
    function createAccount(e: React.SyntheticEvent<HTMLButtonElement>) {
        let user: User = {
            email: emailInput,
            password: passwordInput,
            userName: userNameInput,
            accountName: accountNameInput,
            accountImgUrl: accountImgUrlInput,
        }
        RequestCreateNewAccount(user)
            .then((response) => {
                if(response.ok) {
                    let responseJSON = response.json()
                    props.loginFunction(responseJSON);
                }
                else {
                    // TODO: add error when creation of account failed
                }
            })
    }
    return (
        <div className="signup-menu">
            <div className='signup-menu-menu'>
                <div className='signup-menu-menu-topbar'>
                    {/* TODO: change this to exit icon */}
                    <div onClick={props.closeWindow} className='signup-menu-menu-topbar-exit'></div>
                    <div className='signup-menu-menu-topbar-icon'>
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className='signup-menu-main'>
                    <form onSubmit={onSubmit}>
                        <label>email</label>
                        <input type="text" placeholder='email' value={emailInput} onChange={onEmailInputChange} />
                        <label>password</label>
                        <input type="text" placeholder='password' value={passwordInput} onChange={onPasswordInputChange} />
                        <label>userName</label>
                        <input type="text" placeholder='userName' value={userNameInput} onChange={onUserNameInputChange} />
                        <label>accountName</label>
                        <input type="text" placeholder='accountName' value={accountNameInput} onChange={onccountNameInputChange} />
                        <label>accountImgUrl</label>
                        <input type="text" placeholder='accountImgUrl' value={accountImgUrlInput} onChange={onccountImgUrlInputChange} />
                        <div className='signup-menu-main-button-warper'>
                            <button onClick={createAccount}>Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupMenu