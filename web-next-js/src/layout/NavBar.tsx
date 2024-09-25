"use client";

import React from 'react';
import st from "./NavBar.module.scss";
import Logo from '@/components/main/Logo';
import { SignOutButton } from '@clerk/clerk-react';

function NavBar() {
    return (
        <nav className={st.nav_container}>
            <Logo/>

            <div className={st.profile_section}>

            </div>

            <SignOutButton>
                Logout
            </SignOutButton>
        </nav>
    )
}

export default NavBar;