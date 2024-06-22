import { ReactNode, useMemo } from 'react'
import Header from '../header'
import { useAuthStore } from '@/stores'
import { siteConfig } from '@/configs/site'
import { useLocation } from 'react-router-dom'

const pathUnauth = [
  siteConfig.paths.login()
]

export function RootLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const unauth = useMemo(() => pathUnauth.includes(pathname), [pathname])
  return (
    <div className="min-h-screen dark text-foreground bg-background">
      {unauth ? children : (
        <>
          <Header />
          <div className="max-w-7xl px-4 mx-auto h-full overflow-y-hidden">
            {children}
          </div>
        </>
      )}
    </div >
  )
}

