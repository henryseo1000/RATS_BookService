import React from 'react'

interface LogoProps {
    mode?: "light" | "dark";
}

function Logo({ mode } : LogoProps) {
  return (
    <div className=''>
        Mr.Story
    </div>
  )
}

export default Logo