import { given } from "@nivinjoseph/n-defensive";
import { FlightService } from "../../services/flight-service/flight-service";
import { Flight } from "../flight/flight";
import { CrewMember } from "./crew-member";

export class MockCrewMemberProxy implements CrewMember
{
    private readonly _flightService: FlightService;
    private readonly _id: string;
    private readonly _designation: string;
    private readonly _name: string;
    private _isDeleted: boolean;

    public get id(): string { return this._id; }
    public get designation(): string { return this._designation; }
    public get name(): string { return this._name; }
    public get isDeleted(): boolean { return this._isDeleted; }
    
    public constructor(id: string, name: string, designation: string, flightService: FlightService)
    {
        given(id, "id").ensureHasValue().ensureIsString();
        this._id = id;
        
        given(name, "name").ensureHasValue().ensureIsString();
        this._name = name;
        
        given(designation, "designation").ensureHasValue().ensureIsString();
        this._designation = designation;
        
        given(flightService, "flightService").ensureHasValue().ensureIsObject();
        this._flightService = flightService;
        
        this._isDeleted = false;
    }
    
    
    public async delete(): Promise<void>
    {
        given(this, "this").ensure(t => !t._isDeleted, "deleting crew member that is already deleted");
        this._isDeleted = true;
        
        const flight = await this._flightService.getFlightForMember(this._id);
        if (flight != null)
        {
            await flight.removeMember(this._id);
        }
    }
    
    public async getAssignedFlight(): Promise<Flight | undefined> 
    {
        const flight = await this._flightService.getFlightForMember(this._id);
        return Promise.resolve(flight);
    }
}