import { SurveyQuestion } from "../../models/survey-question";

export interface Survey
{
    id: number;
    surveyName: string;
    questions: Array<SurveyQuestion>;
    
    addQuestion(questionSet: SurveyQuestion): Promise<void>;
}

