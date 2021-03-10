import { useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid';

export function useUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let userId = window.localStorage.getItem('roomservice-user');

    if (userId === null) {
      const generateBase62Id = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 22);
      userId = generateBase62Id();
      window.localStorage.setItem('roomservice-user', userId);
    }

    setUserId(userId);
  }, []);

  return userId;
}
