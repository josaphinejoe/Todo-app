import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { CrewMember } from "../../proxies/crew-member/crew-member";
import { MockCrewMemberProxy } from "../../proxies/crew-member/mock-crew-member-proxy";
import { FlightService } from "../flight-service/flight-service";
import { CrewMemberService } from "./crew-member-service";

@inject("FlightService")
export class MockCrewMemberService implements CrewMemberService
{
    private readonly _crewMembers: Array<CrewMember>;
    private readonly _flightService: FlightService;
    
    public constructor(flightService: FlightService)
    {
        this._crewMembers = [];
        
        given(flightService, "flightService").ensureHasValue().ensureIsObject();
        this._flightService = flightService;
        
        this._crewMembers.push(new MockCrewMemberProxy("1", "Joel", "Captain", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("2", "Kevin", "First Officer", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("3", "James", "First Officer", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("4", "Mary", "Attendant", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("5", "Suzy", "Attendant", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("6", "Karen", "Attendant", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("7", "Brandon", "Attendant", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("8", "Alex", "Attendant", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("9", "Biz", "Captain", this._flightService));
        this._crewMembers.push(new MockCrewMemberProxy("10", "Foden", "Attendant", this._flightService));

    }
    
    public async getCrewMembers(): Promise<Array<CrewMember>>
    {
        return Promise.resolve(this._crewMembers);
    }
    
    public async createCrewMember(id: string, name: string, designation: string): Promise<void>
    {
        const crewMember = new MockCrewMemberProxy(id, name, designation, this._flightService);
        this._crewMembers.push(crewMember);
    }
    
    public async getAvailableCrewMembers(): Promise<Array<CrewMember>>
    {
        // filter 
        const availableMembers = [];
        for (const member of this._crewMembers)
        {
            const flight = await member.getAssignedFlight();
            if (flight == null && !member.isDeleted)
            {
                availableMembers.push(member);
            }
        }
        return Promise.resolve(availableMembers);
    }
}