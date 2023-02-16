export interface Todo
{
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    isDeleted: boolean;
    tags: Array<string>;

    update(title: string, description: string): Promise<void>;
    updateTags(tags: Array<string>): Promise<void>;
    complete(): Promise<void>;
    delete(): Promise<void>;
}