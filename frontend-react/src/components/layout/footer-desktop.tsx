import { SignaLogo } from '@/components/brand/signa-logo';
import { Divider } from '@/components/ui/divider';

const cols = [
  { title: 'Producto', links: ['Traductor', 'Diccionario', 'Roadmap'] },
  { title: 'Recursos', links: ['Documentación', 'GitHub', 'Tutoriales'] },
  { title: 'Legal', links: ['Licencia', 'Privacidad', 'Conducta'] },
];

export function FooterDesktop() {
  return (
    <footer className="border-t border-border bg-surface px-10 pt-14 pb-7">
      <div className="flex justify-between mb-12 gap-16">
        <div className="max-w-[320px]">
          <SignaLogo />
          <p className="font-sans text-14 text-ink3 mt-4 leading-[22px]">
            Traductor del alfabeto ASL en tiempo real. Proyecto open-source dedicado a la inclusión
            mediante el uso ético y creativo de la inteligencia artificial.
          </p>
        </div>
        <div className="flex gap-16">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-11 text-ink4 mb-4 uppercase tracking-wide2">
                {col.title}
              </p>
              {col.links.map((l) => (
                <p
                  key={l}
                  className="font-sans text-14 text-ink2 mb-[10px] cursor-pointer hover:text-ink"
                >
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div className="flex justify-between mt-6">
        <span className="font-mono text-11 text-ink4">© 2024 SIGNA · MIT LICENSE</span>
        <span className="font-mono text-11 text-ink4">BUILT WITH ❤ FOR THE COMMUNITY</span>
      </div>
    </footer>
  );
}
