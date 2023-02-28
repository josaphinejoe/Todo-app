import { NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Validator } from "@nivinjoseph/n-validate";
import { CrewMember } from "../../../sdk/proxies/crew-member/crew-member";
import { Flight } from "../../../sdk/proxies/flight/flight";
import { CrewMemberService } from "../../../sdk/services/crew-member-service/crew-member-service";
import { FlightService } from "../../../sdk/services/flight-service/flight-service";
import { Routes } from "../routes";

@template(require("./manage-flight-view.html"))
@route(Routes.manageFlight)
@inject("FlightService", "CrewMemberService", "NavigationService")
export class ManageFlightViewModel extends PageViewModel
{
    private readonly _flightService: FlightService;
    private readonly _crewMemberService: CrewMemberService;
    private readonly _navigationService: NavigationService;
    
    private _crewMembers: Array<CrewMember>;
    private _availCrewMembers: Array<CrewMember>;
    
    private _flight: Flight | null;
 
    private readonly _validator: Validator<this>;
    
    private readonly _formData: {
        id: string;
        origin: string;
        destination: string;
        departureTime: string;
        arrivalTime: string;
        captain: CrewMember | null | undefined;
        firstOfficer: CrewMember | null | undefined;
        attendants: Array<CrewMember>;
    };
    public get formData(): object { return this._formData; }    
    
    public get hasErrors(): boolean { return !this._validate(); }
    public get errors(): Record<string, any> { return this._validator.errors; }

    
    // need to return only crew members who are not already assigned a flight
    public get availFirstOfficers(): Array<CrewMember> { return this._availCrewMembers.where(t => t.designation === "First Officer"); }
    public get availCaptains(): Array<CrewMember> { return this._availCrewMembers.where(t => t.designation === "Captain"); }
    public get availAttendants(): Array<CrewMember> { return this._availCrewMembers.where(t => t.designation === "Attendant"); }
    
    
    public constructor(
        flightService: FlightService,
        crewMemberService: CrewMemberService,
        navigationService: NavigationService)
    {
        super();
        
        given(flightService, "flightService").ensureHasValue().ensureIsObject();
        this._flightService = flightService;
        
        given(crewMemberService, "crewMemberService").ensureHasValue().ensureIsObject();
        this._crewMemberService = crewMemberService;
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;

        this._flight = null;
        
        this._crewMembers = [];
        this._availCrewMembers = [];
                
        this._formData = {
            id: "",
            origin: "",
            destination: "",
            arrivalTime: "",
            departureTime: "",
            captain: null,
            firstOfficer: null,
            attendants: []
        };
        
        this._validator = this._createValidator();
    }
    
    public handleChange(e: Event): void
    {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        if (name.contains("-list")) 
        {
            const employee = this._crewMembers.find(t => t.id === value);
            if (name === "attendant-list" && employee)
            {
                const ind = this._formData.attendants.findIndex(t => t.id === employee.id);
                if (ind !== -1)
                {
                    this._formData.attendants.splice(ind, 1);
                }
                else
                {
                    this._formData.attendants.push(employee);
                }
            }
            else if (name === "captain-list")
            {
                this._formData.captain = employee;    
            }
            else 
            {
                this._formData.firstOfficer = employee;    
            }
            
        }        
    }
    
    public async save(): Promise<void> 
    {
        this._validator.enable();
        if (!this._validate())
            return;
        
        if (this._flight != null)
        {
            try
            {
                await this._flight.update(
                    this._formData.origin,
                    this._formData.destination,
                    this._formData.departureTime,
                    this._formData.arrivalTime,
                    this._formData.captain!.id,
                    this._formData.firstOfficer!.id,
                    this._formData.attendants.map(t => t.id)
                );
            }
            catch (e)
            {
                console.log(e);
                return;
            }
        }
        else
        {
            try
            {
                await this._flightService.createFlight(
                    this._formData.origin,
                    this._formData.destination,
                    this._formData.departureTime,
                    this._formData.arrivalTime,
                    this._formData.captain!.id,
                    this._formData.firstOfficer!.id,
                    this._formData.attendants.map(t => t.id)
                );
            }
            catch (e)
            {
                console.log(e);
                return;
            }
        }
        this._navigationService.navigate(Routes.listFlights);
    }
    
    protected override async onEnter(id?: string): Promise<void>
    {        
        this._availCrewMembers = await this._crewMemberService.getAvailableCrewMembers();

        this._crewMembers = await this._crewMemberService.getCrewMembers();

        
        if (id && !id.isEmptyOrWhiteSpace())
        {
            this._flightService.getFlight(id)
                .then(t => 
                {
                    this._flight = t;
                    this._formData.id = t.id;
                    this._formData.arrivalTime = t.arrivalTime;
                    this._formData.attendants = this._crewMembers.where(f => t.attendantIds.includes(f.id));
                    this._formData.captain = this._crewMembers.find(f => f.id === t.captainId);
                    this._formData.firstOfficer = this._crewMembers.find(f => f.id === t.firstOfficerId);
                    this._formData.departureTime = t.departureTime;
                    this._formData.origin = t.origin;
                    this._formData.destination = t.destination;
                })
                .catch(e => console.log(e));            
        }
    }
    
    private _validate(): boolean
    {
        this._validator.validate(this);
        return this._validator.isValid;
    }

    private _createValidator(): Validator<this>
    {
        const validator = new Validator<this>(true);
        
        validator
            .prop("formData")
            .ensure(t => t.getValue("id") !== "")
            .withMessage("id is required")
            
            .ensure(t => t.getValue("origin") !== "")
            .withMessage("origin is required")
            
            .ensure(t => t.getValue("destination") !== "")
            .withMessage("destination is required")
            
            .ensure(t => t.getValue("arrivalTime") !== "")
            .withMessage("arrivalTime is required")
            
            .ensure(t => t.getValue("departureTime") !== "")
            .withMessage("departureTime is required")
            
            .ensure(t => t.getValue("captain") != null && typeof t.getValue("captain") === "object" )
            .withMessage("captain is required")
            
            .ensure(t => t.getValue("firstOfficer") != null && typeof t.getValue("firstOfficer") === "object")
            .withMessage("first officer is required")
        
            .ensure(t => t.getValue("attendants") != null && typeof t.getValue("attendants") === "object")
            .withMessage("attendants are required")
            .ensure(t => t.getValue("attendants").length <= 5
                && t.getValue("attendants").length >= 3)
            .withMessage("Attendants cannot be greater than 5 or less than 3");
        
        return validator;
    }
}