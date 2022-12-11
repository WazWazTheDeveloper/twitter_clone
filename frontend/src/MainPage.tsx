import React from 'react';
import TwitSection from './components/TwitSection';
import './MainPage.css';
import './App.css';

function MainPage() {
    return (
        <div className='main-page'>
            <div className='main-page-left'></div>
            <div className='main-page-center'>
                <TwitSection />
            </div>
            <div className='main-page-right'></div>
        </div>
    )
}

export default MainPage;
