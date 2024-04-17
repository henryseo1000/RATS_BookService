"use client"

import useScrollTop from "../../../hooks/use-scroll-top";
import { cn } from "../../../hooks/utils";
import { useState } from "react";
import Logo from "./Logo.jsx";
import { Search, BarcodeIcon, Settings } from "lucide-react";

export default function Navbar() {
    const MenuList = [{Items: "Barcode"}, {Items: "Search"}, {Items: "Settings"}];
    const [focusedItem, setFocusedItem] = useState(null);
    const scrolled = useScrollTop();
 
    return (
        <div className={cn(
            "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo/>
            <div className="flex flex-row items-center">
                
            </div>
        </div>
    )
}

