import { IProductUpdated } from './IProduct';

export interface SimpleService<T> {
  create(obj: T): Promise<T>;
  list(): Promise<T[]>;
  find(id: number): Promise<T[] | T | null>;
}

interface Service<T> extends SimpleService<T> {
  update(id: number, obj: Partial<T>): Promise<boolean | IProductUpdated>;
  delete(id: number): Promise<boolean>;
}

export default Service;