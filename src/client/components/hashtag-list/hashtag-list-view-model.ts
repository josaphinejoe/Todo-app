import { ComponentViewModel, element, template, bind } from "@nivinjoseph/n-app";
import './hashtag-list-view.scss';
import { Validator } from "@nivinjoseph/n-validate";

@template(require("./hashtag-list-view.html"))
@element("hashtag-list")
@bind({
    tags: "array"
})
export class HashtagListViewModel extends ComponentViewModel 
{
    private _showAddTagField: boolean;
    private _currentTag: string;
    private readonly _validator: Validator<this>;
    
    public get tagList(): Array<string> { return this.getBound<Array<string>>("tags"); }
    
    public get showAddTagField(): boolean { return this._showAddTagField; }

    public get currentTag(): string { return this._currentTag; }
    public set currentTag(value: string) { this._currentTag = value; }
    
    public get hasErrors(): boolean { return !this._validate(); }
    public get errors(): Record<string, any> { return this._validator.errors; }
    
    public constructor()
    {
        super();
        
        this._currentTag = "";
        this._showAddTagField = false;
        this._validator = this._createValidator();
    }
    
    
    public addTag(): void 
    {
        this._showAddTagField = true;
    }
    
    
    public save(): void 
    {
        this._validator.enable();
        if (!this._validate())
            return;
        
        this.tagList.push(this._currentTag);
        this._currentTag = '';
        this._showAddTagField = false;
    }
    
    public deleteTag(tag: string): void
    {
        this.tagList.splice(this.tagList.indexOf(tag), 1);
    }
    
    private _validate(): boolean
    {
        this._validator.validate(this);
        return this._validator.isValid;
    }
    
    private _createValidator(): Validator<this>
    {
        const validator = new Validator<this>(true);
        
        validator
            .prop("currentTag")
            .isRequired()
            .withMessage("Tag cannot be empty")
            .isString()
            .ensure(t => !this.tagList.includes(t))
            .withMessage("Tag already exists")
            .ensure(t => !t.contains(' '))
            .withMessage("Tag cannot have empty space")
            .ensure(t => t.startsWith('#'))
            .withMessage("Tag must start with #");
        
        return validator;
    }
}