import React from 'react';
import st from "./notFound.module.scss";

function notFound() {
  return (
    <div className={st.page_container}>
      <img src="/image/404.png" alt="not-found-img" draggable={false}/>
      <span>OOPS!</span>
      <span>We can't find a page you're looking for.</span>
    </div>
  )
}

export default notFound;