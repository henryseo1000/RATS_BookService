"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { EditIcon, TimeIcon, ViewIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { cn } from "../../../hooks/utils";

export default function Menu({show}){
  const { logout } = useAuth0();

  return(
    <div className={cn("rounded-xl w-56 h-48 absolute bg-gradient-to-r from-[#182D52]/80 to-[#413FBD]/80 right-4 top-[70px] flex flex-col transition-all ease-in-out duration-500", !show && " h-0")}>
      <div className={cn("rounded-xl items-center flex h-12 justify-center m-1 hover:bg-[#6c78ae] hover:cursor-pointer transition-all ease-in-out duration-500", !show && " hidden h-0")}>
        <EditIcon/>
        <a className="ml-2" href="/profile">
          My Profile
        </a>
      </div>
      <div className={cn("rounded-xl items-center flex h-12 justify-center m-1 hover:bg-[#6c78ae] hover:cursor-pointer transition-all ease-in-out duration-500", !show && " hidden h-0")}>
        <ViewIcon/>
        <a className="ml-2" href="/barcode">
          Show Barcode
        </a>
      </div>
      <div className={cn("rounded-xl items-center flex h-12 justify-center m-1 hover:bg-[#6c78ae] hover:cursor-pointer transition-all ease-in-out duration-500", !show && " hidden h-0")}>
        <TimeIcon/>
        <a className="ml-2" href="/dashboard">
          Book Records
        </a>
      </div>
      <div className={cn("rounded-xl items-center flex h-12 justify-center m-1 hover:bg-[#6c78ae] text-red-500 font-bold hover:cursor-pointer transition-all ease-in-out duration-500", !show && " hidden h-0")}
        onClick={() => {
        logout({logoutParams: { returnTo: "http://localhost:3000" }})
      }}>
        Logout
        <ArrowForwardIcon className="ml-2"/>
      </div>
    </div>
  )
}