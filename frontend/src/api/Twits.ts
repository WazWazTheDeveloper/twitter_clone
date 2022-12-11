import dayjs from "dayjs";
import { TwitProps } from '../components/Twit'

function createTwit(twitContent: string, next: Function) {
    let options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "userName": "Steve Harvey",
                "acountName": "@IAmSteveHarvey",
                "timeposted": dayjs().valueOf(),
                "content": twitContent,
                "postImage": "https://pbs.twimg.com/media/FjYjMzdWIAAKvAx?format=jpg&name=small",
            }
        )
    }

    fetch("/twits/createTwit", options)
        .then((response) => {
            if (response.ok) {
                next()
            }
        })
}

function getTwits(): Promise<TwitProps[]> {
    return fetch("/twits/getTwits")
        .then(response => response.json())
        .then(data => {return data.twits})
}

function deleteTwit(idToDelete: string, next ?: Function) {
    let options: RequestInit = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "id": idToDelete
            }
        )
    }

    fetch("/twits/deleteTwit", options)
        .then((response) => {
            if (response.ok) {
                if(next){
                    next()
                }
            }
        })
}

export { createTwit ,getTwits, deleteTwit}