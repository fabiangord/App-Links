'use client'

import React from 'react'
import '@/app/home/globals.css'
import '@/assets/login/formLogin.css'
import { POST } from '@/libs/fetch'
import { FieldValues, useForm } from 'react-hook-form'
import { LoginFormTitle, LoginType } from '@/types/types'
import { validationLogin } from '@/schemas/loginValidation'
import { useRouter, usePathname } from 'next/navigation'
import { tokenAuth } from '@/context/auth'


function LoginForm({ title, button, nickname = false }: LoginFormTitle) {

    const { register, handleSubmit } = useForm()

    const { replace } = useRouter()

    const pathname = usePathname()

    const { signUp, token } = tokenAuth()


    const onSubmit = handleSubmit(async (data: FieldValues) => {

        if (pathname === '/login') {
            const validatedInfo = validationLogin(data as LoginType)

            console.log(validatedInfo)

            const login = await signUp(validatedInfo)

            console.log(login)
            console.log(token)

            // replace('/home')

        } else if (pathname === '/register') {
            const validatedInfo = validationLogin(data as LoginType)

            const register = await POST('http://localhost:3500/api/register', validatedInfo)

            if (register.status !== 200) {
                console.log('error')
            }

            console.log(validatedInfo)
            console.log(register)
            replace('/login')
        }
    })

    return (
        <form onSubmit={onSubmit}>
            <h1>{title}</h1>
            <input type="email" placeholder='Ingrese e-mail' id='email' {...register('email')} />
            <input type="password" placeholder="Ingrese password" id='password' {...register('password')} />

            {nickname && (
                <input type="text" placeholder="Ingrese nickname" id='nickname' {...register('nickname')} />
            )}

            <button className='button-form' type='submit'>{button}</button>
        </form>
    )
}

export default LoginForm;