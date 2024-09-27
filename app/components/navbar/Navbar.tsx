'use client';

import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const Navbar = () => {
    
    return (
        <div className="w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[2px]">
                <Container>
                    <div
                        className="
                        flex 
                        flex-row
                        items-center
                        justify-between
                        gap-3
                        md:gap-0
                        "
                    >
                        <Logo />
                        {/* Pass the current user to the UserMenu component */}
                        <UserMenu/> 
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Navbar;
