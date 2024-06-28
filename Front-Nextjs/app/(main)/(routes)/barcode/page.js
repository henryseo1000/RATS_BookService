"use client";

export default function Barcode(){
  return (
    <div className="bg-black w-full h-screen justify-center items-center flex flex-col">
      <div className="pb-4 font-bold text-2xl select-none">
        This is your barcode!
      </div>

      <img
        src="http://bwipjs-api.metafloor.com/?bcid=code128&text=AB1234567890&scale=3&includetext&backgroundcolor=ffffff&padding"
      />
    </div>
  )
}