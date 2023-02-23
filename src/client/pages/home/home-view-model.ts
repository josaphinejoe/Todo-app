import { components, PageViewModel, route, template } from "@nivinjoseph/n-app";
import { Routes } from "../routes";
import { FeaturesSectionViewModel } from "./components/features-section/features-section-view-model";
import { HeroSectionViewModel } from "./components/hero-section/hero-section-view-model";
import "./home-view.scss";
import { IntegrationsSectionViewModel } from "./components/integrations-section/integrations-section-view-model";
import { MarketingResourceSectionViewModel } from "./components/marketing-resource-section/marketing-resource-section-view-model";
import { ScaleSectionViewModel } from "./components/scale-section/scale-section-view-model";
import { ValueSectionViewModel } from "./components/value-section/value-section-view-model";

@template(require("./home-view.html"))
@route(Routes.home)
@components(
    FeaturesSectionViewModel, 
    HeroSectionViewModel,
    IntegrationsSectionViewModel,
    MarketingResourceSectionViewModel,
    ScaleSectionViewModel,
    ValueSectionViewModel
    )
export class HomeViewModel extends PageViewModel 
{

}