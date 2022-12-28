import dayjs from "dayjs";
import { TwitProps } from '../components/Twit'

/**
 * send a request to create new twit
 * @param twitContent content of the new twit
 * @param next a function to be fired after twit was created successfully
 */
function createTwit(twitContent: string, accountName: string, twitImg=""): Promise<any> {
    let options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "acountName": accountName,
                "timeposted": dayjs().valueOf(),
                "content": twitContent,
                "postImage": twitImg,
                "retwitId": "",
            }
        )
    }

    return fetch("/twits/createTwit", options)
}

/**
 * fetch twits from server
 */
function getTwits(pageNumber = 1): Promise<TwitProps[]> {
    return fetch(`/twits/getTwits?pageNumber=${pageNumber}`)
        .then(response => response.json())
        .then(data => { return data })
}

function getTwit(twitId: string): Promise<TwitProps> {
    return fetch(`/twits/getTwit?twitId=${twitId}`)
        .then(response => response.json())
        .then(data => { return data })
}

/**
 * send a request to update twit
 * @returns a promise
 * @param idToUpdate id of the twit to update
 * @param twitContent the updated content of the twit
 */
function updateTwits(idToUpdate: string, twitContent: string): Promise<any> {
    let options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "id": idToUpdate,
                "content": twitContent,
                "postImage": "",
            }
        )
    }

    return fetch("/twits/updateTwit", options)
}
function deleteTwit(idToDelete: string, next?: Function): Promise<any> {
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

    return fetch("/twits/deleteTwit", options)
}

async function likeTwit(twitId: string, accountName: string): Promise<any> {
    let options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "twitId": twitId,
                "accountName": accountName,
            }
        )
    }

    return fetch("/twits/liketwit", options)
}

async function retwitTwit(twitId: string, accountName: string, twitContent: string): Promise<any> {

    let options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "acountName": accountName,
                "timeposted": dayjs().valueOf(),
                "content": twitContent,
                "postImage": "",
                "retwitId": twitId,
                "accountName": accountName,
            }
        )
    }

    return fetch("/twits/retwittwit", options)
}

export { createTwit, getTwits, deleteTwit, updateTwits, likeTwit, getTwit, retwitTwit }