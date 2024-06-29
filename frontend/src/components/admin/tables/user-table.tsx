import UpdateUserDialog from '@/components/dialogs/update-user-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/hooks/useAuth';
import { getShownUsers } from '@/lib/utils';
import { User } from '@/types';

interface UsersTableProps {
  limit?: number;
  page?: number;
  search?: string;
  users: User[];
  limited?: boolean;
}

export default function UsersTable({ users, limited = false }: UsersTableProps) {
  const { user: currentUser } = useAuth().state;
  const shownUsers = getShownUsers(users ?? [], currentUser, limited);

  return (
    <>
      {!limited && <p className=' p-2 text-lg'>Total Users: {shownUsers.length}</p>}
      <div className='border shadow-sm rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shownUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Avatar className='w-8 h-8 border'>
                      <AvatarFallback>{user.displayName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className='flex gap-2 items-center'>
                      {user.firstName ?? ''} {user.lastName ?? ''}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user.displayName ?? ''}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <UpdateUserDialog
                    currentUser={currentUser as User}
                    updatingUser={user}
                    trigger={
                      <Button
                        size={'sm'}
                        variant={'secondary'}
                      >
                        Edit
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
