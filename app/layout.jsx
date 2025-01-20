import '@/lib/style/globals.css'
import { getServerSession } from 'next-auth'
import { Theme } from "@/components/providers/Theme"
import Session from "@/components/providers/Session"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"

export async function metadata() {
  return {
    title: "Neoflow",
    icons: [{ rel: 'icon', url: `/svg/logo.svg` }]
  };
}

export default async function RootLayout({ children }) {

  const session = await getServerSession()

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className='h-screen w-screen bg-background p-0 m-0 flex flex-col overflow-hidden'>
        <Theme
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Session session={session}>
            <Toaster position="top-center" />
            <div className='w-full h-screen overflow-auto text-foreground'>
              {children}
            </div>
          </Session>
        </Theme>
        <Analytics />
      </body>
    </html >
  )
}

/*
          <style className="hidden">
            {`
          :root{
            --backgroundBase: 184 65% 2.8%;
          --primaryBase: 184 100% 35%;
          --gradientBase: linear-gradient(to top left, #00b09b, #96c93d);
          --foregroundBase: 184 10% 96.75%
            }     
          `}
          </style>
*/