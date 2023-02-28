import { given } from "@nivinjoseph/n-defensive";
import { Flight } from "./flight";

export class MockFlightProxy implements Flight
{
    private readonly _id: string;
    private _origin: string;
    private _destination: string;
    private _departureTime: string;
    private _arrivalTime: string;
    private _captainId: string | null;
    private _firstOfficerId: string | null;
    private _attendantIds: Array<string>;
    
    public get id(): string { return this._id; }
    public get origin(): string { return this._origin; }
    public get destination(): string { return this._destination; }
    public get departureTime(): string { return this._departureTime; }
    public get arrivalTime(): string { return this._arrivalTime; }
    public get captainId(): string | null { return this._captainId; }
    public get firstOfficerId(): string | null { return this._firstOfficerId; }
    public get attendantIds(): Array<string> { return this._attendantIds; }
    
    public constructor(
        origin: string,
        destination: string,
        departureTime: string,
        arrivalTime: string,
        captainId: string,
        firstOfficerId: string,
        attendantIds: Array<string>
    )
    {
        this._id = String(Math.floor(Math.random() * 10000));
        
        given(origin, "origin").ensureHasValue().ensureIsString();
        this._origin = origin;
        
        given(destination, "destination").ensureHasValue().ensureIsString();
        this._destination = destination;
        
        given(departureTime, "departureTime").ensureHasValue();
        this._departureTime = departureTime;
        
        given(arrivalTime, "arrivalTime").ensureHasValue();
        this._arrivalTime = arrivalTime;
        
        given(captainId, "captainId").ensureHasValue().ensureIsString();
        this._captainId = captainId;
        
        given(firstOfficerId, "firstOfficerId").ensureHasValue().ensureIsString();
        this._firstOfficerId = firstOfficerId;
        
        given(attendantIds, "attendantIds").ensureHasValue().ensureIsArray();
        this._attendantIds = attendantIds;
        
        
    }
    
    public async update(
        origin: string,
        destination: string,
        departureTime: string,
        arrivalTime: string,
        captainId: string | null,
        firstOfficerId: string | null,
        attendantIds: Array<string>
    ): Promise<void>
    {
        given(origin, "origin").ensureHasValue().ensureIsString();
        this._origin = origin;

        given(destination, "destination").ensureHasValue().ensureIsString();
        this._destination = destination;

        given(departureTime, "departureTime").ensureHasValue();
        this._departureTime = departureTime;

        given(arrivalTime, "arrivalTime").ensureHasValue();
        this._arrivalTime = arrivalTime;

        given(captainId, "captainId").ensureHasValue().ensureIsString();
        this._captainId = captainId;
        
        given(firstOfficerId, "firstOfficerId").ensureHasValue().ensureIsString();
        this._firstOfficerId = firstOfficerId;
        
        given(attendantIds, "attendantIds").ensureHasValue().ensureIsArray();
        this._attendantIds = attendantIds;
        
    }
    
    public async removeMember(id: string): Promise<void>
    {
        if (this._captainId === id)
        {
            this._captainId = null;
        }
        else if (this._firstOfficerId === id)
        {
            this._firstOfficerId = null;
        }
        else
        {
            this._attendantIds.splice(this._attendantIds.indexOf(id), 1);
        }
    }
    
    public isValid(): boolean
    {
        return this._captainId != null && this._firstOfficerId != null
            && this._attendantIds.length >= 3 && this._attendantIds.length <= 5;
    }
    
}