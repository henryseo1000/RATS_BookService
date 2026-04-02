import React from 'react';
import { useRouter } from 'next/navigation';

import st from './Logo.module.scss';

interface LogoProps {
    mode?: "light" | "dark";
    useClick? : boolean;
}

function Logo({ mode = 'light', useClick = true } : LogoProps) {
  const router = useRouter();

  return (
    <div 
      className={st.logo_container}
      onClick={ useClick ? () => {
        router?.push('/');
      } :
      () => {}
      }
    >
        <img src={mode === 'light' ? "/image/mr_story_logo_dark.png" : "/image/mr_story_logo.png"} alt="logo" />
    </div>
  )
}

export default Logo