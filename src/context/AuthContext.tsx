import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>
  signInWithPassword: (phone: string, password: string) => Promise<{ error: Error | null }>
  signInWithOTP: (phone: string) => Promise<{ error: Error | null }>
  signUpWithEmail: (email: string, password: string, metadata: any) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signInWithPassword = async (phone: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ phone, password })
    return { error }
  }

  const signInWithOTP = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({ phone })
    return { error }
  }

  const signUpWithEmail = async (email: string, password: string, metadata: any) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) return { error: authError }

    if (authData.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        first_name: metadata.firstName,
        last_name: metadata.lastName,
        middle_name: metadata.middleName || null,
        email: email,
        user_type: 1,
      })

      if (profileError) return { error: profileError }
    }

    return { error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    loading,
    signInWithEmail,
    signInWithPassword,
    signInWithOTP,
    signUpWithEmail,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
