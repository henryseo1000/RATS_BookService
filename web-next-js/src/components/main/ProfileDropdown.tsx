"use client";

import { useClerk, useUser } from '@clerk/clerk-react';
import React, { useEffect, useRef, useState } from 'react';

import st from "./ProfileDropdown.module.scss";
import { useRouter } from 'next/navigation';

function ProfileDropdown() {
    const router = useRouter();
    const { user } = useUser();
    const {signOut} = useClerk();

    const [ open, setOpen ] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickClose = (e : MouseEvent) => {
        if (e.target 
            && ((e.target as Element).className !== st.image) 
            && ((e.target as Element).className !== st.dropdown)) 
        {
            setOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickClose);

        return () => window.removeEventListener('click', handleClickClose);
    }, []);

    useEffect(() => {
        if (ref.current) {
            if (open) {
                ref.current.style.display = 'flex';
                ref.current.style.height = 'auto';
            }
            else {
                ref.current.style.display = 'none';
                ref.current.style.height = '0px';
            }
        }
    }, [open])

    return (
        <div className={st.container}>
            <img className={st.image} src={user.imageUrl} alt="profile_image" onClick={()=>{setOpen(!open)}}/>
            <div className={st.dropdown} ref={ref}>
                <div onClick={() => router.push('/dashboard')}>
                    Go to Dashboard
                </div>
                <div onClick={() => router.push('/profile')}>
                    View Profile
                </div>
                <div onClick={() => signOut()}>
                    Log Out
                </div>
            </div>
        </div>
    )
}

export default ProfileDropdown;