import { Mail } from 'lucide-react';
import { profile } from '@/data';
import { GithubIcon, LinkedinIcon } from './Icons';

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
  withLabels?: boolean;
  iconSize?: number;
}

export function SocialLinks({
  className = '',
  linkClassName = '',
  withLabels = false,
  iconSize = 15,
}: SocialLinksProps) {
  const links = [
    { label: 'GitHub', href: profile.links.github, Icon: GithubIcon },
    { label: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedinIcon },
    { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
  ];

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map(({ label, href, Icon }) => {
        const external = href.startsWith('http');
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={withLabels ? undefined : label}
              {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              className={
                withLabels
                  ? `inline-flex items-center gap-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:text-accent-deep ${linkClassName}`
                  : `inline-flex h-9 w-9 items-center justify-center border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-paper ${linkClassName}`
              }
            >
              <Icon size={iconSize} />
              {withLabels && <span>{label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
