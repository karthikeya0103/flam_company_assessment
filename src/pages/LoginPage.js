import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { isAuthenticated, isReady } = useAuth();
  const router = useRouter();
  
  // Redirect if already logged in - but only after auth is ready
  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isReady, router]);

  return (
    <>
      <Head>
        <title>Login | Employee Management System</title>
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Employee Management System
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please sign in to access your dashboard
            </p>
          </div>
          
          <LoginForm />
          
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account? Contact your administrator.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}