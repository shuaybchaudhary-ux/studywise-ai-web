
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export default function HomePage() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">StudyWise AI</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Button asChild>
            <Link href="/chat">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <Rocket className="w-16 h-16 text-primary mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Welcome to StudyWise AI
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground mb-8">
          Your reliable companion app, built to provide a seamless and secure user
          experience. Get started today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/chat">Try the Chatbot</Link>
          </Button>
        </div>
      </main>

      <footer className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {year} StudyWise AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
