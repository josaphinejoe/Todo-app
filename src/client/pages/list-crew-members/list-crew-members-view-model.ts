import { NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { CrewMember } from "../../../sdk/proxies/crew-member/crew-member";
import { CrewMemberService } from "../../../sdk/services/crew-member-service/crew-member-service";
import { Routes } from "../routes";

@template(require("./list-crew-members-view.html"))
@route(Routes.listCrewMembers)
@inject("CrewMemberService", "NavigationService")
export class ListCrewMembersViewModel extends PageViewModel
{
    private readonly _crewMemberService: CrewMemberService;
    private readonly _navigationService: NavigationService;
    
    private _crewMembers: Array<CrewMember>;
    
    public get crewMembers(): Array<CrewMember> { return this._crewMembers.where(t => !t.isDeleted); }
    
    public constructor(
        crewMemberService: CrewMemberService,
        navigationService: NavigationService)
    {
        super();
        
        given(crewMemberService, "crewMemberService").ensureHasValue().ensureIsObject();
        this._crewMemberService = crewMemberService;
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
        
        this._crewMembers = [];
    }
    
    public createMember(): void
    {
        this._navigationService.navigate(Routes.manageCrewMember);
    }
    
    protected override onEnter(): void 
    {
        super.onEnter();
        this._crewMemberService.getCrewMembers()
            .then(t => this._crewMembers = t)
            .catch(e => console.log(e));
    }
    
    
    
}