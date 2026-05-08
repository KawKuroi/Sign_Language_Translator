import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { SignaLogo } from '@/components/brand/signa-logo';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-6 text-center">
      <SignaLogo size={40} />
      <SectionLabel className="mt-12">·404 · Página no encontrada</SectionLabel>
      <h1 className="font-sans text-68 font-semibold text-ink mt-5 tracking-tighter2 leading-none">
        No <span className="font-serif italic font-normal">existe</span>
      </h1>
      <p className="font-sans text-18 text-ink3 mt-5 max-w-lg">
        La ruta que intentas visitar no está disponible. Vuelve al inicio o abre el traductor.
      </p>
      <div className="flex gap-3 mt-10">
        <Link to="/">
          <Button variant="secondary" size="lg">Inicio</Button>
        </Link>
        <Link to="/app">
          <Button variant="primary" size="lg">Abrir traductor</Button>
        </Link>
      </div>
    </div>
  );
}
