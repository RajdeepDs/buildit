import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

import type { Metadata } from 'next'

import { ThemeProvider } from 'next-themes'

import { Toaster } from '@buildit/ui/toast'

import { PostHogReactProvider } from '@/lib/posthog/react'
import { TRPCReactProvider } from '@/lib/trpc/react'

import './globals.css'

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  preload: true,
  display: 'swap',
})

const calFont = localFont({
  src: '../fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
  preload: true,
  display: 'block',
  weight: '600',
})

const PostHogPageView = dynamic(() => import('@/lib/posthog/view'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'BuildIt',
  description: 'An open source collaborative project management tool.',
}

/**
 * The root layout of the entire application. This is where we wrap the entire application in the necessary providers.
 * @param props The props to the layout, which will be every page in this application.
 * @param props.children The children, which is the page the user is currently on.
 * @returns The layout of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' dir='ltr' suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --font-inter: ${interFont.style.fontFamily.replace(/'/g, '')};
            --font-cal: ${calFont.style.fontFamily.replace(/'/g, '')};
          }
        `}</style>
      </head>
      <PostHogReactProvider>
        <body>
          <PostHogPageView />

          <ThemeProvider
            attribute='class'
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </PostHogReactProvider>
    </html>
  )
}
