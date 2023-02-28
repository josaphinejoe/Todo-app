import { Flight } from "../../proxies/flight/flight";

export interface FlightService 
{
    getFlights(): Promise<Array<Flight>>;
    getFlight(id: string): Promise<Flight>;
    getFlightForMember(id: string): Promise<Flight | undefined>;
    createFlight(
        origin: string,
        destination: string,
        departureTime: string,
        arrivalTime: string,
        captainId: string,
        firstOfficerId: string,
        attendantIds: Array<string>
    ): Promise<void>;
    
}