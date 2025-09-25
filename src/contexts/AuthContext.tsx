import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
  grade?: 11 | 12; // Only for students
  subject?: string; // Only for teachers
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'student' | 'teacher', grade?: 11 | 12, subject?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Mock login - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - assuming student for existing login
    const mockUser: AuthUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'student',
      grade: 11, // Default grade, in real app this would come from database
    };
    
    setUser(mockUser);
    localStorage.setItem('shiksha_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, name: string, role: 'student' | 'teacher', grade?: 11 | 12, subject?: string) => {
    setIsLoading(true);
    // Mock signup - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: AuthUser = {
      id: Date.now().toString(),
      email,
      name,
      role,
      ...(role === 'student' && { grade }),
      ...(role === 'teacher' && { subject }),
    };
    
    setUser(newUser);
    localStorage.setItem('shiksha_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shiksha_user');
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('shiksha_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};