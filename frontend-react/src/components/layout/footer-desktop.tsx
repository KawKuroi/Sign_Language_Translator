import { SignaLogo } from '@/components/brand/signa-logo';
import { IcGithub } from '@/components/brand/icons';

const GITHUB_URL = 'https://github.com/KawKuroi';

export function FooterDesktop() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-[1240px] mx-auto px-10 py-10 flex items-center justify-between gap-10">
        <div className="flex items-center gap-5">
          <SignaLogo size={32} />
          <span className="font-mono text-11 text-ink4 tracking-wide1">
            Traductor ASL · Open source · {new Date().getFullYear()}
          </span>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[6px] font-sans text-13 text-ink2 hover:text-ink transition-colors"
        >
          <IcGithub s={14} /> github.com/KawKuroi
        </a>
      </div>
    </footer>
  );
}
