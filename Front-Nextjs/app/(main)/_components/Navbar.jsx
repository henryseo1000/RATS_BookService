"use client"
import useScrollTop from "../../../hooks/use-scroll-top";
import { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import { cn } from "../../../hooks/utils";
import { ArrowForwardIcon, ChevronLeftIcon, SpinnerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "@chakra-ui/react";
import Menu from "../_components/Menu"

export default function Navbar() {
    const MenuList = [{Items: "Barcode"}, {Items: "Search"}, {Items: "Settings"}];
    const [focusedItem, setFocusedItem] = useState(null);
    const [isOpen, setMenu] = useState(false);
    const scrolled = useScrollTop();
    const { isLoading, isAuthenticated, user} = useAuth0();

    useEffect(() => {

    },[isOpen])

    return (
        <div className={cn("z-50 select-none bg-gradient-to-b from-[#182D52] to-transparent fixed top-0 flex items-center w-full h-[60px] p-2 hover:shadow-md justify-between", 
            scrolled && "shadow-sm")}>
            <Logo/>
            <div className="flex flex-row mr-2">
                {!isAuthenticated && !isLoading && (
                    <Link href="/signup">
                        <button class="transition ease-in-out delay-150 bg-blue-500 hover:scale-110 duration-300 select-none rounded px-2 py-1">
                        Login Now
                        <ArrowForwardIcon className="ml-1"/>
                        </button>
                    </Link>
                )}

                {isLoading && (
                    <div className="items-center flex flex-row">
                        <SpinnerIcon className="animate-spin mr-2"/>
                        <p>Loading...</p>
                    </div> 
                )}

                {isAuthenticated && !isLoading && (
                    <div 
                        className="flex flex-row items-center hover:cursor-pointer hover:bg-gray-600 duration-300 p-2 rounded-md"
                        onClick={() => {
                            setMenu(!isOpen)
                        }}
                    >
                        <img draggable={false} className="flex flex-row rounded-2xl w-7" src={user.picture} alt={user.name} />
                        <p className="ml-3 font-bold select-none">Welcome Back, {user.name}!</p>
                        <IconButton
                            className={cn("ml-3 duration-300", isOpen && " -rotate-90")}
                            colorScheme='blue'
                            aria-label='Menu'
                            icon={<ChevronLeftIcon />}
                        />
                    </div> 
                )}

                {isOpen && (
                    <div className="transition-transform duration-700">
                        <Menu/>
                    </div>
                )}
            </div>
        </div>
    )
}

