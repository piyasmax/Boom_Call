'use client'

import React, { useRef } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

const MobileNav = () => {
    const pathname = usePathname()

    // Refs for each Lottie animation
    const lottieRefs = useRef<React.RefObject<LottieRefCurrentProps>[]>(
        sidebarLinks.map(() => React.createRef<LottieRefCurrentProps>())
    )

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src="/icons/hamburger.svg"
                        width={32}
                        height={32}
                        alt="hamburger"
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent side="left" className='border-none bg-dark-1'>
                    <Link href="/" className='flex items-center gap-2'>
                        <Image
                            src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt="logo"
                            className='max-sm:size-10'
                        />
                        <p className='text-[26px] font-extrabold text-white'>Boom</p>
                    </Link>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map((link, index) => {
                                    const isActive = pathname === link.route
                                    return (
                                        <SheetClose asChild key={link.label}>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                onMouseEnter={() => {
                                                    if (link.isLottie && lottieRefs.current[index]?.current) {
                                                        const anim = lottieRefs.current[index].current;
                                                        anim.stop();
                                                        anim.play();
                                                    }
                                                }}
                                                className={cn(
                                                    'flex gap-4 items-center p-4 rounded-lg w-full max-w-60 hover:bg-blue-900 transition-colors duration-200',
                                                    {
                                                        'bg-blue-1': isActive,
                                                    }
                                                )}
                                            >
                                                {link.isLottie ? (
                                                    <div className="w-6 h-6">
                                                        <Lottie
                                                            lottieRef={lottieRefs.current[index]}
                                                            animationData={link.lottieData}
                                                            loop={false}
                                                            autoplay={false}
                                                        />
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={link.imgUrl ?? '/icons/default-icon.svg'}
                                                        alt={link.label}
                                                        width={20}
                                                        height={20}
                                                    />
                                                )}
                                                <p className="font-semibold">{link.label}</p>
                                            </Link>

                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav
