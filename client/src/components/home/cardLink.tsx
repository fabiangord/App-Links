import React from 'react'
import '@/assets/home/card.css'
import ButtonCard from '../other/buttonCard'

interface CardInterface {
    originLink: string
    shortLink: string
}

function CardLink({ originLink, shortLink }: CardInterface) {
    return (
        <main>
            <section className='header-card'>
                <h3>
                    <span className='name-card'>
                        Link Original:
                    </span>
                    {originLink}
                </h3>
                <span>
                    <span className='name-card'>
                        Short Original:
                    </span>
                    {shortLink}
                </span>
            </section>
            <section>
                <ButtonCard name='Copiar' />
                <ButtonCard name='Eliminar' />
            </section>
        </main>
    )
}

export default CardLink