import Twit from './Twit';
import CreateTwit from './CreateTwit';
import { useEffect, useState } from 'react';
import { TwitProps } from './Twit'
import { getTwits, getTwit } from '../api/Twits'

function TwitSection(props: any) {
    const [twits, setTwits] = useState<TwitProps[]>([])

    /**
     * fetch data for twits
     */
    useEffect(() => {
        getTwits().then(data => setTwits(data))
    }, [])

    /**
     * update twits when called
     */
    function updateTwits() {
        getTwits().then(data => setTwits(data))
    }

    /***
     * sends a request to update a specipic twit
     */
    function getUpdatedTwit(twitId: string) {
        getTwit(twitId).then(data => {
            setTwits(twits.map((oldTwit) => {
                if(oldTwit.id == data.id) {
                    return data
                }
                return oldTwit
            }))
        })
    }

    /**
     * creates the twit elements
     */
    let twitsComp = twits.map((twit) => {
        return (<Twit canContainRetwit={true} accountName={props.accountName} getUpdatedTwit={getUpdatedTwit} key={twit.id} data={twit} updateTwits={updateTwits} />)
    })
    return (
        <>
            <CreateTwit accountName={props.accountName} updateTwits={updateTwits} />
            {twitsComp}
        </>
    )
}

export default TwitSection;