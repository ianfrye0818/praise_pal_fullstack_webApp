import { DeleteKudoDialog } from '@/components/dialogs/delete-kudo-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useShowHideKudo from '@/hooks/api/useKudos/useShowHideKudos';
import useUpdateKudo from '@/hooks/api/useKudos/useUpdateKudo';
import { formatDate, getShownKudos } from '@/lib/utils';
import { TKudos } from '@/types';

interface UsersTableProps {
  limit?: number;
  page?: number;
  search?: string;
  kudos: TKudos[];
  limited?: boolean;
}

export default function KudosTable({ kudos, limited = false }: UsersTableProps) {
  const shownKudos = getShownKudos(kudos ?? [], limited);
  const { mutateAsync: showHideKudo } = useUpdateKudo();

  return (
    <>
      {!limited && <p className=' p-2 text-lg'>Total Kudos: {kudos.length}</p>}
      <div className='border shadow-sm rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Show/Hide</TableHead>
              <TableHead>Delete</TableHead>
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
                  <TableCell>
                    {kudo.title}
                    <p>{kudo.isHidden.toString()}</p>
                  </TableCell>
                  <TableCell>{formatDate(kudo.createdAt)}</TableCell>
                  <TableCell>
                    {/* <KudoCardDropDownMenu kudo={kudo} /> */}
                    <Switch
                      checked={kudo.isHidden}
                      onCheckedChange={async (isHidden: boolean) =>
                        await showHideKudo({
                          companyId: kudo.companyId,
                          payload: { isHidden, id: kudo.id },
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteKudoDialog kudo={kudo}>
                      <Button variant={'destructive'}>Delete</Button>
                    </DeleteKudoDialog>
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
