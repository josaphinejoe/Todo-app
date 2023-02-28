import { NavigationService, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { given } from "@nivinjoseph/n-defensive";
import { inject } from "@nivinjoseph/n-ject";
import { Flight } from "../../../sdk/proxies/flight/flight";
import { FlightService } from "../../../sdk/services/flight-service/flight-service";
import { Routes } from "../routes";

@template(require("./list-flights-view.html"))
@route(Routes.listFlights)
@inject("FlightService", "NavigationService")
export class ListFlightsViewModel extends PageViewModel
{
    private readonly _flightsService: FlightService;
    private readonly _navigationService: NavigationService;
    
    private _flights: Array<Flight>;
    
    public get flights(): Array<Flight>{ return this._flights; }
    
    
    
    public constructor(
        flightService: FlightService,
        navigationService: NavigationService) 
    {
        super();
        given(flightService, "flightService").ensureHasValue().ensureIsObject();
        this._flightsService = flightService;
        
        given(navigationService, "navigationService").ensureHasValue().ensureIsObject();
        this._navigationService = navigationService;
        
        this._flights = [];
    }
    
    
    public createFlight(): void
    {
        this._navigationService.navigate(Routes.manageFlight);
    }
    
    protected override onEnter(): void
    {
        super.onEnter();
        console.log("onEnter, when the page has appeared, usually used to fetch data to show on the page. The parameters for this function would be any query/path params of the url defined in the route");
        this._flightsService.getFlights()
            .then(t => this._flights = t)
            .catch(e => console.log(e));
    }
    
    
    
}