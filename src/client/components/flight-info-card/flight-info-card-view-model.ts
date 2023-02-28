import { ComponentViewModel, element, template, bind, NavigationService } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Flight } from "../../../sdk/proxies/flight/flight";
import { Routes } from "../../pages/routes";

@template(require("./flight-info-card-view.html"))
@element("flight-info-card")
@bind({
    flight: "object"
})
@inject("NavigationService")
export class FlightInfoCardViewModel extends ComponentViewModel
{
    private readonly _navigationService: NavigationService;
    
    public get flightValue(): Flight { return this.getBound<Flight>("flight"); }
    
    public constructor(navigationService: NavigationService) 
    {
        super();
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
        
    }
    
    public manageFlight(): void
    {
        this._navigationService.navigate(Routes.manageFlight, { id: this.flightValue.id });
    }
}