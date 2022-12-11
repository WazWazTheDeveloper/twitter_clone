import Twit from './Twit';
import CreateTwit from './CreateTwit';
import { useEffect, useState } from 'react';
import { TwitProps } from './Twit'

function TwitSection(props: any) {
    const [twits, setTwits] = useState<TwitProps[]>([])

    useEffect(() => {
        fetch("/twits/getTwits")
            .then(response => response.json())
            .then(data => setTwits(data.twits))

    }, [])

    function updateTwits() {
        fetch("/twits/getTwits")
            .then(response => response.json())
            .then(data => setTwits(data.twits))
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