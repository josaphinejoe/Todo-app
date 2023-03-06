import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import "./view-survey-view.scss";
import { Routes } from "../routes";

@template(require("./view-survey-view.html"))
@route(Routes.viewSurvey)

export class ViewSurveyViewModel extends PageViewModel
{

}