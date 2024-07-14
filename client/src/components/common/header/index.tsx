'use client'

import { Joystick } from 'lucide-react';
import { Suspense, useMemo } from 'react';
import { siteConfig } from '@/configs/site';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserControl from '../user-control';
import { motion } from 'framer-motion'
import './header.styles.css'

const pathToHide = [
  siteConfig.paths.findMatch(),
  siteConfig.paths.matchParent(),
]


export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const shouldHideJoinMatch = useMemo(() => {
    return pathToHide.some(path => pathname.includes(path))
  }, [pathname])

  return (
    <div className='h-20 max-w-7xl flex items-center justify-between py-5 px-4 overflow-hidden mx-auto'>
      {shouldHideJoinMatch ? (
        <Link to={siteConfig.paths.home()} className="">
          <img src='/logo.webp' alt="Logo" width={180} height={180} />
        </Link>
      ) : (
        <motion.button
          onClick={() => navigate(siteConfig.paths.findMatch())}
          className='text-lg font-semibold glow-on-hover'
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95,
            rotate: '2.5deg'
          }}
        >
          PLAY
        </motion.button>
      )}

      <div className="hidden md:block">
        <img src='/logo.webp' alt="Logo" width={180} height={180} />
      </div>
      <Suspense>
        <UserControl />
      </Suspense>
    </div>
  )
}
