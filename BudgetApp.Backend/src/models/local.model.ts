import { UserService } from "src/services";
import { BaseRepository } from "src/database";
import { IUser } from "src/interfaces";

export class Locals {
    public userService: BaseRepository<IUser>

    constructor() {
        try {
            this.userService = new UserService();

        } catch (error: any) {
            throw new Error("[ERROR][INIT][SERVICE]", error);
        };
    };
};