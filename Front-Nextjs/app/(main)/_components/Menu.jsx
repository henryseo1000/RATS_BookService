"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { EditIcon, TimeIcon, ViewIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function Menu(){
  const { logout } = useAuth0();

  return(
    <div className="rounded-xl w-48 h-64 absolute bg-gradient-to-r from-[#6284F4]/80 to-[#413FBD]/80 right-4 top-[70px] flex flex-col">
      <div className="rounded-xl items-center flex h-12 justify-center m-2 hover:bg-[#6c78ae] hover:cursor-pointer">
        <EditIcon/>
        <div className="ml-2">
          My Profile
        </div>
      </div>
      <div className="rounded-xl items-center flex h-12 justify-center m-2 hover:bg-[#6c78ae] hover:cursor-pointer">
        <ViewIcon/>
        <div className="ml-2">
          Show Barcode
        </div>
      </div>
      <div className="rounded-xl items-center flex h-12 justify-center m-2 hover:bg-[#6c78ae] hover:cursor-pointer">
        <TimeIcon/>
        <div className="ml-2">
          Book Records
        </div>
      </div>
      <div className="rounded-xl items-center flex h-12 justify-center m-2 hover:bg-[#6c78ae] text-red-500 font-bold hover:cursor-pointer"
        onClick={() => {
        logout({logoutParams: { returnTo: "http://localhost:3000" }})
      }}>
        Logout
        <ArrowForwardIcon className="ml-2"/>
      </div>
    </div>
  )
}