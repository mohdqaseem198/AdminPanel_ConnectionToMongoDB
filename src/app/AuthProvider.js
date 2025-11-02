'use client';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthStore } from '@/Store/ZustandStore';

export default function AuthProvider({ children }) {
  const { setUser , setToken, setLoading, loading } = useAuthStore();

  useEffect(() => {
    setLoading(true); // start loading before Firebase initializes

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser(user.displayName);
        setToken(token);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false); // done loading
    });

    return () => unsubscribe();
  }, [setUser, setToken, setLoading]);

  // 🟡 Avoid rendering children until Firebase auth is ready
  if (loading) {
    return (
      <div
        style={{
          color: '#888',
          textAlign: 'center',
          marginTop: '25vh',
          fontSize: '1.2rem',
        }}
      >
        Checking session...
      </div>
    );
  }

  return children;
};