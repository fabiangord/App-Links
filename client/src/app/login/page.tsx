import React from 'react'
import LoginForm from '@/components/login/formLogin'

function LoginPage() {
    return (
        <>
            <LoginForm title='Login App' nickname={false} button='Ingresar' />
        </>
    )
}

export default LoginPage
