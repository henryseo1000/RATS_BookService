"use client";

import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { SetterOrUpdater, useRecoilValue } from 'recoil';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { usePathname, useRouter } from 'next/navigation';
import { ChartArea, User, Paperclip, Bookmark, PartyPopper, ScanBarcode } from 'lucide-react';

import Logo from '@/components/main/Logo';

import st from "./NavBar.module.scss";
import { userDataState } from '@/stores/userDataState';

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
    const navCon = useRef(null);
    const userData = useRecoilValue(userDataState);

    const pathList : PathProps[] = [
        {
            path: '/dashboard',
            menu: 'Dashboard',
            icon: <ChartArea />
        },
        {
            path: '/files',
            menu: 'Files',
            icon: <Paperclip />
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

    const handleScroll = () => {
        if(window.innerWidth <= 1100 && (window.scrollY > 200 || window.pageYOffset > 200)) {
            navCon.current.style.transform = 'translate(0px, -250px)';
        }
        else {
            navCon.current.style.transform = 'none';
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location]);

    return (
        <nav className={isMinimized ? st.nav_container_min : st.nav_container_max} ref={navCon}>
            <div className={st.nav_main}>
                <div className={st.logo_area}>
                    {
                        !isMinimized && <Logo/>
                    }   
                </div>

                <div className={st.profile_section}>
                    <img 
                        src={user?.imageUrl ? user.imageUrl : "/public/image/user.png"} 
                        alt="profile_image" 
                        onClick={() => {
                            router.push('/profile');
                        }}
                    />
                    <span>안녕하세요, {userData.login_id}님!</span>
                    <span>{`${userData.major} ${userData.grade}학년`}</span>
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

                <div 
                    className={st.additional_section}
                    onClick={() => {
                        router.push('/barcode')
                    }}
                >
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