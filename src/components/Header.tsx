'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { ChevronDownIcon, MenuIcon, CloseIcon } from '@/components/ui/icons'
import { primaryNav, solutionsMenu } from '@/lib/site'
import { cn } from '@/lib/cn'

/** Header com mega-menu "Soluções", CTA persistente e drawer mobile. */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-ink/90 backdrop-blur supports-[backdrop-filter]:bg-ink/70">
      {/* Faixa fina — diagnóstico como porta de entrada (P1.2) */}
      <Link
        href="/servicos/diagnostico-comercial"
        className="block border-b border-subtle bg-brand/10 py-1.5 text-center text-xs font-medium text-paper/90 hover:bg-brand/20"
      >
        Não sabe por onde começar?{' '}
        <span className="font-semibold text-brand-vivid">Diagnóstico gratuito em 5 min →</span>
      </Link>

      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          <div className="group relative">
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-paper/90 hover:text-paper-pure">
              Soluções
              <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <MegaMenu />
          </div>
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-paper/90 hover:text-paper-pure"
            >
              {item.label}
            </Link>
          ))}
          {/* Destaque: diagnóstico fora do submenu de Soluções (P1.2) */}
          <Link
            href="/servicos/diagnostico-comercial"
            className="ml-1 rounded-full border border-brand/40 px-3 py-1.5 text-sm font-semibold text-brand-vivid hover:bg-brand/10"
          >
            Diagnóstico gratuito
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/contato" size="sm" className="hidden sm:inline-flex">
            Falar com especialista
          </Button>
          <button
            className="p-2 text-paper lg:hidden"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <MenuIconClose /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {mobileOpen && <MobileMenu onNavigate={() => setMobileOpen(false)} />}
    </header>
  )
}

function MenuIconClose() {
  return <CloseIcon className="h-6 w-6" />
}

function MegaMenu() {
  return (
    <div className="invisible absolute left-1/2 top-full z-50 w-[min(90vw,960px)] -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 rounded-card border border-subtle bg-ink-card p-6 shadow-card md:grid-cols-3">
        {solutionsMenu.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-vivid">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const cls =
                  'block rounded-md px-2 py-1.5 text-sm text-paper/85 hover:bg-paper/5 hover:text-paper-pure'
                const inner = (
                  <>
                    <span className="font-medium">
                      {item.label}
                      {item.external && <span aria-hidden> ↗</span>}
                    </span>
                    {item.description && (
                      <span className="block text-xs text-mute">{item.description}</span>
                    )}
                  </>
                )
                return (
                  <li key={item.href}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={item.href} className={cls}>
                        {inner}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="border-t border-subtle bg-ink lg:hidden">
      <nav className="container-content max-h-[70vh] space-y-6 overflow-y-auto py-6" aria-label="Mobile">
        {solutionsMenu.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-vivid">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) =>
                item.external ? (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-1.5 text-paper/85 hover:text-paper-pure"
                    >
                      {item.label} ↗
                    </a>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn('block py-1.5 text-paper/85 hover:text-paper-pure')}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
        <div className="border-t border-subtle pt-4">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="block py-2 font-medium text-paper hover:text-paper-pure"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <Button href="/servicos/diagnostico-comercial" className="w-full" onClick={onNavigate}>
            Diagnóstico gratuito (5 min)
          </Button>
          <Button href="/contato" variant="secondary" className="w-full" onClick={onNavigate}>
            Falar com especialista
          </Button>
        </div>
      </nav>
    </div>
  )
}
