import React from 'react'
import '@/assets/other/buttonCard.css'

interface ButtonCardInterface {
    name: string
}

function ButtonCard({ name }: ButtonCardInterface) {
    return (
        <button className='button-card'>{name}</button>
    )
}

export default ButtonCard