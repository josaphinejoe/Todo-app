import { ListCrewMembersViewModel } from "./list-crew-members/list-crew-members-view-model";
import { ListFlightsViewModel } from "./list-flights/list-flights-view-model";
import { ListTodosViewModel } from "./list-todos/list-todos-view-model";
import { ManageCrewMemberViewModel } from "./manage-crew-member/manage-crew-member-view-model";
import { ManageFlightViewModel } from "./manage-flight/manage-flight-view-model";
import { ManageTodoViewModel } from "./manage-todo/manage-todo-view-model";


export const pages: Array<Function> = [
    ListTodosViewModel,
    ManageTodoViewModel,
    ListFlightsViewModel,
    ManageFlightViewModel,
    ListCrewMembersViewModel,
    ManageCrewMemberViewModel
];