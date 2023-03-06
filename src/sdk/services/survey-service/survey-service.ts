import { Survey } from "../../proxies/survey/survey";

export interface SurveyService
{
    getSurveys(): Promise<ReadonlyArray<Survey>>;
    getSurvey(id: number): Promise<Survey>;
    createSurvey(surveyName:string): Promise<Survey>;
        
}