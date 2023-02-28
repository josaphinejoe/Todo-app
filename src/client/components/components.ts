
import { ShellViewModel } from "./shell/shell-view-model";
import { NavBarViewModel } from "./nav-bar/nav-bar-view-model";
import { FlightInfoCardViewModel } from "./flight-info-card/flight-info-card-view-model";
import { MemberInfoCardViewModel } from "./member-info-card/member-info-card-view-model";


export const components: Array<Function> = [
    ShellViewModel,
    NavBarViewModel,
    FlightInfoCardViewModel,
    MemberInfoCardViewModel
];