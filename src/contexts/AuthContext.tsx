
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  emergencyContact?: string;
  bloodType?: string;
  allergies?: string;
  profileImage?: string;
  specialization?: string;
  experience?: number;
  rating?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  updateProfile: (userData: Partial<User>) => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'patient@demo.com',
    password: 'password',
    role: 'patient',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '1990-01-15',
    emergencyContact: 'Jane Doe - +1 234 567 8901',
    bloodType: 'A+',
    allergies: 'Penicillin, Peanuts',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Dr. Sarah Wilson',
    email: 'doctor@demo.com',
    password: 'password',
    role: 'doctor',
    phone: '+1 234 567 8902',
    specialization: 'Cardiology',
    experience: 8,
    rating: 4.8,
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<void> => {
    setIsLoading(true);
    try {
      const { password, ...userWithoutPassword } = userData;
      const newUser: User = {
        ...userWithoutPassword,
        id: Date.now().toString()
      };
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userExists = mockUsers.some(u => u.email === email);
      if (!userExists) {
        throw new Error('User not found');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isLoading,
      login, 
      logout, 
      register, 
      updateProfile,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
