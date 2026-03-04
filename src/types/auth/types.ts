export type AuthBase = {
    email: string
    password: string
}

export type SignUpData = AuthBase & {
    nickname: string
}

export type SignInData = AuthBase
