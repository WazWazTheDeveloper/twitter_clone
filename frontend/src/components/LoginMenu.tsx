import React, { useState } from 'react';
import './LoginMenu.css'
import logo from '../assets/logo.svg'
import { RequestLogin } from '../api/Users';
import { response } from 'express';

function LoginMenu(props: any) {
    const [emailInput, setEmailInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")

    function onSubmit(e:React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    function onEmailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailInput(e.target.value)
    }
    function onPasswordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value)
    }
    function handleLoginClick(e: React.SyntheticEvent<HTMLButtonElement>) {
        RequestLogin(emailInput,passwordInput)
        // TODO: finish this
            .then((response) => {
                if(response.ok) {
                    response.json().then((data) => props.loginFunction(data))
                    props.closeWindow()
                }
                else {
                    console.log("failed to log in");
                }
            })
    }
    return (
        <div className="login-menu">
            <div className='login-menu-menu'>
                <div className='login-menu-menu-topbar'>
                    {/* TODO: change this to exit icon */}
                    <div onClick={props.closeWindow} className='login-menu-menu-topbar-exit'></div>
                    <div className='login-menu-menu-topbar-icon'>
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className='login-menu-main'>
                    <form onSubmit={onSubmit}>
                        <label>email</label>
                        <input type="text" placeholder='email' value={emailInput} onChange={onEmailInputChange} />
                        <label>password</label>
                        <input type="text" placeholder='password' value={passwordInput} onChange={onPasswordInputChange} />
                        <div className='login-menu-main-button-warper'>
                            <button onClick={handleLoginClick}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginMenu