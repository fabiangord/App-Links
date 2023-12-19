"use client"

import React, { createContext, useState, useContext } from "react";
import { POST } from "@/libs/fetch";
import { LoginType, TokenContextType } from "@/types/types";

const AuthContext = createContext<TokenContextType>({
    token: '',
    signUp: async () => { }
});

export const tokenAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [token, setToken] = useState(null)

    const signUp = async (data: LoginType) => {
        const login = await POST('http://localhost:3500/api/login', data)

        if (login.status !== 200) {
            throw new Error('error 400')
        }

        const { token } = login.data

        setToken(token)


    }

    return (
        <AuthContext.Provider value={{
            token,
            signUp
        }
        }>
            {children}
        </AuthContext.Provider>
    )
}