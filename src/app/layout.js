import './globals.css'
import { Inter } from 'next/font/google'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Teste Alares',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
