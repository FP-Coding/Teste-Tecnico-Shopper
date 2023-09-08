import { IProduct } from "../interfaces/IProduct";

function ProductCard (data: IProduct) {
  return (
    <div id={`${data.code}`} className="flex">
      <h2>
        {data.name}
      </h2>
      <p>{data.salesPrice}</p>
    </div>
  );
}

export default ProductCard;