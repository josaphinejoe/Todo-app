import { Survey } from "./survey";
import { given } from "@nivinjoseph/n-defensive";
import { SurveyQuestion } from "../../models/survey-question";



export class MockSurveyProxy implements Survey
{
    private readonly _id: number;   
    private readonly _surveyName: string;
    private readonly _questions: Array<SurveyQuestion>;
    
    public get id():number { return this._id; }
    public get surveyName(): string { return this. _surveyName; }
    public get questions(): Array<SurveyQuestion> { return this._questions; }
    
    
    public constructor(surveyName: string)
    {
       
        given(surveyName, "surveyName").ensureHasValue().ensureIsString();
        this._id = 3;
        this._surveyName = surveyName;  
        this._questions = [];
        
        

    }
    public addQuestion(questionSet: SurveyQuestion): Promise<void>
    {
        given(questionSet, "questionSet").ensureHasValue();
        this.questions.push(questionSet);
        return Promise.resolve();
    }
}