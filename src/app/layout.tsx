import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import '../styles/globals.css'

const ubuntu = Ubuntu({
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Financeiro',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${ubuntu.className} antialiased`}>{children}</body>
    </html>
  )
}
