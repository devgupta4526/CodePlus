'use client';

import { useState, useEffect } from 'react';

export interface UserSession {
  userId: string;
  userTag: string;
  ipMask: string;
}

const STORAGE_KEY = 'codepulse_user_session';

export function useUserSession(): UserSession {
  const [session, setSession] = useState<UserSession>({
    userId: 'USR-89421',
    userTag: 'student@codepulse.io',
    ipMask: '192.168.1.xxx',
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSession(JSON.parse(stored));
      } else {
        const randomId = `USR-${Math.floor(100000 + Math.random() * 900000)}`;
        const newSession: UserSession = {
          userId: randomId,
          userTag: `user_${randomId.toLowerCase()}@codepulse.io`,
          ipMask: `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.xxx`,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
        setSession(newSession);
      }
    } catch {
      // fallback if localStorage disabled
    }
  }, []);

  return session;
}
