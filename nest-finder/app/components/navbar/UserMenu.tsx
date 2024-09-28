import { useRouter } from 'next/navigation';
import { SafeUser } from '@/app/types';
import { FC, useCallback } from 'react';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();


  const onNestYourHome = useCallback(() => {
    router.push('/nest-your-home');
  }, [router]);

  const onFindNests = useCallback(() => {
    router.push('/');
  }, [router]);

  const onViewBookings = useCallback(() => {
    router.push('/booked-apartments');
  }, [router]);

  const onProfile = useCallback(() => {
    router.push('/profiles');
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
          onClick={onViewBookings}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          View Booking
        </div>
        <div
          onClick={onProfile}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          Profiles
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

