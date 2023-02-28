import { ListCrewMembersViewModel } from "./list-crew-members/list-crew-members-view-model";
import { ListFlightsViewModel } from "./list-flights/list-flights-view-model";
import { ManageCrewMemberViewModel } from "./manage-crew-member/manage-crew-member-view-model";
import { ManageFlightViewModel } from "./manage-flight/manage-flight-view-model";


export const pages: Array<Function> = [
    ListFlightsViewModel,
    ManageFlightViewModel,
    ListCrewMembersViewModel,
    ManageCrewMemberViewModel
];