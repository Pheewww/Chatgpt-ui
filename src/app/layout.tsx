import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '../components/Sidebar'
import ClientProvider from '../components/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: ' ChatGPT UI ',
  description: 'ChatGPT UI',
   creator: "Umang Singh",
  publisher: "Umang Singh",
  keywords: ["Next.js", "React", "JavaScript", "ChatGPT"],
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html>
    <body>
      <div className="flex">

        <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[16rem]">
                <Sidebar />
              </div>

              <ClientProvider/>

         <div className="bg-[#343541] flex-1">{children}</div>
      </div>
    </body>
   </html>
  )
}


// components/layout.tsx
// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import './globals.css'
// import Sidebar from '../components/Sidebar'
// import ClientProvider from '../components/ClientProvider'

// function RootLayout({ children }) {
//   return (
//     <ClientProvider>
//       <div className="flex">
//         <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[16rem]">
//           <Sidebar />
//         </div>
//         <div className="bg-[#343541] flex-1">{children}</div>
//       </div>
//     </ClientProvider>
//   );
// }

// export default RootLayout;
