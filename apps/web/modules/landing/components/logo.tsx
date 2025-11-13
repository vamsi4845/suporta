import Image from "next/image";

export function Logo() {
    return (
            <Image src="/logo.svg" alt="logo" width={28} height={28}/>
    )
}