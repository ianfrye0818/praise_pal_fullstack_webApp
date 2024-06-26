import UsersTable from '@/components/admin/tables/user-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/hooks/useAuth';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { GlobeIcon, MailIcon, MoveHorizontalIcon, PhoneIcon } from 'lucide-react';

export const Route = createFileRoute('/_rootLayout/admin/dashboard')({
  beforeLoad: async ({ context }) => {
    const { isAdmin } = context.state;
    if (!isAdmin) {
      throw redirect({ to: '/' });
    }
  },
  component: () => <AdminDashboard />,
});

export function AdminDashboard() {
  const { user } = useAuth().state;
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <UsersTable
        limited
        companyId={user?.companyId as string}
      />
      {/* Kudos Table Start */}
      <div className='flex items-center'>
        <h2 className='font-semibold text-lg md:text-2xl'>Kudos</h2>
        <Button
          className='ml-auto'
          size='sm'
        >
          Add Kudos
        </Button>
      </div>
      <div className='border shadow-sm rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <span>Jane Appleseed</span>
                </div>
              </TableCell>
              <TableCell>Great job on the project! Your hard work is appreciated.</TableCell>
              <TableCell>2023-05-15</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                    >
                      <MoveHorizontalIcon className='w-4 h-4' />
                      <span className='sr-only'>Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <span>Sarah Anderson</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <span>Michael Johnson</span>
                </div>
              </TableCell>
              <TableCell>Congratulations on your promotion! Well-deserved.</TableCell>
              <TableCell>2023-04-30</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                    >
                      <MoveHorizontalIcon className='w-4 h-4' />
                      <span className='sr-only'>Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <span>Emily Wilson</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>DM</AvatarFallback>
                  </Avatar>
                  <span>David Martinez</span>
                </div>
              </TableCell>
              <TableCell>
                Thank you for your mentorship and guidance. It has been invaluable.
              </TableCell>
              <TableCell>2023-03-20</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                    >
                      <MoveHorizontalIcon className='w-4 h-4' />
                      <span className='sr-only'>Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Kudos Table End */}
      {/* Users Table Start */}
      {/* <div className='flex items-center'>
        <h2 className='font-semibold text-lg md:text-2xl'>Users</h2>
        <Button
          className='ml-auto'
          size='sm'
        >
          Add User
        </Button>
      </div>
      <div className='border shadow-sm rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>
              </TableCell>
              <TableCell>john.doe@example.com</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                    >
                      <MoveHorizontalIcon className='w-4 h-4' />
                      <span className='sr-only'>Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <span>Sarah Anderson</span>
                </div>
              </TableCell>
              <TableCell>sarah.anderson@example.com</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                    >
                      <MoveHorizontalIcon className='w-4 h-4' />
                      <span className='sr-only'>Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Avatar className='w-8 h-8 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <span>Emily Wilson</span>
                </div>
              </TableCell>
              <TableCell>emily.wilson@example.com</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                    >
                      <MoveHorizontalIcon className='w-4 h-4' />
                      <span className='sr-only'>Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div> */}
      {/* Users Table End */}
      {/* Company Table Start */}
      <div className='flex items-center'>
        <h2 className='font-semibold text-lg md:text-2xl'>Company</h2>
        <Button
          className='ml-auto'
          size='sm'
        >
          Edit
        </Button>
      </div>
      <div className='border shadow-sm rounded-lg p-6'>
        <div className='grid gap-4'>
          <div className='flex items-center gap-4'>
            <div>
              <h3 className='font-semibold'>Kudos Inc.</h3>
              <p className='text-muted-foreground'>Kudos sharing platform</p>
            </div>
          </div>
          <div className='grid gap-1'>
            <div className='flex items-center gap-2'>
              <PhoneIcon className='w-4 h-4 text-muted-foreground' />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className='flex items-center gap-2'>
              <MailIcon className='w-4 h-4 text-muted-foreground' />
              <span>info@kudos.com</span>
            </div>
            <div className='flex items-center gap-2'>
              <GlobeIcon className='w-4 h-4 text-muted-foreground' />
              <span>www.kudos.com</span>
            </div>
          </div>
        </div>
      </div>
      {/* Company Table End */}
    </main>
  );
}
