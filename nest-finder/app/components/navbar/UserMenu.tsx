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
      <div className='container'>
        <div
          onClick={onNestYourHome}
          className='button'
        >
          Nest your Home
        </div>
        <div
          onClick={onFindNests}
          className='button'
        >
          Find Nests
        </div>
        <div
          onClick={onViewBookings}
          className='button'
        >
          View Booking
        </div>
        <div
          onClick={onProfile}
          className='button'
        >
          Profiles
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

