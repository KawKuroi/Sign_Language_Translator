import { useState } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { SignaLogo } from '@/components/brand/signa-logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
  remember: z.boolean().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { remember: false } });

  if (user) return <Navigate to="/app" replace />;

  const next =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/app';

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      await login(values.email, values.password, values.remember);
      navigate(next, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setSubmitError('Correo o contraseña incorrectos.');
      } else if (axios.isAxiosError(err) && err.response?.status === 400) {
        setSubmitError('Datos inválidos. Verifica tu correo y contraseña.');
      } else {
        setSubmitError('No se pudo iniciar sesión. Intenta nuevamente.');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-bg">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          <Link to="/" aria-label="Inicio">
            <SignaLogo />
          </Link>
          <SectionLabel className="mt-10 block">·01 · Acceso</SectionLabel>
          <h1 className="font-sans text-32 font-semibold text-ink mt-3 tracking-tighter1 leading-tight">
            Bienvenido de vuelta a{' '}
            <span className="font-serif italic font-normal">signa</span>
          </h1>
          <p className="font-sans text-14 text-ink3 mt-3">
            Inicia sesión para guardar tus traducciones y acceder a tu historial.
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" className="font-sans text-13 text-danger mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                {...register('password')}
              />
              {errors.password && (
                <p id="password-error" className="font-sans text-13 text-danger mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <label className="flex items-center gap-2 select-none cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-4 border-border accent-ink"
                {...register('remember')}
              />
              <span className="font-sans text-13 text-ink2">Recordarme en este dispositivo</span>
            </label>

            {submitError && (
              <div role="alert" className="font-sans text-13 text-danger bg-danger/5 border border-danger/30 rounded-8 px-3 py-2">
                {submitError}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Iniciando…' : 'Iniciar sesión'}
            </Button>
          </form>

          <p className="font-sans text-13 text-ink3 mt-6 text-center">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-ink font-semibold hover:underline">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-black relative overflow-hidden items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at 50% 40%, black 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-[460px] px-12 text-white">
          <SectionLabel className="text-white/50">·privacidad</SectionLabel>
          <h2 className="font-sans text-44 font-semibold mt-4 tracking-tighter2 leading-[1.05]">
            Tu cara y tus manos{' '}
            <span className="font-serif italic font-normal">no se almacenan</span>.
          </h2>
          <p className="font-sans text-15 text-white/60 mt-5 leading-relaxed">
            Los frames de cámara solo viajan al backend durante la sesión. Solo el texto traducido
            queda asociado a tu cuenta.
          </p>
        </div>
      </div>
    </div>
  );
}
