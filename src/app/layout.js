import '@/app/styles/app.scss'
import { Mulish } from "next/font/google";
import Header from "@/app/Header";
import {ContextProvider} from "@/components/Client";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
const mulish = Mulish({
  weight: ['200', '300', '700', '900'],
  subsets: ['latin'],
  display: "swap"
})

export const metadata = {
  title: 'ToDo App'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.className}>
       <ContextProvider>
         <>
           <Header/>
           {children}
           <ToastContainer/>
         </>
       </ContextProvider>
      </body>
    </html>
  )
}
