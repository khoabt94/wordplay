import { ReactNode } from 'react'
import Header from './header'

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen dark text-foreground bg-background">
      <Header />
      {children}
    </div >
  )
}

