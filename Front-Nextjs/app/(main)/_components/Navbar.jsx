"use client"
import useScrollTop from "../../../hooks/use-scroll-top";
import { useState } from "react";
import Logo from "./Logo.jsx";
import { cn } from "../../../hooks/utils";
import { ArrowForwardIcon, SpinnerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";

export default function Navbar() {
    const MenuList = [{Items: "Barcode"}, {Items: "Search"}, {Items: "Settings"}];
    const [focusedItem, setFocusedItem] = useState(null);
    const scrolled = useScrollTop();
    const { isLoading, isAuthenticated, user } = useAuth0();

    return (
        <div className={cn("z-50 bg-gradient-to-b from-[#182D52] to-transparent fixed top-0 flex items-center w-full p-2 hover:shadow-md justify-between", 
            scrolled && "shadow-sm")}>
            <Logo/>
            <div className="flex flex-row mr-2">
                {!isAuthenticated && !isLoading && (
                    <Link href="/signup">
                        <button class="transition ease-in-out delay-150 bg-blue-500 hover:scale-110 duration-300 rounded px-2 py-1">
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
                    <div className="flex flex-row items-center">
                        <img draggable={false} className="flex flex-row rounded-xl w-10" src={user.picture} alt={user.name} />
                        <p className="ml-2">Welcome Back, {user.name}!</p>
                    </div> 
                )}
            </div>
        </div>
    )
}

