import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { profile, visibleNavItems, visibleSectionIds } from '@/data';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { AvailabilityBadge } from './AvailabilityBadge';
import { SocialLinks } from './SocialLinks';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(visibleSectionIds, 'home');
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a[href]');
    firstLink?.focus();
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)');
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/20 bg-paper/90 backdrop-blur-md">
      <div className="relative z-40 flex h-16 items-center justify-between gap-4 shell md:h-[72px]">
        <a
          href="#home"
          onClick={close}
          className="group flex items-center gap-3"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="flex h-9 w-9 items-center justify-center bg-ink font-display text-base leading-none text-paper transition-colors group-hover:bg-accent">
            {profile.monogram}
          </span>
          <span className="hidden font-mono text-[10px] uppercase leading-[1.5] tracking-[0.16em] sm:block">
            {profile.name.split(' ').slice(0, 2).join(' ')}
            <br />
            <span className="text-ink/50">{profile.role}</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {visibleNavItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              aria-current={active === item.id ? 'true' : undefined}
            >
              {index > 0 && (
                <span aria-hidden="true" className="text-[9px] text-ink/40">
                  {String(index).padStart(2, '0')}
                </span>
              )}
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SocialLinks className="hidden md:flex" iconSize={14} />
          <a
            href="#contact"
            className="hidden shrink-0 whitespace-nowrap items-center gap-2 border border-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper sm:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-ink/30 transition-colors hover:bg-ink hover:text-paper xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id="mobile-menu"
            ref={panelRef}
            className="absolute inset-x-0 top-full z-30 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-ink bg-paper xl:hidden"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
              <div className="shell py-6">
                <nav aria-label="Mobile primary">
                  <ul>
                    {visibleNavItems.map((item, index) => (
                      <li key={item.id} className="border-b border-ink/15">
                        <a
                          href={`#${item.id}`}
                          onClick={close}
                          className="group flex items-center justify-between gap-4 py-4"
                          aria-current={active === item.id ? 'true' : undefined}
                        >
                          <span className="flex items-baseline gap-3">
                            {index > 0 && (
                              <span className="eyebrow text-ink/40" aria-hidden="true">
                                {String(index).padStart(2, '0')}
                              </span>
                            )}
                            <span className="font-display text-3xl uppercase leading-none">
                              {item.label}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="h-5 w-5 text-ink/40 transition-colors group-hover:text-accent"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <SocialLinks withLabels />
                  <AvailabilityBadge />
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
      </header>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.button
              key="backdrop"
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed inset-0 z-30 cursor-default bg-night/45 backdrop-blur-[2px] xl:hidden"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
