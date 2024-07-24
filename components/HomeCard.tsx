import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';

interface HomeCardProps{
    className:string,
    title:string,
    description:string,
    image:any,
    handelClick:()=>void;
    img:any
}

const HomeCard = ({className,img,title,description,handelClick}:HomeCardProps) => {
    return (
        <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', className)}onClick={handelClick}>

            <div className="flex items-center size-12 rounded-[10px]">
                <Image
                    src={img}
                    alt='add meeting icon'
                    width={24}
                    height={24}
                />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-bold'> {title}</h1>
                <p className='text-lg font-normal'>{description}</p>

            </div>
        </div>
    )
}

export default HomeCard