"use client";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isAuth, setAuth] = useState(false);

  if(!isAuth){
    return redirect("signup");
  }

  return (
    <div>
      
    </div>
  );
}
