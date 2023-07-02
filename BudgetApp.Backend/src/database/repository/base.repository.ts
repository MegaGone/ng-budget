import { Document, Model, FilterQuery, UpdateQuery, Query } from "mongoose";

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

    async findOne(where: FilterQuery<T>, select: string[] = []): Promise<T | null> {
        const record = await this.model.findOne(where).select(select);
        return record;
    };

    async update(where: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
        const updated = await this.model.findOneAndUpdate(where, update, { new: true });
        return updated;
    };

    async delete(where: FilterQuery<T>): Promise<boolean> {
        const deleted = await this.model.deleteOne(where);
        return deleted.deletedCount !== undefined && deleted.deletedCount > 0;
    };

    async findWithPagination(
        where: FilterQuery<T>,
        order: string,
        take: number = 10,
        skip: number = 0,
        select: string[] = []
    ) {
        const query: Query<T[], T> = this.model.find(where).select(select);
        query.sort(order);
        query.limit(take * 1);
        query.skip((skip - 1) * take);

        const [result, total] = await Promise.all([
            query.exec(),
            this.model.countDocuments(where),
        ]);

        return {
            data: result,
            count: total,
            totalPages: Math.ceil(total / take),
            currentPage: skip
        };
    }

}