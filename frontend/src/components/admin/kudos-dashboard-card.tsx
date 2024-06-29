import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import KudosTable from './tables/kudos-table';
import { TKudos, User } from '@/types';

export default function KudosDashboardCard({ kudos }: { kudos: TKudos[] }) {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='font-semibold text-lg md:text-2xl'>Kudos</h2>
        <Button
          className='ml-auto'
          size={'sm'}
          asChild
        >
          <Link to={'/admin/kudos'}>View All</Link>
        </Button>
      </div>
      <div className='border shadow-sm rounded-lg'>
        <KudosTable
          kudos={kudos}
          limited
        />
      </div>
    </>
  );
}
