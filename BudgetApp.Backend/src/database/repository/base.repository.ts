import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
  private readonly repository: Model<T>;

  constructor(model: Model<T>) {
    this.repository = model;
  }

  async findWithPagination(
    where: FilterQuery<T>,
    order: Record<string, any>,
    take = 10,
    skip = 0
  ) {
    const data = await this.repository
      .find(where)
      .sort(order)
      .limit(take)
      .skip(skip)
      .exec();

    const count = await this.repository.countDocuments(where).exec();

    return {
      data,
      count,
    };
  };

  async findOne(where: FilterQuery<T> | undefined, order: Record<string, any>) {
    const data = await this.repository.findOne(where).sort(order).exec();

    return data;
  };

  async insert(records: T | T[]) {
    const inserted = await this.repository.create(records);

    return inserted;
  };

  async update(where: FilterQuery<T>, record: UpdateQuery<T>) {
    const updated = await this.repository.updateMany(where, record).exec();

    return updated;
  };
};