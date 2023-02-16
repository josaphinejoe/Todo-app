
import { TodoViewModel } from "./todo/todo-view-model";
import { ShellViewModel } from "./shell/shell-view-model";
import { HashtagListViewModel } from "./hashtag-list/hashtag-list-view-model";


export const components: Array<Function> = [
    ShellViewModel,
    TodoViewModel,
    HashtagListViewModel
];