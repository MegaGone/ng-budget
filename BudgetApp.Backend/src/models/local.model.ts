import { BaseService } from "src/services";
import { TemplateModel, ITemplateModel, IUserModel, UserModel } from "src/database";

export class Local {
    public userService: BaseService<IUserModel>;
    public mailService: BaseService<ITemplateModel>;

    constructor() {
        this.userService = new BaseService<IUserModel>(UserModel);
        this.mailService = new BaseService<ITemplateModel>(TemplateModel);
    };
};