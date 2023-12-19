import React from 'react'
import LoginForm from '@/components/login/formLogin'

function RegisterComponent() {
    return (
        <>
            <LoginForm title='Register App' button='Registrar' nickname={true} />
        </>
    )
}

export default RegisterComponent