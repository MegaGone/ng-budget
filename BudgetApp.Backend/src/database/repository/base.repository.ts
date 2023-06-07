import { Document, FilterQuery, Model, ProjectionType, UpdateQuery } from "mongoose";

export class BaseRepository<T extends Document> {
  private _repository: Model<Document>;

  constructor(model: Model<Document>) {
    this._repository = model;
  };

  async findWithPagination(
    where: FilterQuery<T>,
    order: Record<string, any>,
    take: number = 10,
    skip: number = 0
  ) {
    const data = await this._repository
      .find(where)
      .sort(order)
      .limit(take)
      .skip(skip)
      .exec();

      const count = await this._repository.countDocuments(where);

      return {
        data,
        count
      };
  };

  async findOne(where: FilterQuery<T>, projection: ProjectionType<T> = {}) {
    this._repository.findOne(where, projection);
  };

  async insert(records: T | T[]) {
    const inserted = await this._repository.create(records);
    return inserted;
  };

  async update(where: FilterQuery<T>, record: UpdateQuery<T>) {
    const updated = await this._repository.updateOne(where, record);
    return updated;
  };

  async delete(where: FilterQuery<T>) {
    const deleted = await this._repository.deleteOne(where);
    return deleted;
  };
};