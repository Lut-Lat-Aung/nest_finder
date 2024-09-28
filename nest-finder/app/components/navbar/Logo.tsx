'use client';

import Image from 'next/image';

import {useRouter} from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return (
        <Image
        alt="Logo"
        className="hidden md:block cursor-pointer logo"
        height="100"
        width="130"
        src="/images/logo.webp"
         />
    )
}

export default Logo;