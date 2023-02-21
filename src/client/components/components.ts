import { ShellViewModel } from "./shell/shell-view-model";
import { NavBarViewModel } from "./nav-bar/nav-bar-view-model";
import { FooterViewModel } from "./footer/footer-view-model";
import { HeroSectionViewModel } from "./hero-section/hero-section-view-model";
import { ValueSectionViewModel } from "./value-section/value-section-view-model";
import { IntegrationsSectionViewModel } from "./integrations-section/integrations-section-view-model";
import { FeaturesSectionViewModel } from "./features-section/features-section-view-model";
import { ScaleSectionViewModel } from "./scale-section/scale-section-view-model";
import { MarketingResourceSectionViewModel } from "./marketing-resource-section/marketing-resource-section-view-model";

export const components: Array<Function> = [
    ShellViewModel,
    NavBarViewModel,
    FooterViewModel,
    HeroSectionViewModel,
    ValueSectionViewModel,
    IntegrationsSectionViewModel,
    FeaturesSectionViewModel,
    ScaleSectionViewModel,
    MarketingResourceSectionViewModel
];