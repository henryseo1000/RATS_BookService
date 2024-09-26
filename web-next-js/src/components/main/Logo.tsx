import React from 'react';
import { useRouter } from 'next/navigation';

import st from './Logo.module.scss';

interface LogoProps {
    mode?: "light" | "dark";
    useClick? : boolean
}

function Logo({ mode = 'light', useClick } : LogoProps) {
  const router = useRouter();

  return (
    <div 
      className={st.logo_container}
      onClick={ useClick ? () => {
        // router?.push({'/dashboard'});
      } :
      () => {}
    }
    >
        <img src="/image/mr_story_logo_dark.png" alt="logo" />
    </div>
  )
}

export default Logo