import { Document, Model } from "mongoose";

export class BaseRepository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async insert(data: Partial<T>): Promise<T> {
        const entity = new this.model(data);
        const inserted = await entity.save();
        return inserted;
    }
}