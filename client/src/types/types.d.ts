export type LoginFormTitle = {
    title: string
    button: string
    nickname: boolean
}

export type LoginType = {
    email: string
    password: string
}

export type TokenContextType = {
    token: string | null
    signUp: (data: LoginType) => Promise<void>
}