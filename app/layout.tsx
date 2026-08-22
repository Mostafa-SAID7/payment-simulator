import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { MainContent } from '@/components/main-content'
import { SidebarProvider } from '@/contexts/sidebar-context'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FinPay - Payment Simulator',
  description: 'Enterprise payment platform simulator for ACH, RTGS, and WPS payments',
  generator: 'v0.app',
  icons: {
    icon: {
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="app-shell font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <Sidebar />
            <Header />
            <MainContent>
              {children}
            </MainContent>
          </SidebarProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
