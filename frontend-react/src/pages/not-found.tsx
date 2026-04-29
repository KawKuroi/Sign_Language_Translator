import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { SignaLogo } from '@/components/brand/signa-logo';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-6 text-center">
      <SignaLogo size={32} />
      <SectionLabel className="mt-10">·404 · Página no encontrada</SectionLabel>
      <h1 className="font-sans text-48 font-semibold text-ink mt-4 tracking-tighter2 leading-none">
        No <span className="font-serif italic font-normal">existe</span>
      </h1>
      <p className="font-sans text-15 text-ink3 mt-4 max-w-md">
        La ruta que intentas visitar no está disponible. Vuelve al inicio o abre el traductor.
      </p>
      <div className="flex gap-3 mt-8">
        <Link to="/">
          <Button variant="secondary">Inicio</Button>
        </Link>
        <Link to="/app">
          <Button variant="primary">Abrir traductor</Button>
        </Link>
      </div>
    </div>
  );
}
