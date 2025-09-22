
'use client';

import { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { AuthForm, type AuthFormValues } from './components/auth-form';
import { Rocket } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, , googleLoading, googleError] = useSignInWithGoogle(auth);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (values: AuthFormValues) => {
    const success = await signInWithEmailAndPassword(values.email, values.password);
    if (success) {
      router.push('/chat');
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success) {
      router.push('/chat');
    }
  };
  
  useEffect(() => {
    if (error || googleError) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error?.message || googleError?.message,
      })
    }
  }, [error, googleError, toast]);

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2">
                <Rocket className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">StudyWise AI</h1>
            </Link>
        </div>
        <h2 className="text-center text-2xl font-bold mb-1">Welcome Back!</h2>
        <p className="text-center text-muted-foreground mb-6">Enter your credentials to access your account.</p>
        
        <AuthForm
          onSubmit={handleSubmit}
          onGoogleSignIn={handleGoogleSignIn}
          isLoading={loading || googleLoading}
          googleIsLoading={googleLoading}
        />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
