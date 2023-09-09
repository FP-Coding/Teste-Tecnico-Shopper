import { IErrorMessage } from "./IErrorMessage";

export interface IProductUpdate {
  code: number,
  newPrice: number,
}

export interface IProductCore {
  code: number,
  name: string,
}

export interface IProduct extends IProductCore {
  costPrice: number,
  salesPrice: number
}

export interface IProductUpdated extends IProductCore {
  newSalesPrice: number | string,
  pastSalesPrice: number
  messageError: IErrorMessage[]
}

export interface IPacks {
  id: number,
  packId: number,
  productId: number,
  qty: number
}