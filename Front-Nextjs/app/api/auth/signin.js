"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react"

export default function Login() {
  const [isAuth, setAuth] = useState(false);

  return (
    <div onClick={()=> {signIn}}>
      hello
    </div>
  );
}
