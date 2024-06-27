import KudoCardDropDownMenu from '@/components/kudos-card/kudo-card-dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetCompanyKudos from '@/hooks/api/useKudos/useGetCompanyKudos';
import { formatDate, getShownKudos } from '@/lib/utils';

interface UsersTableProps {
  limit?: number;
  page?: number;
  search?: string;
  companyId: string;
  limited?: boolean;
}

export default function KudosTable({ companyId, limited = false }: UsersTableProps) {
  const { data: kudos, isLoading, error } = useGetCompanyKudos(companyId);

  const shownKudos = getShownKudos(kudos ?? [], limited);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Kudos</div>;
  if (!kudos) return <div>No Users found</div>;

  return (
    <>
      {!limited && <p className=' p-2 text-lg'>Total Kudos: {kudos.length}</p>}
      <div className='border shadow-sm rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shownKudos.map((kudo) => {
              const reciverDisplayName =
                kudo.receiver.firstName && kudo.receiver.lastName
                  ? `${kudo.receiver.firstName} ${kudo.receiver.lastName}`
                  : kudo.receiver.displayName;
              const senderDisplayName =
                kudo.sender.firstName && kudo.sender.lastName
                  ? `${kudo.sender.firstName} ${kudo.sender.lastName}`
                  : kudo.sender.displayName;
              return (
                <TableRow key={kudo.id}>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className='w-8 h-8 border'>
                        <AvatarFallback>{senderDisplayName[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className='flex gap-2 items-center'>{senderDisplayName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className='w-8 h-8 border'>
                        <AvatarFallback>{reciverDisplayName[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className='flex gap-2 items-center'>{reciverDisplayName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{kudo.message}</TableCell>
                  <TableCell>{formatDate(kudo.createdAt)}</TableCell>
                  <TableCell>
                    <KudoCardDropDownMenu kudo={kudo} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
