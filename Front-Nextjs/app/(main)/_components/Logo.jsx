import Image from "next/image"

export default function Logo() {
    return (
        <div className="md:flex items-center gap-x-3 flex flex-row p-2">
            <Image
                src="/icons/mr_story_logo.svg"
                width="40"
                height="40"
                className="dark:hidden"
            />
            <Image
                src="/icons/mr_story_logo_dark.svg"
                width="40"
                height="40"
                className="hidden dark:block"
            />
            <p className="font-bold text-xl">
                <a href="./">Mr.Story</a>
            </p>
        </div>
    )
}