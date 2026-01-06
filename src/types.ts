export interface Role {
  id: string;
  companyName: string;
  companyDomain: string;
  industry: string;
  title: string;
  revenueGenerated: number;
  cashCollected: number;
  showRate: number;
  revenuePerCall: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Profile {
  name: string;
  profilePicture: string;
  currentTitle: string;
  currentCompany: string;
  email: string;
  phone: string;
  linkedIn: string;
}

export interface SalesRepData {
  profile: Profile;
  roles: Role[];
}

export const defaultProfile: Profile = {
  name: '',
  profilePicture: '',
  currentTitle: '',
  currentCompany: '',
  email: '',
  phone: '',
  linkedIn: '',
};

export const defaultRole: Omit<Role, 'id'> = {
  companyName: '',
  companyDomain: '',
  industry: '',
  title: '',
  revenueGenerated: 0,
  cashCollected: 0,
  showRate: 0,
  revenuePerCall: 0,
  startDate: '',
  endDate: '',
  isCurrent: false,
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
