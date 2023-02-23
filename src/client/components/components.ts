import { FooterViewModel } from "./footer/footer-view-model";
import { NavBarViewModel } from "./nav-bar/nav-bar-view-model";
import { ShellViewModel } from "./shell/shell-view-model";

export const components: Array<Function> = [
    ShellViewModel,
    NavBarViewModel,
    FooterViewModel
];