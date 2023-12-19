import React from 'react'
import '../../assets/home/navbar.css'
import Link from 'next/link'

function NavbarComponent() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href={'/home'}>Home</Link >
                </li>
                <li>
                    <Link href={'/home/profile'}>Perfil</Link>
                </li>
                <li>
                    <a href="">Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarComponent