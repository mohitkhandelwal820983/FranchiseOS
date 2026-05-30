import { create } from 'zustand';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface UserStore {
  profile: UserProfile | null;
  preferences: Record<string, any>;
  
  setProfile: (profile: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setPreferences: (preferences: Record<string, any>) => void;
  updatePreferences: (updates: Record<string, any>) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  profile: null,
  preferences: {},
  
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) => set((state) => ({
    profile: state.profile ? { ...state.profile, ...updates } : null,
  })),
  setPreferences: (preferences) => set({ preferences }),
  updatePreferences: (updates) => set((state) => ({
    preferences: { ...state.preferences, ...updates },
  })),
  reset: () => set({ profile: null, preferences: {} }),
}));
