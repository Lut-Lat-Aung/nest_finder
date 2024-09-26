"use client";
// React libraries
import React, { FC, useCallback, useState } from 'react';

import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // Navigate to Nest your Home page
  const onNestYourHome = useCallback(() => {
    router.push('/nest-your-home');
  }, [router]);

  // Navigate to Find Nests page
  const onFindNests = useCallback(() => {
    router.push('/');
  }, [router]);

  // Navigate to Booked Apartments page
  const onViewBookings = useCallback(() => {
    router.push('/booked-apartments');
  }, [router]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onNestYourHome}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Nest your Home
        </div>
        <div
          onClick={onFindNests}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Find Nests
        </div>
        <div
          onClick={onViewBookings} // Navigate to the "Booked Apartments" page
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          View Booking
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
