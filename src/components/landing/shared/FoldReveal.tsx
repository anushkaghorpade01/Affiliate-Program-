import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const easeEditorial = [0.22, 1, 0.36, 1] as const

type FoldRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function FoldReveal({ children, className, delay = 0, y = 28 }: FoldRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px', amount: 0.12 }}
      transition={{ duration: 0.95, ease: easeEditorial, delay }}
    >
      {children}
    </motion.div>
  )
}
