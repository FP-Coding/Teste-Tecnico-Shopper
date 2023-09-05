export interface SimpleService<T> {
  create(obj: T): Promise<T>;
  list(): Promise<T[]>;
  find(id: number): Promise<T | null>;
}

interface Service<T> extends SimpleService<T> {
  update(id: number, obj: T): Promise<void>;
  delete(id: number): Promise<void>;
}

export default Service;