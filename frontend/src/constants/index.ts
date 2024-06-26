import { Company, SidebarLink, TKudos, User } from '@/types';
import {
  PackageOpen,
  SendIcon,
  Mailbox,
  ShieldCheck,
  UserIcon,
  ScrollText,
  LayoutDashboard,
  BellIcon,
} from 'lucide-react';
import { env } from '@/zodSchemas/env';

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'View All',
    route: '/',
    icon: PackageOpen,
  },
  {
    label: 'Received Kudos',
    route: '/kudos/received',
    icon: Mailbox,
  },
  {
    label: 'Sent Kudos',
    route: '/kudos/sent',
    icon: SendIcon,
  },
  {
    label: 'Notifications',
    route: '/notifications',
    icon: BellIcon,
  },
];

export const adminSidebarLinks: SidebarLink[] = [
  {
    label: 'Dashboard',
    route: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    route: '/admin/users',
    icon: UserIcon,
  },
  {
    label: 'Kudos',
    route: '/admin/kudos',
    icon: ScrollText,
  },
];

export const adminSideBarLink: SidebarLink = {
  icon: ShieldCheck,
  label: 'Admin Dashboard',
  route: '/admin/dashboard',
};

export const MAX_API_RETRY_REQUESTS = 3;
export const BASE_API_URL = env.VITE_API_BASE_URL;

export const IMAGES = {
  logo: 'src/assets/logo.png',
};

export const SIGN_UP_FORM_DEFAULT_VALUES = {
  email: '',
  password: '',
  confirmPassword: '',
  displayName: '',
  companyCode: '',
};

export const SIGN_IN_FORM_DEFAULT_VALUES = {
  email: '',
  password: '',
};

export const ADD_KUDOS_DIALOG_FORM_DEFAULT_VALUES = {
  title: '',
  message: '',
  isAnonymous: false,
  receiverId: '',
};

export function EDIT_KUDOS_DIALOG_FORM_DEFAULT_VALUES(kudo: TKudos) {
  return {
    title: kudo.title,
    message: kudo.message,
  };
}

export const UPDATE_USER_DIALOG_DEFAULT_VALUES = (user: User) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    role: user.role,
  };
};

export const UPDATE_COMPANY_DIALOG_DEFAULT_VALUES = (company: Company) => {
  return {
    name: company.name,
    address: company.address,
    city: company.city,
    state: company.state,
    zip: company.zip,
    phone: company.phone,
  };
};

export const KUDOS_QUERY_OPTIONS = {
  queryKey: ['kudos'],
  exact: false,
};

export const USER_QUERY_OPTIONS = {
  queryKey: ['companyUsers'],
  exact: false,
};

export const COMPANY_QUERY_OPTIONS = {
  queryKey: ['company'],
  exact: false,
};

export const USER_NOTIFICATION_QUERY_OPTIONS = {
  queryKey: ['userNotifications'],
  exact: false,
};
