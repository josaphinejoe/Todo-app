export interface Flight
{
    id: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    captainId: string | null;
    firstOfficerId: string | null;
    attendantIds: Array<string>;
    
    update(
        origin: string,
        destination: string,
        departureTime: string,
        arrivalTime: string,
        captainId: string,
        firstOfficerId: string,
        attendantIds: Array<string>): Promise<void>;
    
    removeMember(id: string): Promise<void>;
    
    isValid(): boolean;
}