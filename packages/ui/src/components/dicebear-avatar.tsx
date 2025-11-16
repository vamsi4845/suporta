"use client"

import {glass} from "@dicebear/collection"
import {createAvatar} from "@dicebear/core"
import {Avatar,AvatarImage,AvatarFallback} from "@workspace/ui/components/avatar"
import {cn} from "@workspace/ui/lib/utils"
import {useMemo} from "react"


interface DicebearAvatarProps {
    seed: string;
    size?: number;
    className?: string;
    badgeClassName?: string;
    imageUrl?: string;
    badgeImageUrl?: string;
    isWelcomeConversation?: boolean;
}


export const DicebearAvatar = ({seed, size = 32, className, badgeClassName, imageUrl, badgeImageUrl, isWelcomeConversation}: DicebearAvatarProps) => {
    const avatarSrc = useMemo(() => {
        if(imageUrl) return imageUrl;
        const avatar = createAvatar(glass, {seed: seed.toLowerCase().trim(), size});
        return avatar.toDataUri();
    }, [seed, size, imageUrl]);

    const badgeSize = Math.round(size * 0.5);

    return (
        <div className="relative inline-block" style={{width: size, height: size}}>
            <Avatar className={cn("border", className)} style={{width: size, height: size}}>
                <AvatarImage src={isWelcomeConversation ? "/logo.svg" : avatarSrc} alt="Avatar" />
                </Avatar>
                {badgeImageUrl && (
                   <div className={cn("absolute bottom-0 right-0 flex items-center justify-center overflow-hidden rounded-full border-2 border-background bg-background z-50", badgeClassName)} style={{width: badgeSize, height: badgeSize,transform: "translate(15%, 15%)"}}>
                    <img src={badgeImageUrl} alt="Badge" width={badgeSize} height={badgeSize} />
                   </div>
                )}
        </div>
    )
}