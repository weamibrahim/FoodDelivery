import React from 'react'
import {motion} from "framer-motion"
export default function Loader() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    }}
  >
    <div className='absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/4 '><img width={150}  src='/pngwing.com (10).png'/></div>
  </motion.div>
  )
}
