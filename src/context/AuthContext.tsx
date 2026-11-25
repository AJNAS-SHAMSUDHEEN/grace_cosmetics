import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Address, UserRole } from '../types';
import { auth, isFirebaseConfigured } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loginAsDemoAdmin: () => void;
  loginAsDemoCustomer: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'grace_user_session';
const LOCAL_STORAGE_USERS_DB_KEY = 'grace_registered_users';

// Pre-configured Demo Accounts
const DEMO_ADMIN: UserProfile = {
  uid: 'admin-001',
  email: 'admin@gracecosmetics.com',
  displayName: 'Grace Admin',
  role: 'admin',
  phone: '+91 98765 43210',
  createdAt: '2026-01-01T00:00:00.000Z',
  addresses: [
    {
      id: 'addr-admin-1',
      fullName: 'Grace Cosmetics Store Admin',
      phone: '+91 98765 43210',
      streetAddress: 'Grace Beauty Studio, Luxury Lane 14',
      apartment: 'Suite 401',
      city: 'Kochi',
      state: 'Kerala',
      postalCode: '682001',
      country: 'India',
      isDefault: true,
    },
  ],
};

const DEMO_CUSTOMER: UserProfile = {
  uid: 'cust-101',
  email: 'aisha.sharma@example.com',
  displayName: 'Aisha Sharma',
  role: 'customer',
  phone: '+91 91234 56789',
  createdAt: '2026-02-15T00:00:00.000Z',
  addresses: [
    {
      id: 'addr-cust-1',
      fullName: 'Aisha Sharma',
      phone: '+91 91234 56789',
      streetAddress: '702 Lotus Boulevard, Marine Drive',
      apartment: 'Tower B, 7th Floor',
      city: 'Kochi',
      state: 'Kerala',
      postalCode: '682011',
      country: 'India',
      isDefault: true,
    },
  ],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [user]);

  // Handle Firebase auth listener if configured
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          // Check role: admin email check
          const isAdminUser = firebaseUser.email?.toLowerCase().includes('admin');
          const profile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Member',
            role: isAdminUser ? 'admin' : 'customer',
            addresses: user?.addresses || [],
            createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
          };
          setUser(profile);
        }
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthModalMode('register');
    setIsAuthModalOpen(true);
  };

  // Helper to get local user database
  const getLocalUsers = (): UserProfile[] => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_USERS_DB_KEY);
      return data ? JSON.parse(data) : [DEMO_ADMIN, DEMO_CUSTOMER];
    } catch {
      return [DEMO_ADMIN, DEMO_CUSTOMER];
    }
  };

  const saveLocalUsers = (users: UserProfile[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_USERS_DB_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users database', e);
    }
  };

  // Login handler
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // 1. Try Firebase if active
    if (isFirebaseConfigured && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const isAdminUser = cred.user.email?.toLowerCase().includes('admin');
        const loggedProfile: UserProfile = {
          uid: cred.user.uid,
          email: cred.user.email || '',
          displayName: cred.user.displayName || email.split('@')[0],
          role: isAdminUser ? 'admin' : 'customer',
          addresses: [],
          createdAt: new Date().toISOString(),
        };
        setUser(loggedProfile);
        setIsAuthModalOpen(false);
        setIsLoading(false);
        return { success: true };
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err.message || 'Failed to sign in' };
      }
    }

    // 2. Local fallback
    const users = getLocalUsers();
    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      setUser(existing);
      setIsAuthModalOpen(false);
      setIsLoading(false);
      return { success: true };
    }

    // Auto create if not found in demo mode
    const newProfile: UserProfile = {
      uid: 'user-' + Date.now(),
      email: email.trim(),
      displayName: email.split('@')[0],
      role: cleanEmail.includes('admin') ? 'admin' : 'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    saveLocalUsers([...users, newProfile]);
    setUser(newProfile);
    setIsAuthModalOpen(false);
    setIsLoading(false);
    return { success: true };
  };

  // Register handler
  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isFirebaseConfigured && auth) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateFirebaseProfile(cred.user, { displayName });
        const newProfile: UserProfile = {
          uid: cred.user.uid,
          email: cred.user.email || '',
          displayName: displayName,
          role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
          addresses: [],
          createdAt: new Date().toISOString(),
        };
        setUser(newProfile);
        setIsAuthModalOpen(false);
        setIsLoading(false);
        return { success: true };
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err.message || 'Registration failed' };
      }
    }

    // Local fallback
    const users = getLocalUsers();
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      setIsLoading(false);
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newProfile: UserProfile = {
      uid: 'user-' + Date.now(),
      email: email.trim(),
      displayName: displayName.trim() || email.split('@')[0],
      role: cleanEmail.includes('admin') ? 'admin' : 'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    saveLocalUsers([...users, newProfile]);
    setUser(newProfile);
    setIsAuthModalOpen(false);
    setIsLoading(false);
    return { success: true };
  };

  // Logout handler
  const logout = async (): Promise<void> => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Signout error', e);
      }
    }
    setUser(null);
  };

  // Quick 1-click Demo Logins
  const loginAsDemoAdmin = () => {
    setUser(DEMO_ADMIN);
    setIsAuthModalOpen(false);
  };

  const loginAsDemoCustomer = () => {
    setUser(DEMO_CUSTOMER);
    setIsAuthModalOpen(false);
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);

    // Update in local database
    const users = getLocalUsers();
    const idx = users.findIndex((u) => u.uid === user.uid);
    if (idx !== -1) {
      users[idx] = updated;
      saveLocalUsers(users);
    }
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...addressData,
      id: 'addr-' + Date.now(),
      isDefault: user.addresses.length === 0 ? true : Boolean(addressData.isDefault),
    };

    let updatedAddresses = [...user.addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(newAddress);

    updateUserProfile({ addresses: updatedAddresses });
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    const filtered = user.addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    updateUserProfile({ addresses: filtered });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    updateUserProfile({ addresses: updated });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openLoginModal,
        openRegisterModal,
        login,
        register,
        logout,
        loginAsDemoAdmin,
        loginAsDemoCustomer,
        updateUserProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
