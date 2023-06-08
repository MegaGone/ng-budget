import { MongooseRepository } from "src/database";
import { Document, Model } from "mongoose";

export class BaseService<T extends Document> {
    private _repository: MongooseRepository<T>;

    constructor(model: Model<T>) {
        this._repository = new MongooseRepository<T>(model);
    };
};