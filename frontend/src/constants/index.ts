import { AddKudoDialogProps, SidebarLink, TKudos } from '@/types';
import { PackageOpen, SendIcon, Mailbox, ShieldCheck } from 'lucide-react';
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
];

export const adminSideBarLink: SidebarLink = {
  icon: ShieldCheck,
  label: 'Admin Dashboard',
  route: '/admin/dashboard',
};

export const MAX_API_REQUESTS = 3;
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

export function ADD_KUDOS_DIALOG_FORM_DEFAULT_VALUES(kudo: TKudos | undefined) {
  return {
    title: kudo?.title || '',
    message: kudo?.message || '',
    receiverId: kudo?.receiverId || '',
    isAnonymous: kudo?.isAnonymous || false,
  };
}
