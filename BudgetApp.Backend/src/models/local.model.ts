import { BaseService } from "src/services";
import { EmailModel, IEmailModel, IUserModel, UserModel } from "src/database";

export class Local {
    public userService: BaseService<IUserModel>;
    public mailService: BaseService<IEmailModel>;

    constructor() {
        this.userService = new BaseService<IUserModel>(UserModel);
        this.mailService = new BaseService<IEmailModel>(EmailModel);
    };
};