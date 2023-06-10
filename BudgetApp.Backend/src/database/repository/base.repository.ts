import { Document, Model, FilterQuery } from "mongoose";

export class BaseRepository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    };

    async insert(data: Partial<T>): Promise<T> {
        const entity = new this.model(data);
        const inserted = await entity.save();
        return inserted;
    };

    async findOne(where: FilterQuery<T>): Promise<T | null> {
        const record = await this.model.findOne(where);
        return record;
    };
}