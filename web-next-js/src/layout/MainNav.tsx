import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import st from './MainNav.module.scss';
import { useRouter } from 'next/navigation';
import Logo from '@/components/main/Logo';
import { ArrowRight, Lock } from 'lucide-react';
import ProfileDropdown from '@/components/main/ProfileDropdown';

interface MainNavProps {
    isLoaded?: boolean
    isSignedIn?: boolean
    scrollChange?: number
}

function MainNav({isLoaded, isSignedIn, scrollChange} : MainNavProps) {
    const router = useRouter();
    const { user } = useUser();
    const [ topOffset, setTopOffset ] = useState<number>(window.scrollY)
    const [ change, setChange ] = useState<boolean>(false);

    const handleScrollChange = () => {
        setTopOffset(window.scrollY);

        if( topOffset > 500 ) {
            setChange(true);
        }
        else {
            setChange(false);
        }
    }

    useEffect(() => {
        handleScrollChange();
        window.addEventListener("scroll", handleScrollChange);

        return () => window.removeEventListener("scroll", handleScrollChange);
    }, [topOffset])

    return (
        <div className={change ? st.changed_container : st.nav_container}>
            <Logo mode={change ? "dark" : "light"}/>

            {isSignedIn ?
                <div className={st.siginedIn}>
                    <ProfileDropdown />
                    <Button 
                        className={st.login_button}
                        onClick={() => router.push('/dashboard')}
                    >
                        <span>Go To DashBoard</span>
                        <ArrowRight className={st.icon}/>
                    </Button>
                </div>
                :
                <SignInButton>
                    <Button className={st.login_button}>
                        <span>Log In</span>
                        <Lock className={st.icon}/>
                    </Button>
                </SignInButton>
            }
        </div>
    )
}

export default MainNav;