import React, { createContext, useContext, useState } from 'react';
import { MOCK_DATA } from '@/data/mockData';

type BusinessType = 'pg' | 'gym' | 'tiffin' | 'yoga';

export interface Batch {
  id: string;
  name: string;
  days: string[];
  time: string;
  capacity: number;
  instructor: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
  meetingLink: string;
  room: string;
}

export interface FeePlan {
  id: string;
  name: string;
  batchIds: string[];
  cycles: { label: string; price: number }[];
}

export interface BusinessSetupData {
  accessType: 'open' | 'batch' | 'hybrid';
  operatingHours: { days: string; from: string; to: string }[];
  roomsEnabled: boolean;
  rooms: string[];
  batches: Batch[];
  feePlans: FeePlan[];
  trialSession: { enabled: boolean; price: number };
  addOns: { id: string; name: string; price: number }[];
}

interface AppContextType {
  activeBusiness: BusinessType;
  setActiveBusiness: (b: BusinessType) => void;
  businessSetups: Record<string, BusinessSetupData>;
  updateBusinessSetup: (business: string, updates: Partial<BusinessSetupData>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeBusiness, setActiveBusiness] = useState<BusinessType>('pg');
  const [businessSetups, setBusinessSetups] = useState<Record<string, BusinessSetupData>>(
    MOCK_DATA.businessSetup as unknown as Record<string, BusinessSetupData>
  );

  const updateBusinessSetup = (business: string, updates: Partial<BusinessSetupData>) => {
    setBusinessSetups(prev => ({
      ...prev,
      [business]: { ...prev[business], ...updates }
    }));
  };

  return (
    <AppContext.Provider value={{ activeBusiness, setActiveBusiness, businessSetups, updateBusinessSetup }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}