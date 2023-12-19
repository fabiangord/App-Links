import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/home/globals.css'
import HeaderComponent from '@/components/home/headerHomePage'
import NavbarComponent from '@/components/home/navbar'
import { AuthProvider } from '@/context/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Url Page',
  description: 'Enjoy this web!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <AuthProvider>
          <section>
            <HeaderComponent />
            <NavbarComponent />
          </section>

          {children}

        </AuthProvider>

      </body>
    </html>
  )
}
