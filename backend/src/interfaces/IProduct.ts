export interface IProductPrice {
  salesPrice: number;
}

export interface IProductCode {
  code: number;
}

export interface IUpdatePrice extends IProductCode, IProductPrice {}

interface IProduct extends IProductPrice, IProductCode {
  name: string;
  costPrice: number;
}

export interface IProductUpdated extends IProductCode {
  name: string,
  pastSalesPrice: number,
  newSalesPrice: number
}

export default IProduct;