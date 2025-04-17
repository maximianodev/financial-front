import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import '../styles/globals.css'

const ubuntu = Geist({
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
