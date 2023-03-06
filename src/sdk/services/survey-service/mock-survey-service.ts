import { SurveyService } from "./survey-service";
import { MockSurveyProxy } from "../../proxies/survey/mock-survey-proxy";
import { Survey } from "../../proxies/survey/survey";
import { given } from "@nivinjoseph/n-defensive";

export class MockSurveyService implements SurveyService
{
    
    public _surveys: Array<MockSurveyProxy>;
    
    public constructor()
    {
        const surveys = new Array<MockSurveyProxy>();
        this._surveys = surveys;
    }
    
    public getSurveys(): Promise<ReadonlyArray<Survey>>
    {
        return Promise.resolve(this._surveys);    
    }
    
    public getSurvey(id: number): Promise<Survey>
    {
        return Promise.resolve(this._surveys.find(t => t.id === id) as Survey);
    }
    
    public createSurvey(surveyName: string): Promise<Survey>
    {
        given(surveyName, "surveyName").ensureHasValue().ensureIsString();
        const survey = new MockSurveyProxy(surveyName);
        this._surveys.push(survey);
        return Promise.resolve(survey);
    }
}