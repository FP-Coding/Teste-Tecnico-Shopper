export interface SimpleService<T> {
  create(obj: T): Promise<T>;
  list(): Promise<T[]>;
  find(id: number): Promise<T | null>;
}

interface Service<T> extends SimpleService<T> {
  update(id: number, obj: Partial<T>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}

export default Service;