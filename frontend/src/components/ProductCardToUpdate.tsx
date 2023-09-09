import { IProductUpdated } from "../interfaces/IProduct";

function ProductCardToUpdate ({ code, name, messageError, newSalesPrice, pastSalesPrice }: IProductUpdated) {
  const foundedErrors = messageError.reduce((finalMessage, atualError) => {
    return finalMessage + `${atualError.message}\n`;
  }, '');

  return (
    <div id={`${code}`} className="flex flex-col border-solid border-[1px] border-black w-1/4 text-center">
      <h2>
        <span>  
        {name} 
        </span>
        {' '}
        <span>
          - CÓDIGO {code}
        </span>
      </h2>
      <p>R$ <span>{pastSalesPrice}</span> para { Number.isNaN(newSalesPrice) ? <span>Valor inválido</span> : <span>R$ {newSalesPrice}</span>}</p>
      { messageError.length > 0 && <p>{foundedErrors}</p> }
    </div>
  );
}

export default ProductCardToUpdate;