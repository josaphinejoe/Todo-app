import { NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { strval, Validator } from "@nivinjoseph/n-validate";
import { CrewMemberService } from "../../../sdk/services/crew-member-service/crew-member-service";
import { Routes } from "../routes";

@template(require("./manage-crew-member-view.html"))
@route(Routes.manageCrewMember)
@inject("NavigationService", "CrewMemberService")
export class ManageCrewMemberViewModel extends PageViewModel
{
    private readonly _navigationService: NavigationService;
    private readonly _crewMemberService: CrewMemberService;
    
    private _name: string;
    private _designation: string;
    
    private readonly _validator: Validator<this>;
    
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    
    public get designation(): string { return this._designation; }
    public set designation(value: string) { this._designation = value; } 
    
    public get hasErrors(): boolean { return !this._validate(); }
    public get errors(): Record<string, any> { return this._validator.errors; }
    
    public constructor(navigationService: NavigationService, crewMemberService: CrewMemberService) 
    {
        super();
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
        
        given(crewMemberService, "crewMemberService").ensureHasValue().ensureIsObject();
        this._crewMemberService = crewMemberService;
        
        this._name = '';
        this._designation = '';
        
        this._validator = this._createValidator();
    }
    
    public async save():Promise<void>
    {
        this._validator.enable();
        if (!this._validate())
            return;
        
        try 
        {
            const id = String(Math.floor(Math.random() * 1000));
            await this._crewMemberService.createCrewMember(id, this._name, this._designation);
            this._navigationService.navigate(Routes.listCrewMembers);
        }
        catch (e)
        {
            console.log(e);
            return;
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
            .prop("name")
            .isRequired()
            .withMessage("name is required")
            .isString()
            .useValidationRule(strval.hasMaxLength(30));
        
        validator
            .prop("designation")
            .isRequired()
            .withMessage("designation is required")
            .isString();
        
        return validator;

    }
}