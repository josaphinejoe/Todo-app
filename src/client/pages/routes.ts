export class Routes
{
    public static listTodos = "/todos";
    public static manageTodo = "/manage?{id?:string}";
    
    public static listFlights = "/flights";
    public static manageFlight = "/manage-flight?{id?:string}";
    
    public static listCrewMembers = "/crew-members";
    public static manageCrewMember = "/manage-crew-member";

    /**
     * static
     */
    private constructor() { }
}