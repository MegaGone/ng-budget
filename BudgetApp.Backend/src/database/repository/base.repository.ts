import { Model, Document } from 'mongoose';

export class MongooseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(item: T): Promise<T> {
    const newItem = await this.model.create(item);
    return newItem;
  }

  public async findById(id: string): Promise<T | null> {
    const item = await this.model.findById(id);
    return item;
  }

  public async findAll(): Promise<T[]> {
    const items = await this.model.find();
    return items;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
};