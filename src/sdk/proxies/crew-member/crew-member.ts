import { Flight } from "../flight/flight";

export interface CrewMember
{
    id: string;
    designation: string;
    name: string;
    isDeleted: boolean;
    
    getAssignedFlight(): Promise<Flight | undefined>;
    delete(): Promise<void>;    
}