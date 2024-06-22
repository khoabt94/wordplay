'use client'

import { Joystick } from 'lucide-react';
import { Suspense, useMemo } from 'react';
// import UserControl from './user-control';
import { useLocation } from 'react-router-dom';
import UserControl from './user-control';

const pathToHideHeader = [
  '/login'
]

export default function Header() {
  const { pathname } = useLocation()
  const show = useMemo(() => !pathToHideHeader.includes(pathname), [pathname])
  if (!show) return <></>
  return (
    <div className='h-20 max-w-7xl flex items-center justify-between py-5 px-4 overflow-hidden mx-auto'>
      <Joystick size={40} strokeWidth={1.6} />
      <div className="">
        <img src='/logo.webp' alt="Logo" width={180} height={180} />
      </div>
      <Suspense>
        <UserControl />
      </Suspense>
    </div>
  )
}