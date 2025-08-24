'use client';

import { Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalLoading() {
  return (
    <motion.div
      className='fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5 z-50 min-h-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='relative flex items-center justify-center mb-8'
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Outer spinning ring with gradient */}
        <motion.div
          className='relative w-20 h-20 rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 p-1'
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className='w-full h-full rounded-full bg-background flex items-center justify-center'>
            {/* Inner pulsing ring */}
            <motion.div
              className='w-16 h-16 rounded-full border-2 border-primary/40 border-dashed'
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        {/* Plane icon with multiple animations */}
        <motion.div
          className='absolute w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl shadow-primary/50'
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 20px 25px -5px rgba(var(--primary), 0.5)',
              '0 25px 50px -12px rgba(var(--primary), 0.8)',
              '0 20px 25px -5px rgba(var(--primary), 0.5)',
            ],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -2, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Plane size={24} strokeWidth={1.5} absoluteStrokeWidth className='text-background' />
          </motion.div>
        </motion.div>

        {/* Floating particles around the loader */}
        <motion.div
          className='absolute w-2 h-2 bg-primary/60 rounded-full -top-2 -right-2'
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className='absolute w-1 h-1 bg-primary/40 rounded-full top-8 -left-8'
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className='absolute w-1.5 h-1.5 bg-primary/50 rounded-full -bottom-4 right-6'
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      {/* Background animated elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute w-32 h-32 bg-primary/5 rounded-full -top-16 -left-16'
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className='absolute w-24 h-24 bg-primary/5 rounded-full top-1/4 -right-12'
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className='absolute w-40 h-40 bg-primary/5 rounded-full -bottom-20 left-1/3'
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2,
            ease: 'easeOut',
          }}
        />
      </div>
    </motion.div>
  );
}
