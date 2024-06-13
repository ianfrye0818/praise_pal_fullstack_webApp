import { SidebarLink } from './types';

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'View All',
    route: '/',
    icon: '/icons/view-all.svg',
  },
  {
    label: 'Received Kudos',
    route: '/kudos/received',
    icon: '/icons/inbox.svg',
  },
  {
    label: 'Sent Kudos',
    route: '/kudos/sent',
    icon: '/icons/outbox.svg',
  },
];

export const adminSideBarLink: SidebarLink = {
  icon: '/icons/admin.svg',
  label: 'Admin Dashboard',
  route: '/admin/dashboard',
};
