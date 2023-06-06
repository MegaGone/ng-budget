import { BaseRepository } from "src/database";
import { IUser } from "src/interfaces";
import { UserModel } from "src/database";

export class UserService extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    };

    async findByEmail(email: string) {
        return this.findOne({ email }, {});
    };
};