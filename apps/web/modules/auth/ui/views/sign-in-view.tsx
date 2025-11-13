import AnimatedCharactersWrapper from "@/modules/auth/ui/components/animated-characters";
import { SignIn } from "@clerk/nextjs";

export function SignInView() {
    return (
        <div>
            <AnimatedCharactersWrapper>
                <SignIn routing="hash" forceRedirectUrl="/conversations"  />
            </AnimatedCharactersWrapper>
        </div>
    )
}