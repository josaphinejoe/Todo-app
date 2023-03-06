import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import "./create-survey-view.scss";
import { Routes } from "../routes";

@template(require("./create-survey-view.html"))
@route(Routes.createSurvey)

export class CreateSurveyViewModel extends PageViewModel
{
    
}