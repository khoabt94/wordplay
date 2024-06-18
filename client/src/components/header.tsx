import React from 'react'
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className='fixed top-0 h-20 w-full flex items-center justify-between py-5'>
      <Link href={'/'} className="flex-1">
        <Home size={40} strokeWidth={1.6} />
      </Link>
    </div>
  )
}
