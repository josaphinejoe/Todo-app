import { Flight } from "../../proxies/flight/flight";
import { FlightService } from "./flight-service";
import { given } from "@nivinjoseph/n-defensive";
import { MockFlightProxy } from "../../proxies/flight/mock-flight-proxy";

export class MockFlightService implements FlightService
{
    private readonly _flights: Array<Flight>;
    
    public constructor()
    {
        this._flights = [];
        this._flights.push(new MockFlightProxy("Toronto", "Tokyo", "2023-02-11T20:11", "2023-02-12T20:11", "1", "2", ["4", "5", "6"]));
    }
    
    public async getFlights(): Promise<Array<Flight>>
    {
        // go through each crew member and check if they are deleted or not
        return Promise.resolve(this._flights);
    }
    
    public async getFlight(id: string): Promise<Flight>
    {
        given(id, "id").ensureHasValue().ensureIsString();
        const flight = this._flights.find(t => t.id === id) as Flight;
        return Promise.resolve(flight);
    }
    
    public async getFlightForMember(id: string): Promise<Flight | undefined>
    {
        given(id, "id").ensureHasValue().ensureIsString();
        
        const flight = this._flights.find(t => t.captainId === id || t.firstOfficerId === id || t.attendantIds.includes(id));
        return Promise.resolve(flight);
    }
    
    
    public async createFlight(
        origin: string,
        destination: string,
        departureTime: string,
        arrivalTime: string,
        captainId: string,
        firstOfficerId: string,
        attendantIds: Array<string>): Promise<void>
    {
        given(origin, "origin").ensureHasValue().ensureIsString();
        given(destination, "destination").ensureHasValue().ensureIsString();
        given(arrivalTime, "arrivalTime").ensureHasValue().ensureIsString();
        given(departureTime, "departureTime").ensureHasValue().ensureIsString();
        given(captainId, "captainId").ensureHasValue().ensureIsString();
        given(firstOfficerId, "firstOfficerId").ensureHasValue().ensureIsString();
        given(attendantIds, "attendantIds").ensureHasValue().ensureIsArray();
        
        const flight = new MockFlightProxy(
            origin,
            destination,
            departureTime,
            arrivalTime,
            captainId,
            firstOfficerId,
            attendantIds);

        this._flights.push(flight);
    }
}