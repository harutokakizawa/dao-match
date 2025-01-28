import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import ContextProvider from './context'
import { headers } from "next/headers";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DAO Match',
  description: 'Create and join working groups easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <ContextProvider cookies={cookies}>{children}</ContextProvider>
        </main>
      </body>
    </html>
  )
}

