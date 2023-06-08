import { Document, Model } from "mongoose";
import { BaseRepository } from "src/database";

export class BaseService<T extends Document> {
    protected readonly repository: BaseRepository<T>;

    constructor(model: Model<T>) {
        this.repository = new BaseRepository<T>(model);
    };

    async insertRecord(entity: Partial<T>) {
        try {
            const record = await this.repository.insert(entity);
            return record;
        } catch (error) {
            return 0;
        }
    };
};