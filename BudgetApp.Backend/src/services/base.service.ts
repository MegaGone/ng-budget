import { Document, Model } from "mongoose";
import { BaseRepository } from "src/database";

export class BaseService<T extends Document> {
    protected readonly repository: BaseRepository<T>;

    constructor(model: Model<T>) {
        this.repository = new BaseRepository<T>(model);
    };

    async insertRecord(entity: Partial<T>) {
        try {
            const { _id } = await this.repository.insert(entity);
            return _id;
        } catch (error) {
            return 0;
        };
    };

    async getRecord(email: string) {
        try {
            const record = await this.repository.findOne({ email });
            return record;
        } catch (error) {
            return null;
        };
    };
};