import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; // Asegúrate de tener este archivo configurado correctamente
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { user };
};
