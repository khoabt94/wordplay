'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function Transition({ children }: { children: ReactNode }) {
  return <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ ease: 'easeInOut', duration: 0.3 }}
    className='pt-20'
  >
    {children}
  </motion.div>
}