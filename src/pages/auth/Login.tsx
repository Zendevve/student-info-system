import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/store/authStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Lock, ArrowRight, ArrowLeft, ShieldCheck, GraduationCap, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { loginEmailSchema, loginPhoneSchema, LoginEmailInput, LoginPhoneInput } from '@/lib/schema/auth'

type LoginMethod = 'phone' | 'email'

export default function Login() {
  const navigate = useNavigate()
  const { signInWithPassword, signInWithEmail, signInWithOTP } = useAuthStore()
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email')
  const [useOTP, setUseOTP] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Email form
  const emailForm = useForm<LoginEmailInput>({
    resolver: zodResolver(loginEmailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Phone form
  const phoneForm = useForm<LoginPhoneInput>({
    resolver: zodResolver(loginPhoneSchema),
    defaultValues: {
      phone: '',
      password: '',
      useOTP: false,
    },
  })

  const handleEmailSubmit = async (data: LoginEmailInput) => {
    setError('')
    setLoading(true)

    try {
      const { error } = await signInWithEmail(data.email, data.password)
      if (error) {
        setError(error.message || 'Invalid credentials')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneSubmit = async (data: LoginPhoneInput) => {
    setError('')
    setLoading(true)

    try {
      const phoneNumber = '+63' + data.phone.slice(1)

      if (useOTP) {
        const { error } = await signInWithOTP(phoneNumber)
        if (error) {
          setError(error.message || 'Failed to send OTP')
        } else {
          navigate(`/verify?phone=${encodeURIComponent(phoneNumber)}`)
        }
      } else {
        const { error } = await signInWithPassword(phoneNumber, data.password || '')
        if (error) {
          setError(error.message || 'Invalid credentials')
        } else {
          navigate('/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-white">
      {/* Left Side - Artistic/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-secondary-950">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-primary-900/20 z-0"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/30 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-primary-600/20 rounded-xl backdrop-blur-md border border-primary-500/30">
              <GraduationCap className="w-8 h-8 text-primary-400" />
            </div>
            <span className="text-2xl font-heading font-bold text-white tracking-tight">SSIS Portal</span>
          </div>

          <div className="space-y-6 max-w-lg mt-20">
            <h1 className="text-5xl font-heading font-bold text-white leading-tight">
              Welcome to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Future of Education</span>
            </h1>
            <p className="text-lg text-secondary-200 leading-relaxed font-medium">
              Experience a seamless, hypermodern student portal designed for the next generation of learners. Manage your academic journey with precision and style.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-6 mt-auto">
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <ShieldCheck className="w-6 h-6 text-accent-400 mb-3" />
            <h3 className="text-white font-semibold mb-1">Secure Access</h3>
            <p className="text-sm text-secondary-400">Enterprise-grade security for your data.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <LayoutDashboard className="w-6 h-6 text-primary-400 mb-3" />
            <h3 className="text-white font-semibold mb-1">Modern Dashboard</h3>
            <p className="text-sm text-secondary-400">Everything you need at a glance.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative bg-white">

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-heading font-bold text-secondary-900">Sign In</h2>
            <p className="text-secondary-500">Enter your credentials to access your account.</p>
          </div>

          <div className="space-y-6">
            {/* Method Selector */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-secondary-50 rounded-xl border border-secondary-200">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('email')
                  setUseOTP(false)
                  setError('')
                }}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-300",
                  loginMethod === 'email'
                    ? "bg-white text-primary-600 shadow-sm border border-secondary-200"
                    : "text-secondary-500 hover:text-secondary-900 hover:bg-secondary-100"
                )}
              >
                <Mail size={18} />
                Email
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod('phone')
                  setError('')
                }}
                className={cn(
                  "flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-300",
                  loginMethod === 'phone'
                    ? "bg-white text-primary-600 shadow-sm border border-secondary-200"
                    : "text-secondary-500 hover:text-secondary-900 hover:bg-secondary-100"
                )}
              >
                <Phone size={18} />
                Phone
              </button>
            </div>

            {/* Error Display */}
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

            {/* Email Form */}
            {loginMethod === 'email' && (
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-5 animate-slide-up">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="student@university.edu.ph"
                  leftIcon={<Mail size={18} />}
                  error={emailForm.formState.errors.email?.message}
                  {...emailForm.register('email')}
                />

                <div className="space-y-1">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock size={18} />}
                    error={emailForm.formState.errors.password?.message}
                    {...emailForm.register('password')}
                  />
                  <div className="flex justify-end">
                    <a href="#" className="text-xs text-primary-600 hover:text-primary-700 transition-colors font-medium">Forgot password?</a>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full h-12 text-base font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300"
                  isLoading={loading}
                  rightIcon={!loading && <ArrowRight size={20} />}
                >
                  Sign In to Portal
                </Button>
              </form>
            )}

            {/* Phone Form */}
            {loginMethod === 'phone' && (
              <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-5 animate-slide-up">
                <div>
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="09123456789"
                    leftIcon={<Phone size={18} />}
                    error={phoneForm.formState.errors.phone?.message}
                    {...phoneForm.register('phone')}
                  />
                  <p className="text-xs text-secondary-500 mt-1.5 ml-1">Format: 09XXXXXXXXX</p>
                </div>

                <div className="flex items-center gap-3 px-1 py-2 rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer" onClick={() => setUseOTP(!useOTP)}>
                  <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-colors", useOTP ? "bg-primary-600 border-primary-600" : "border-secondary-300 bg-white")}>
                    {useOTP && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-sm font-medium text-secondary-600 select-none">
                    Use OTP instead of password
                  </span>
                </div>

                {!useOTP && (
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Lock size={18} />}
                    error={phoneForm.formState.errors.password?.message}
                    {...phoneForm.register('password')}
                  />
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full h-12 text-base font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300"
                  isLoading={loading}
                  rightIcon={!loading && <ArrowRight size={20} />}
                >
                  {useOTP ? 'Send Access Code' : 'Sign In to Portal'}
                </Button>
              </form>
            )}

            <div className="pt-6 border-t border-secondary-200 space-y-6 text-center">
              <p className="text-sm text-secondary-500">
                New to the platform?{' '}
                <a href="/register" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                  Create Account
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
    </div>
  )
}
