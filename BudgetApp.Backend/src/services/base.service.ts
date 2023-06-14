import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { BaseRepository } from "src/database";

export class BaseService<T extends Document> {
    protected readonly repository: BaseRepository<T>;

    constructor(model: Model<T>) {
        this.repository = new BaseRepository<T>(model);
    };

    async insertRecord(entity: Partial<T>): Promise<string | null> {
        try {
            const { _id } = await this.repository.insert(entity);
            return _id;
        } catch (error) {
            return null;
        };
    };

    async getRecord(where: FilterQuery<T>, select: string[] = []): Promise<T | null> {
        try {
            const record = await this.repository.findOne(where, select);
            return record;
        } catch (error) {
            return null;
        };
    };

    async updateRecord(where: FilterQuery<T>, query: UpdateQuery<T>): Promise<boolean> {
        try {
            const record = await this.repository.update(where, query);
            return true;
        } catch (error) {
            return false;
        };
    };

    async deleteRecord(where: FilterQuery<T>): Promise<boolean> {
        try {
            const deleted = await this.deleteRecord(where);
            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecords(where: FilterQuery<T>, page: number, size: number, select: string[] = []) {
        try {
            const skip = (page - 1) * size;
            const take = size;

            const { count, data, currentPage, pageCount } = await this.repository.findWithPagination(
                where,
                "",
                take,
                skip,
                select
            );

            const pagination = {
                data: data,
                totalItems: count,
                currentPage,
                totalPages: pageCount
            };

            return pagination
        } catch (error) {
            return null;
        };
    }
};