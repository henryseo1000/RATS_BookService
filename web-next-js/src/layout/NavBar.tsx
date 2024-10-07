"use client";

import React, { ReactElement, useEffect } from 'react';
import st from "./NavBar.module.scss";
import Logo from '@/components/main/Logo';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { usePathname, useRouter } from 'next/navigation';
import { ChartArea, Clock, User, Bookmark, PartyPopper, ScanBarcode } from 'lucide-react';
import { SetterOrUpdater } from 'recoil';

export interface PathProps {
    path: string,
    menu: string,
    icon?: ReactElement
}

interface Props {
    isMinimized : boolean,
    setMinimize : SetterOrUpdater<boolean>;
}

function NavBar({
    isMinimized,
    setMinimize
} : Props) {
    const router = useRouter();
    const location = usePathname();
    const { user } = useUser();

    const pathList : PathProps[] = [
        {
            path: '/dashboard',
            menu: 'Dashboard',
            icon: <ChartArea />
        },
        {
            path: '/history',
            menu: 'History',
            icon: <Clock />
        },
        {
            path: '/profile',
            menu: 'Profile',
            icon: <User />
        },
        {
            path: '/bookmark',
            menu: 'Bookmark',
            icon: <Bookmark />
        },
        {
            path: '/eventresults',
            menu: 'Event Results',
            icon: <PartyPopper />
        }
    ];

    useEffect(() => {

    }, [location]);

    return (
        <nav className={isMinimized ? st.nav_container_min : st.nav_container_max}>
            <div className={st.nav_main}>
                {
                   !isMinimized && <Logo/>
                }

                <div className={st.profile_section}>
                    <img src={user?.imageUrl ? user.imageUrl : "/public/image/user.png"} alt="profile_image" />
                    <span>안녕하세요, {user?.username}님!</span>
                    <span>컴퓨터공학과 1학년</span>
                    <SignOutButton>
                        <span className={st.sign_out}>
                            SIGN OUT
                        </span>
                    </SignOutButton>
                </div>

                <div className={st.divider}/>

                <div className={st.link_section}>
                    {
                        pathList.map((item, index) => {
                            const isActive = location?.includes(item?.path);

                            return (
                                <div 
                                    className={isActive ? st.menu_list_active : st.menu_list} 
                                    key={index}
                                    onClick={() => {
                                        router.push(item.path);
                                    }}
                                >
                                    <div className={st.bar}/>
                                    <div className={st.menu_icon}>{item?.icon}</div>
                                    <span className={st.menu_name}>{item?.menu}</span>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={st.additional_section}>
                    <ScanBarcode/>
                    <span>Your Barcode</span>
                </div>
            </div>

            <div 
                className={st.nav_controller}
                onClick={ () => {
                    setMinimize(!isMinimized);
                }}
            >
                <div className={st.nav_sizing}/>
            </div>
        </nav>
    )
}

export default NavBar;