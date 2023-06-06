import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
  private readonly entity: Model<T>;

  constructor(entity: Model<T>) {
    this.entity = entity;
  };

  async findWithPagination(
    where: FilterQuery<T>,
    order: Record<string, any>,
    take = 10,
    skip = 0
  ) {
    const data = await this.entity
      .find(where)
      .sort(order)
      .limit(take)
      .skip(skip)
      .exec();

    const count = await this.entity.countDocuments(where).exec();

    return {
      data,
      count,
    };
  };

  async findOne(where: FilterQuery<T> | undefined, order: Record<string, any>) {
    const data = await this.entity.findOne(where).sort(order).exec();

    return data;
  };

  async insert(records: T | T[]) {
    const inserted = await this.entity.create(records);

    return inserted;
  };

  async update(where: FilterQuery<T>, record: UpdateQuery<T>) {
    const updated = await this.entity.updateMany(where, record).exec();

    return updated;
  };
};