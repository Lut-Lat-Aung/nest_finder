"use client";
// React libraries
import React, { FC, useCallback, useState } from 'react';
// Icons
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
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

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onNestYourHome} // Navigate to the "Nest your Home" page
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Nest your Home
        </div>
        <div
          onClick={onFindNests} // Navigate to the Home page (now Find Nests page)
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Find Nests
        </div>
        
      </div>
      
    </div>
  );
};

export default UserMenu;
