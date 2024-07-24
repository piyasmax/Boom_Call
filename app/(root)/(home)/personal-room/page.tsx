
  // 'use client';

  // import { Button } from '@/components/ui/button';
  // import { useToast } from '@/components/ui/use-toast';
  // import { useGetCallById } from '@/hooks/useGetCallById';
  // import { useUser } from '@clerk/nextjs';
  // import { useStreamVideoClient } from '@stream-io/video-react-sdk';
  // import { useRouter } from 'next/navigation';
  // import React from 'react';

  // const Table = ({ title, description }: { title: string; description: string; }) => {
  //   return (
  //     <div className='flex flex-col items-start gap-2 xl:flex-row'>
  //       <h1 className='text-base font-medium text-sky-600 lg:text-xl xl:min-w-32'>{title}</h1>
  //       <h2 className='truncate lg:text=xl text-sm font-bold max-sm:max-w-[320px]'>{description}</h2>
  //     </div>
  //   );
  // };

  // const PersonalRoom = () => {
  //   const { toast } = useToast();
  //   const { user } = useUser();
  //   const meetingId = user?.id;
  //   const client = useStreamVideoClient();
  //   const router = useRouter();

  //   // Ensure the meeting link has the correct protocol
  //   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.startsWith('http')
  //     ? process.env.NEXT_PUBLIC_BASE_URL
  //     : `http://${process.env.NEXT_PUBLIC_BASE_URL}`;
  //   const meetingLink = `${baseUrl}/meeting/${meetingId}?Personal=true`;

  //   const { call } = useGetCallById(meetingId!);

  //   const startRoom = async () => {
  //     if (!client || !user) return;

  //     if (!call) {
  //       const newCall = client.call('default', meetingId!);

  //       await newCall.getOrCreate({
  //         data: {
  //           starts_at: new Date().toISOString(),
  //         },
  //       });
  //     }
  //     router.push(`/meeting/${meetingId}?Personal=true`);
  //   };

  //   return (
  //     <section className='flex size-full flex-col gap-10 text-white'>
  //       <h1 className="text-3xl font-bold">Personal-room</h1>

  //       <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
  //         <Table title='Topic' description={`${user?.username}'s meeting room`} />
  //         <Table title='Meeting ID' description={meetingId!} />
  //         <Table title='Invite Link' description={meetingLink} />
  //       </div>
  //       <div className="flex gap-5">
  //         <Button className='bg-blue-1 hover:bg-blue-800' onClick={startRoom}>
  //           Start Meeting
  //         </Button>
  //         <Button className='bg-dark-1' onClick={() => {
  //           navigator.clipboard.writeText(meetingLink);
  //           toast({
  //             title: 'Link Copied',
  //           });
  //         }}>
  //           Copy Invitation
  //         </Button>
  //       </div>
  //     </section>
  //   );
  // };

  // export default PersonalRoom;

  'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';

const Table = ({ title, description }: { title: string; description: string; }) => {
  return (
    <div className='flex flex-col items-start gap-2 xl:flex-row'>
      <h1 className='text-base font-medium text-sky-600 lg:text-xl xl:min-w-32'>{title}</h1>
      <h2 className='truncate lg:text=xl text-sm font-bold max-sm:max-w-[320px]'>{description}</h2>
    </div>
  );
};

const PersonalRoom = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const meetingId = user?.id;
  const client = useStreamVideoClient();
  const router = useRouter();

  // Ensure the meeting link has the correct protocol
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.startsWith('http')
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `http://${process.env.NEXT_PUBLIC_BASE_URL}`;
  const meetingLink = `${baseUrl}/meeting/${meetingId}?Personal=true`;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingId!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?Personal=true`);
  };

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className="text-3xl font-bold">Personal-room</h1>

      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title='Topic' description={`${user?.username}'s meeting room`} />
        <Table title='Meeting ID' description={meetingId!} />
        <Table title='Invite Link' description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className='bg-blue-1 hover:bg-blue-800' onClick={startRoom}>
          Start Meeting
        </Button>
        <Button className='bg-dark-1' onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({
            title: 'Link Copied',
          });
        }}>
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;

