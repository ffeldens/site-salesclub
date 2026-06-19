'use client'

import { useEffect } from 'react'
import { persistOrigin } from '@/lib/utm'

/** Persiste UTMs/origem na primeira visita (first-touch). Sem render. */
export function OriginTracker() {
  useEffect(() => {
    persistOrigin()
  }, [])
  return null
}
