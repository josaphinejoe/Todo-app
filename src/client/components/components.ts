import { NavbarViewModel } from "./navbar/navbar-view-model";
import { QuestionViewModel } from "./question/question-view-model";
import { SurveyViewModel } from "./survey/survey-view-model";
import { ShellViewModel } from "./shell/shell-view-model";


export const components: Array<Function> = [
    ShellViewModel,
    NavbarViewModel,
    QuestionViewModel,
    SurveyViewModel
    
];