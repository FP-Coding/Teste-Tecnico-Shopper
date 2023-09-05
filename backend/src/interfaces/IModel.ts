export interface SimpleModel<T> {
  create(obj: T): Promise<T>;
  list(): Promise<T[]>;
  find(id: number): Promise<T | null>;
}

interface Model<T> extends SimpleModel<T> {
  update(id: number, obj: T): Promise<void>;
  delete(id: number): Promise<void>;
}

export default Model;