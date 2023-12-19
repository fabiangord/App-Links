import React from 'react'
import { GET } from '@/libs/fetch'
import CardLink from '@/components/home/cardLink'
import ButtonNewCard from '@/components/other/ButtonNewCard'

async function HomePage() {

  // const links = await GET('http://localhost:3500/api/links')

  // console.log(links)

  return (
    <>
      <section className='button-add-links'>
        <ButtonNewCard />
      </section>
      <section className='schema-cards'>
        <CardLink originLink='www.youtube.com' shortLink='asd6a2' />
        <CardLink originLink='www.youtube.com' shortLink='asd6a2' />
        <CardLink originLink='www.youtube.com' shortLink='asd6a2' />
        <CardLink originLink='www.youtube.com' shortLink='asd6a2' />
      </section>
    </>
  )
}

export default HomePage