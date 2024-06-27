'use client'

import { Joystick } from 'lucide-react';
import { Suspense, useMemo } from 'react';
import { siteConfig } from '@/configs/site';
import { Link, useLocation } from 'react-router-dom';
import UserControl from '../user-control';

const pathToHide = [
  siteConfig.paths.findMatch(),
  siteConfig.paths.matchParent(),
]

export default function Header() {
  const { pathname } = useLocation()
  const shouldHideJoinMatch = useMemo(() => {
    return pathToHide.some(path => pathname.includes(path))
  }, [pathname])

  return (
    <div className='h-20 max-w-7xl flex items-center justify-between py-5 px-4 overflow-hidden mx-auto'>
      {shouldHideJoinMatch ? null : (
        <Link to={siteConfig.paths.findMatch()}>
          <Joystick size={40} strokeWidth={1.6} />
        </Link>
      )}

      <div className="">
        <img src='/logo.webp' alt="Logo" width={180} height={180} />
      </div>
      <Suspense>
        <UserControl />
      </Suspense>
    </div>
  )
}
