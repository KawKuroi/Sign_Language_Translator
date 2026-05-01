import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { MobileHeader } from '@/components/layout/mobile-header';
import { MobileBottomNav } from '@/components/layout/mobile-bottomnav';
import { SectionLabel } from '@/components/ui/section-label';
import { AslLetterSvg } from '@/components/brand/asl-letter-svg';
import { ASL_ALPHABET } from '@/data/asl-alphabet';
import { useIsMobile } from '@/hooks/use-media-query';

function LetterCard({ letter, description }: { letter: string; description: string }) {
  return (
    <div className="bg-surface border border-border rounded-12 p-5 flex flex-col items-center text-center hover:border-ink3 transition-colors">
      <AslLetterSvg letter={letter} size={80} />
      <span className="font-serif italic text-44 text-ink mt-3 leading-none">{letter}</span>
      <p className="font-sans text-12 text-ink3 leading-[1.5] mt-3">{description}</p>
    </div>
  );
}

function DictionaryContent() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <SectionLabel emphasized>Alfabeto ASL</SectionLabel>
        <h1 className="font-sans text-36 font-semibold text-ink mt-2 tracking-tighter2 leading-[1.05]">
          24 letras <span className="font-serif italic font-normal">estáticas</span>
        </h1>
        <p className="font-sans text-14 text-ink3 mt-2 max-w-lg">
          El modelo soporta las letras A–Y del alfabeto ASL. J y Z se omiten porque requieren
          movimiento y no son señas estáticas.
        </p>
      </div>

      <div className="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {ASL_ALPHABET.map((entry) => (
          <LetterCard
            key={entry.letter}
            letter={entry.letter}
            description={entry.description}
          />
        ))}
      </div>
    </div>
  );
}

function DictionaryMobileContent() {
  return (
    <div>
      <div className="px-5 pt-[14px] pb-5">
        <SectionLabel emphasized>Alfabeto ASL</SectionLabel>
        <h1 className="font-sans text-26 font-semibold text-ink mt-2 tracking-tighter2">
          24 letras <span className="font-serif italic font-normal">estáticas</span>
        </h1>
        <p className="font-sans text-13 text-ink3 mt-1">
          A–Y del ASL, sin J ni Z (requieren movimiento).
        </p>
      </div>
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        {ASL_ALPHABET.map((entry) => (
          <LetterCard
            key={entry.letter}
            letter={entry.letter}
            description={entry.description}
          />
        ))}
      </div>
    </div>
  );
}

export default function DictionaryPage(): ReactNode {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-bg overflow-hidden">
        <MobileHeader />
        <div className="flex-1 overflow-auto">
          <DictionaryMobileContent />
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader title="Diccionario" />
        <div className="flex-1 p-6 overflow-auto bg-bg">
          <DictionaryContent />
        </div>
      </main>
    </div>
  );
}
