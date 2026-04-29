import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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

const schema = z
  .object({
    email: z.string().email('Correo inválido'),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe incluir una mayúscula')
      .regex(/[0-9]/, 'Debe incluir un número'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });
type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const { user, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (user) return <Navigate to="/app" replace />;

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      await registerUser(values.email, values.password);
      navigate('/app', { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setSubmitError('Este correo ya está registrado.');
      } else if (axios.isAxiosError(err) && err.response?.status === 400) {
        setSubmitError('Datos inválidos. Verifica el formato del correo y la contraseña.');
      } else {
        setSubmitError('No se pudo crear la cuenta. Intenta nuevamente.');
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
          <SectionLabel className="mt-10 block">·01 · Crear cuenta</SectionLabel>
          <h1 className="font-sans text-32 font-semibold text-ink mt-3 tracking-tighter1 leading-tight">
            Únete a la <span className="font-serif italic font-normal">comunidad</span>
          </h1>
          <p className="font-sans text-14 text-ink3 mt-3">
            Crea una cuenta para guardar tus traducciones y construir tu historial.
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
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 número"
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
            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p id="confirm-error" className="font-sans text-13 text-danger mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {submitError && (
              <div role="alert" className="font-sans text-13 text-danger bg-danger/5 border border-danger/30 rounded-8 px-3 py-2">
                {submitError}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creando…' : 'Crear cuenta'}
            </Button>
          </form>

          <p className="font-sans text-13 text-ink3 mt-6 text-center">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-ink font-semibold hover:underline">
              Inicia sesión
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
          <SectionLabel className="text-white/50">·open source</SectionLabel>
          <h2 className="font-sans text-44 font-semibold mt-4 tracking-tighter2 leading-[1.05]">
            Construido para la{' '}
            <span className="font-serif italic font-normal">inclusión</span>.
          </h2>
          <p className="font-sans text-15 text-white/60 mt-5 leading-relaxed">
            Signa es un proyecto open-source que nace para acortar la distancia entre la comunidad
            sorda y los oyentes mediante IA ética.
          </p>
        </div>
      </div>
    </div>
  );
}
