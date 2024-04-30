"use client"
import useScrollTop from "../../../hooks/use-scroll-top";
import { useState } from "react";
import Logo from "./Logo.jsx";
import { useConvexAuth } from "convex/react";
import { ArrowForwardIcon, SpinnerIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";

export default function Navbar() {
    const MenuList = [{Items: "Barcode"}, {Items: "Search"}, {Items: "Settings"}];
    const [focusedItem, setFocusedItem] = useState(null);
    const scrolled = useScrollTop();
    const { isLoading, isAuthenticated } = useConvexAuth();
 
    return (
        <div className="z-50 bg-background dark:bg-[#182D52] fixed top-0 flex items-center w-full p-2 hover:shadow-md justify-between">
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
            </div>
        </div>
    )
}

