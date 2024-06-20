'use client'

import { Joystick } from 'lucide-react';
import { useMemo } from 'react';
// import UserControl from './user-control';
import AuthModal from '../modal/auth-modal';
import { useLocation } from 'react-router-dom';

const pathToHideHeader = [
  '/login'
]

export default function Header() {
  const { pathname } = useLocation()
  const show = useMemo(() => !pathToHideHeader.includes(pathname), [pathname])
  if (!show) return <></>
  return (
    <div className='h-20 w-full flex items-center justify-between py-5 px-4 overflow-hidden'>
      <Joystick size={40} strokeWidth={1.6} />
      <div className="">
        <img src='/logo.webp' alt="Logo" width={180} height={180} />
      </div>
      <AuthModal />
      {/* <Suspense>
        <UserControl />
      </Suspense> */}
    </div>
  )
}
