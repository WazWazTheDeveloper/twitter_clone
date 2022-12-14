import './SignupBar.css'

function SignupBar(props:any) {
    return(
        <div className='main-page-sign-up'>
                <div className='main-page-sign-up-text-warpper'>
                    <p>Don’t miss what’s happening</p>
                    <p>People on Twitter are the first to know.</p>
                </div>
                <div className='main-page-sign-up-button-warpper'>
                    <div>Log in</div>
                    <div onClick={props.openSignupMenu}>Sign up</div>
                </div>
            </div>
    )
}

export default SignupBar