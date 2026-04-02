import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/clerk-react';
import React from 'react';
import st from './MainNav.module.scss';
import { useRouter } from 'next/navigation';
import Logo from '@/components/main/Logo';

interface MainNavProps {
    isLoaded?: boolean
    isSignedIn? : boolean
}

function MainNav({isLoaded, isSignedIn} : MainNavProps) {
    const router = useRouter();
    const { user } = useUser();

    return (
        <div className={st.nav_container}>
            <Logo/>

            {isSignedIn ?
                <div>
                    <Button 
                        className={st.login_button}
                        onClick={() => router.push('/dashboard')}
                    >
                        <img src={user.imageUrl} alt="profile_image" />
                        <span>Go To DashBoard</span>
                    </Button>
                </div>
                :
                <SignInButton>
                    <Button className={st.login_button}>
                        Log In
                    </Button>
                </SignInButton>
            }
        </div>
    )
}

export default MainNav;