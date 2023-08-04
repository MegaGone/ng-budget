import { BaseService } from "src/services";
import { TemplateModel, ITemplateModel, IUserModel, UserModel, IOtpModel, OtpModel } from "src/database";

export class Local {
    public userService: BaseService<IUserModel>;
    public mailService: BaseService<ITemplateModel>;
    public otpService: BaseService<IOtpModel>;

    constructor() {
        this.userService = new BaseService<IUserModel>(UserModel);
        this.mailService = new BaseService<ITemplateModel>(TemplateModel);
        this.otpService = new BaseService<IOtpModel>(OtpModel);
    };
};