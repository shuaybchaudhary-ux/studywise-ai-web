'use client';

import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export type Tone = 'formal' | 'casual' | 'enthusiastic' | 'humorous';

interface SettingsContextType {
  tone: Tone;
  setTone: (tone: Tone) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [tone, setTone] = useLocalStorage<Tone>('ai-tone', 'casual');

  return (
    <SettingsContext.Provider value={{ tone, setTone }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
