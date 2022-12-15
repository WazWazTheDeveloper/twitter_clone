export interface User {
    email: string
    password: string
    userName: string
    accountName: string
    accountImgUrl: string
}

function RequestCreateNewAccount(user: User) {
        let options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "email": user.email,
                    "password": user.password,
                    "userName": user.userName,
                    "accountName": user.accountName,
                    "accountImgUrl": user.accountImgUrl
                }
            )
        }

        return fetch("/users/createUser", options)
}

export { RequestCreateNewAccount }