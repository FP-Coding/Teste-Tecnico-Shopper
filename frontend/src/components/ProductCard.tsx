import { IProduct } from "../interfaces/IProduct";

function ProductCard ({ name, code, salesPrice }: IProduct) {
  return (
    <div id={`${code}`} className="flex flex-col border-solid border-[1px] border-black w-1/4 text-center">
      <h2>
        <span>
          {name}  
        </span>
        {' - CÓDIGO '}
        <span>
          {code}
        </span>
      </h2>
      <p>R$ <span>{salesPrice}</span></p>
    </div>
  );
}

export default ProductCard;