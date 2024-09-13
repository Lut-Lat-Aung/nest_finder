import Container from "../Container";
import Logo from "./Logo";

const Navbar = () => {
    return (
        <div
        className="fixed w-full bg-white z-10 shadow-sm"
        >
            <div
            className="py-4 border-b-[2px]"
            >
                <Container>
                    This is just a container for search and logo
                    <div
                    className="flex 
                    flex-row
                    items-center
                    justify-between
                    gap-3
                    md:gap-0
                    "
                    
                    >



                        <Logo/>
                    </div>
                </Container>


            </div>
            This is where the navbar will go
            </div>
    );
}


export default Navbar;