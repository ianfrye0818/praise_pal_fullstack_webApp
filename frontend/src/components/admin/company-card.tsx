import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useGetCompany from '@/hooks/api/useCompany/useGetCompany';

import { MailIcon, PhoneIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Company } from '@/types';

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between items-center'>
            Company <Button variant={'secondary'}>Edit</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='flex items-center gap-4'>
              <div>
                <h3 className='font-semibold'>{company.name}</h3>
                <p className='text-muted-foreground'>Company code: {company.companyCode}</p>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <PhoneIcon className='w-4 h-4 text-muted-foreground' />
                <span>{company.phone || ''}</span>
              </div>

              {/* <MailIcon className='w-4 h-4 text-muted-foreground' /> */}
              <div className='flex items-center gap-2'>
                <MailIcon className='w-4 h-4 text-muted-foreground' />
                <div className='flex flex-col'>
                  <div className='flex items-center gap-2'>
                    <span>{company.address || ''}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span>{company.city || ''}</span>
                    <span>{company.state || ''}</span>
                    <span>{company.zip || ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
