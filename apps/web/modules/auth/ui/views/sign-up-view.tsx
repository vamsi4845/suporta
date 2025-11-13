import { SignUp } from "@clerk/nextjs"
import AnimatedCharactersWrapper from "@/modules/auth/ui/components/animated-characters";

export function SignUpView() {
    return (
        <AnimatedCharactersWrapper>
            <SignUp routing="hash" forceRedirectUrl="/conversations" />
        </AnimatedCharactersWrapper>
    )
}