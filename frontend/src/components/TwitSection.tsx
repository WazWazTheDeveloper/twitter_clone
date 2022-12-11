import Twit from './Twit';
import CreateTwit from './CreateTwit';
import { useEffect, useState } from 'react';
import { TwitProps } from './Twit'
import {getTwits} from '../api/Twits'

function TwitSection(props: any) {
    const [twits, setTwits] = useState<TwitProps[]>([])

    useEffect(() => {
        getTwits().then(data => setTwits(data))
    }, [])

    function updateTwits() {
        getTwits().then(data => setTwits(data))
    }

    let twitsComp = twits.map((twit) => {
        console.log(twits)
        return (<Twit key={twit.id} data={twit} />)
    })
    return (
        <>
            <CreateTwit updateTwits={updateTwits}/>
            {twitsComp}
        </>
    )
}

export default TwitSection;