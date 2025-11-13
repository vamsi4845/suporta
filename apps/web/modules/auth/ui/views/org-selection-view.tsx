import { OrganizationList } from "@clerk/nextjs";
import AnimatedCharactersWrapper from "@/modules/auth/ui/components/animated-characters";


export function OrgSelectionView(){

    return (
        <AnimatedCharactersWrapper>
            <OrganizationList
                afterCreateOrganizationUrl="/conversations"
                afterSelectOrganizationUrl="/conversations"
                hidePersonal
                skipInvitationScreen
                hideSlug
            />
        </AnimatedCharactersWrapper>
    )
    
}