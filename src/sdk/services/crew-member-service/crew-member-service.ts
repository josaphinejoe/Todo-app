import { CrewMember } from "../../proxies/crew-member/crew-member";

export interface CrewMemberService
{
    getCrewMembers(): Promise<Array<CrewMember>>;
    getAvailableCrewMembers(): Promise<Array<CrewMember>>;
    createCrewMember(id: string, name: string, designation: string): Promise<void>;
}