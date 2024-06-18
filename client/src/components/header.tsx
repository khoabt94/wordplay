import React, { Suspense } from 'react'
import { Home } from 'lucide-react';
import Link from 'next/link';
import UserControl from './user-control';

export default function Header() {
  return (
    <div className='fixed top-0 h-20 right-0 left-0 flex items-center justify-between py-5 px-4'>
      <Link href={'/'} className="">
        <Home size={40} strokeWidth={1.6} />
      </Link>
      <Suspense>
        <UserControl />
      </Suspense>
    </div>
  )
}
