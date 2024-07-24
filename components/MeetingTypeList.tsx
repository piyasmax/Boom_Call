  "use client"
import React, { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input"


const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    });

    const [call, setCall] = useState<Call | null>(null);
    const { toast } = useToast();

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast({
                    title: "Please select a date and time",
                });
                return;
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('Failed to create call');

            const startsAt = values.dateTime.toISOString();
            const description = values.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description: description
                    }
                }
            });

            setCall(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }

            toast({
                title: "Meeting Created",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Failed to create meeting",
            });
        }
    };

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call?.id}`;

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img="/icons/add-meeting.svg"
                title="Add Meeting"
                description="Start an instant meeting"
                handelClick={() => setMeetingState('isInstantMeeting')}
                className="bg-yellow-400" image={undefined}            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your Meeting"
                handelClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-green-400" image={undefined}            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check Out Your recordings"
                handelClick={() => router.push('/recordings')}
                className="bg-red-400" image={undefined}            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="Via invitation link"
                handelClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-violet-800" image={undefined}            />
            {!call ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handelClick={createMeeting} buttonText={''} buttonIcon={''} >
                    <div className="flex flex-col gap-2.5">
                        <label className='text-base text-normal leading-[22px] text-sky-2'>Add a description</label>
                        <Textarea
                            className='border-none bg-gray-600 focus-visible:ring-offset-09'
                            onChange={(e) => setValues({ ...values, description: e.target.value })}
                        />
                        <div className="flex w-full flex-col gap-2.5">
                            <label className='text-base text-normal leading-[22px] text-sky-2'>Select date and time</label>
                            <ReactDatePicker
                                selected={values.dateTime}
                                onChange={(date) => setValues({ ...values, dateTime: date! })}
                                showTimeSelect
                                timeFormat='HH:mm'
                                timeIntervals={15}
                                timeCaption='time'
                                dateFormat='MMMM d, yyyy h:mm aa'
                                className='bg-gray-600 w-full rounded p-2 focus:outline-none'
                            />
                        </div>
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    className="text-center"
                    handelClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: 'Link copied' });
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                    buttonText='Copy Meeting Link'
                />
            )}

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handelClick={createMeeting} buttonIcon={''}
                />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handelClick={()=>router.push(values.link)} buttonIcon={''}
                >
                    <Input
                    placeholder='Meering Link' 
                    className='border-none bg-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0'
                    onChange={(e)=>setValues({...values,link:e.target.value})}
                    />
             </MeetingModal>
        </section>
    );
};

export default MeetingTypeList
function setCallDetails(call: Call) {
    throw new Error('Function not implemented.')
}

