'use client';

import React, { useRef } from 'react';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { LottieRefCurrentProps } from 'lottie-react';

const Sidebar = () => {
  const pathname = usePathname();
  const lottieRefs = useRef<React.RefObject<LottieRefCurrentProps>[]>(
    sidebarLinks.map(() => React.createRef<LottieRefCurrentProps>())
  );

  

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-blue-950 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link, index) => {
          const isActive = pathname === link.route;

          const handleClick = () => {
            if (link.isLottie && lottieRefs.current[index]?.current) {
              const anim = lottieRefs.current[index].current;
              anim.stop();  
              anim.play(); 
            }
          };

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-lg justify-start',
                {
                  'bg-blue-1': isActive,
                }
              )}
              onClick={handleClick}
            >
              {link.isLottie ? (
                <div className="w-7 h-7">
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
                  width={24}
                  height={24}
                />
              )}
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
