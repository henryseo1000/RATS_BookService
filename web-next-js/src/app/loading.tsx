import React from 'react';

import st from './Loading.module.scss';
import { LoaderCircleIcon } from 'lucide-react';

function Loading() {
  return (
    <div className={st.loading_container}>
      <div className={st.loading_section}>
        <span>Now Loading...</span>
        <LoaderCircleIcon className={st.spinner}/>
      </div>
    </div>
  )
}

export default Loading;