import { BaseService } from "src/services";
import { IUserModel, UserModel } from "src/database";

export class Local {
    public userService: BaseService<IUserModel>;

    constructor() {
        this.userService = new BaseService<IUserModel>(UserModel);
    };
};