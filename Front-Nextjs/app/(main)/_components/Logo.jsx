import Image from "next/image"

export default function Logo() {
    return (
        <div className="md:flex items-center gap-x-3 flex flex-row p-2">
            <Image
                src="/icons/mr_story_logo.svg"
                width="40"
                height="40"
                className="dark:hidden"
                alt="logo"
                draggable={false}
            />
            <Image
                src="/icons/mr_story_logo_dark.svg"
                width="40"
                height="40"
                className="hidden dark:block"
                alt="logo"
                draggable={false}
            />
            <p className="font-extrabold text-xl">
                <a href="./">MR.STORY</a> 
            </p>
        </div>
    )
}