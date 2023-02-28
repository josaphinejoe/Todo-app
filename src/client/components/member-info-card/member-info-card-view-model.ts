import { bind, ComponentViewModel, element, template } from "@nivinjoseph/n-app";
import { CrewMember } from "../../../sdk/proxies/crew-member/crew-member";
import { Flight } from "../../../sdk/proxies/flight/flight";

@template(require("./member-info-card-view.html"))
@element("member-info-card")
@bind({
    member: "object"    
})
export class MemberInfoCardViewModel extends ComponentViewModel
{
    public get memberValue(): CrewMember { return this.getBound<CrewMember>("member"); }
    
    
    public constructor()
    {
        super();
    }
    
    public async deleteMember(): Promise<void> 
    {
        this.memberValue.delete()
            .catch(e => console.log(e));
    }
}