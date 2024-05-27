"use client";
import { QuestionOutlineIcon, Search2Icon, StarIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { cn } from "../../../hooks/utils";

export default function NavMenu(){
  const MenuList = ["search", "doc", "support", "event"];
  useEffect(() => {
    for(var i = 0; i < MenuList.length; i++){
      const test = document.getElementById(MenuList[i]);
      const bar = document.getElementById(MenuList[i] + '_underbar');
      bar.style.width = "0px"

      test.addEventListener('mouseover', (e)=> {
        bar.style.width = "100%"
      })

      test.addEventListener('mouseout', (e)=> {
        bar.style.width = "0px"
      })
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-center">
      <div id="search" className="flex flex-col hover:cursor-pointer mr-5 w-24 transition-all hover:bg-gray-500/50 p-1 rounded-sm">
        <div className="flex flex-row justify-center items-center">
          <Search2Icon/>
          <div id="search_text" className="ml-2 transition-all">
            Search
          </div>
        </div>
        <div id="search_underbar" className={cn("bg-[#ffffff] h-1 w-full relative rounded-xl mt-1 transition-all")}/>
      </div>

      <div id="doc" className="flex flex-col hover:cursor-pointer w-24 mr-5 transition-all hover:bg-gray-500/50 p-1 rounded-sm">
        <div className="flex flex-row justify-center items-center">
          <QuestionOutlineIcon/>
          <div id="doc_text" className="ml-2 transition-all">
            Doc
          </div>
        </div>
        <div id="doc_underbar" className={cn("bg-[#ffffff] h-1 w-full relative rounded-xl mt-1 transition-all")}/>
      </div>

      <div id="event" className="flex flex-col hover:cursor-pointer mr-5 w-24 transition-all hover:bg-gray-500/50 p-1 rounded-sm">
        <div className="flex flex-row justify-center items-center">
          <StarIcon/>
          <div id="event_text" className="ml-2 transition-all">
            Events
          </div>
        </div>
        <div id="event_underbar" className={cn("bg-[#ffffff] h-1 w-full relative rounded-xl mt-1 transition-all")}/>
      </div>

      <div id="support" className="flex flex-col hover:cursor-pointer w-24 transition-all hover:bg-gray-500/50 p-1 rounded-sm">
        <div className="flex flex-row justify-center items-center">
          <TriangleUpIcon/>
          <div id="support_text" className="ml-2 transition-all">
            Support
          </div>
        </div>
        <div id="support_underbar" className={cn("bg-[#ffffff] h-1 w-full relative rounded-xl mt-1 transition-all")}/>
      </div>
    </div>
  )
}