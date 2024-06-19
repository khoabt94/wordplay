import React, { Suspense } from 'react'
import { Joystick } from 'lucide-react';
import Link from 'next/link';
import UserControl from './user-control';
// import AuthModal from './modal/auth-modal';
import Image from 'next/image';

export default function Header() {
  return (
    <div className='fixed top-0 h-20 right-0 left-0 flex items-center justify-between py-5 px-4 overflow-hidden'>
      <Link href={'/find'} className="">
        <Joystick size={40} strokeWidth={1.6} />
      </Link>
      <div className="">
        <Image src='/logo.webp' alt="Logo" width={180} height={180} quality={90} />
      </div>
      {/* <AuthModal /> */}
      <Suspense>
        <UserControl />
      </Suspense>
    </div>
  )
}
