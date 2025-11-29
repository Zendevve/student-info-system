import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/context/AuthContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Lock, ArrowRight, ArrowLeft, GraduationCap } from 'lucide-react'
import { registerSchema, RegisterInput } from '@/lib/schema/auth'

export default function Register() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = async (data: RegisterInput) => {
    setError('')
    setLoading(true)

    try {
      const phoneNumber = '+63' + data.phone.slice(1)
      const { error } = await signUp(data.email, phoneNumber, data.password)

      if (error) {
        setError(error.message || 'Registration failed')
      } else {
        navigate('/login')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-white">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md border border-white/30">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-heading font-bold text-white tracking-tight">SSIS Portal</span>
          </div>

          <div className="space-y-6 max-w-lg mt-20">
            <h1 className="text-5xl font-heading font-bold text-white leading-tight">
              Join the Future <br />
              <span className="text-white/90">of Education</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed font-medium">
              Create your account and start your academic journey with our modern student information system.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-white/70 text-sm">
          <span>Already have an account?</span>
          <a href="/login" className="text-white font-semibold hover:underline">Sign In</a>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative bg-white">
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-heading font-bold text-secondary-900">Create Account</h2>
            <p className="text-secondary-500">Fill in your details to get started.</p>
          </div>

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-error-50 border border-error-200 flex items-start gap-3 animate-fade-in">
                <div className="text-error-500 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-error-600">{error}</span>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="student@university.edu.ph"
              leftIcon={<Mail size={18} />}
              error={form.formState.errors.email?.message}
              {...form.register('email')}
            />

            <div>
              <Input
                label="Phone Number"
                type="tel"
                placeholder="09123456789"
                leftIcon={<Phone size={18} />}
                error={form.formState.errors.phone?.message}
                {...form.register('phone')}
              />
              <p className="text-xs text-secondary-500 mt-1.5 ml-1">Format: 09XXXXXXXXX</p>
            </div>

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock size={18} />}
              error={form.formState.errors.password?.message}
              {...form.register('password')}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock size={18} />}
              error={form.formState.errors.confirmPassword?.message}
              {...form.register('confirmPassword')}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full h-12 text-base font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300"
                isLoading={loading}
                rightIcon={!loading && <ArrowRight size={20} />}
              >
                Create Account
              </Button>
            </div>
          </form>

          <div className="pt-6 border-t border-secondary-200 space-y-6 text-center">
            <p className="text-sm text-secondary-500">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                Sign In
              </a>
            </p>
            <a
              href="/"
              className="text-sm text-secondary-500 hover:text-secondary-900 inline-flex items-center gap-2 group transition-colors"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
