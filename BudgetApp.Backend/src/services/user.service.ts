import { MongooseRepository, IUserModel, UserModel } from "src/database";

export class UserService {
    private _repository: MongooseRepository<IUserModel>;

    constructor() {
        this._repository = new MongooseRepository<IUserModel>(UserModel);
    };
};