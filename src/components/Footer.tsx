import { ArrowUp } from 'lucide-react';
import { contentNavItems, profile } from '@/data';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-night text-paper">
      <div className="shell border-t border-paper/15 py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          <div className="flex items-start gap-3 md:col-span-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-paper font-display text-base leading-none text-ink">
              {profile.monogram}
            </span>
            <div>
              <p className="font-display text-lg uppercase leading-none">{profile.name}</p>
              <p className="eyebrow mt-1.5 text-paper/40">
                {profile.role} · {profile.location}
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {contentNavItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="eyebrow text-paper/55 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex md:col-span-3 md:justify-end">
            <a
              href="#home"
              className="inline-flex items-center gap-2 border-b border-paper/25 pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/70 transition-colors hover:border-accent hover:text-paper"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-paper/15 pt-4">
          <p className="eyebrow text-paper/35">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="eyebrow text-paper/35">{profile.footer.note}</p>
          <p className="eyebrow text-paper/35">React · TypeScript · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
