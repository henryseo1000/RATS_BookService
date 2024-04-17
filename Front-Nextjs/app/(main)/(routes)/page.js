"use client";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isAuth, setAuth] = useState(false);

  if(!isAuth){
    return redirect("/login");
  }

  return (
    <div>
      This is main page.
      go to redirect
    </div>
  );
}
