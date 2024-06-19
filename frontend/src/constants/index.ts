import { SidebarLink } from '@/types';
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
