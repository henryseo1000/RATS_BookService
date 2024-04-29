"use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react"

export default function SignOut() {

  return redirect("/")
}
