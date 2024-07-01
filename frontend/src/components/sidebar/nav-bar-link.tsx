import { SidebarLink } from '@/types';
import { Link } from '@tanstack/react-router';

type Props = {
  link: SidebarLink;
  notificationAmount?: number;
} & React.ComponentProps<typeof Link>;

export default function NavBarLink({ link, notificationAmount, ...props }: Props) {
  const notificationLink = link.label === 'Notifications';
  const showNotificationNumber = notificationLink && notificationAmount && notificationAmount > 0;
  console.log(showNotificationNumber);

  return (
    <Link
      {...props}
      activeProps={{
        className: 'bg-blue-500 text-white',
      }}
      className='flex gap-3 items-center p-3 rounded-md relative'
      key={link.label}
      to={link.route as string}
    >
      <div className='relative size-6'>
        <link.icon />
      </div>
      <p>{link.label}</p>
      {showNotificationNumber ? (
        <div className='absolute right-3 w-4 h-4 p-3 bg-red-500 rounded-full flex justify-center items-center text-white'>
          {notificationAmount}
        </div>
      ) : null}
    </Link>
  );
}
