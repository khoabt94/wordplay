import { ReactNode } from 'react'
import Header from './header'

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen dark text-foreground bg-background">
      <Header />
      <div className="max-w-7xl px-4 mx-auto h-full overflow-y-hidden">
        {children}
      </div>
    </div >
  )
}

