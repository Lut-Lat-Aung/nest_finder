'use client'

import Profile from "../Profile";
import { useCallback, useState } from 'react';
import MenuItem from "./MenuItem";

const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    return(

<div className="
relative
">

    <div className="
    flex flex-row items-center gap-7
    ">

        <div 
        className="hidden md:block cursor-pointer
        text-sm
        font-semibold
        border-x-[1px]
        px-4
        py-2
        rounded-full
        hover:bg-neutral-100
        transition
        cursor-pointer
        "
        
        >

        Nest your home

        </div>
        <div onClick={toggleOpen}>
<Profile/></div>
<div></div>

    </div>

    {isOpen && (
        <div className="
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm
        }">
            <div className="
            flex
            flex-col
            cursor-pointer
            
            ">
                <>
                <MenuItem 
                onClick={() => {}}
                label = "My Profile"
                
                />
                </>



            </div>

            </div>
            )}

</div>

    );

}

export default UserMenu;