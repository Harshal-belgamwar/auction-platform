import { useState } from 'react';

/**
 * Simple authentication hook used by the Navbar.
 * It reads the user object from localStorage (set after login) and provides
 * a logout function that clears the auth token and user data.
 */
export function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    // Optionally redirect to login page – the Navbar already handles navigation.
  };

  return { user, logout };
}
