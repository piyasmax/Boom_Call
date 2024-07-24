
import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react';
import moment from 'moment-timezone';

const Home = () => {
  const now = moment().tz('Asia/Kolkata'); // Set the timezone to IST
  const time = now.format('hh:mm A'); // Format the time to 12-hour format with AM/PM
  const date = now.format('dddd, MMMM Do YYYY'); // Format the date

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover shadow-md shadow-violet-950'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming Meeting at : 
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-50 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
}

export default Home;
