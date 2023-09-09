import { ChangeEvent, useEffect, useState } from "react";
import { getRequest, patchRequest } from "../utils/axios";
import { IPacks, IProduct, IProductUpdate } from "../interfaces/IProduct";
import ProductCard from "../components/ProductCard";
import Papa from 'papaparse';
import { IErrorMessage } from "../interfaces/IErrorMessage";
import ProductCardToUpdate from "../components/ProductCardToUpdate";

function Products() {
  const [dataProducts, setDataProducts] = useState<IProduct[]>([]);
  const [packsProducts, setPacksProducts] = useState<IPacks[]>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [updatedFile, setUpdatedFile] = useState<IProductUpdate[]>([]);
  const [keysVerification, setKeysVerification] = useState<string>('');
  const [errorsFounded, setErrorsFounded] = useState<IErrorMessage[]>([]);
  const [wasVerified, setWasVerified] = useState<boolean>(false);

  useEffect(() => {
    const request = async () => {
      const responseProducts = await getRequest('/products');
      const formatProducts = responseProducts.map(({ salesPrice, costPrice, ...rest }: IProduct) => {
        return {
          ...rest,
          salesPrice: Number(salesPrice),
          costPrice: Number(costPrice)
        };
      });
      const responsePacks = await getRequest('/packs');
      setPacksProducts(responsePacks);
      return setDataProducts(formatProducts);
    };
    request();
  }, []);

  const handleFile = (event: ChangeEvent) => {
    if (event.target) {
      const element = event.target as HTMLInputElement;
      const files = element.files;
      if (files) {
        Papa.parse(files[0], {skipEmptyLines:true, complete: (results) => {
          const data = results.data as string[];

          const keys = ['product_code', 'new_price'];
          const verifactionKeys = keys.filter((key) => !data[0].includes(key));
          verifactionKeys.length > 0 ? setKeysVerification(`A chave(s) ${verifactionKeys.join(', ')} está faltando`) : setKeysVerification('');
          const formated = data.reduce<IProductUpdate[]>((acc, curr) => {
            if (curr[0] !== keys[0] && curr[1] !== keys[1]) {
              const updateInfo = {
                code: Number(curr[0]),
                newPrice: Number(curr[1])
              };
              acc.push(updateInfo);
              return acc;
            }
            return acc;
          }, []);
          return setUpdatedFile(formated);
          
        }});
      }
    }
  };

  const validatorFile = () => {
    const errors: IErrorMessage[] = [];
    const productsCodes = dataProducts.map(({ code }) => code);
    const verificationCodes = updatedFile.every(({ code }) => {
      const isExistentCode = productsCodes.includes(code);
      if (!isExistentCode) {
        errors.push({code, message: `Não existe produto com o código ${code}`});
      }
      return isExistentCode;
    });
    
    const verificationPricesIsNumber = updatedFile.some(({ code, newPrice }) => {
      const isValidNumber = Number.isNaN(newPrice);
      if (isValidNumber) {
        errors.push({code, message:`O Produto de código ${code} não possui um valor válido` });
      }
      return isValidNumber;
    });

    updatedFile.forEach(({ code, newPrice }) => {
      const product = dataProducts.find(({ code: codeProduct }) => code === codeProduct) || { costPrice: newPrice, salesPrice: newPrice, code: 0, name: ''};
      if (newPrice < product.costPrice) errors.push({code, message: 'Preço de venda é menor que o custo'});
      const differenceBetweenPrices = Math.abs(newPrice - product.salesPrice);
      const TenPercentOfSalesPrice = Math.round(product.salesPrice * 0.1);
      if (differenceBetweenPrices > TenPercentOfSalesPrice) {
        errors.push({code, message: 'Preço de reajuste é maior ou menor que 10%'});
      }
    });
    
    const packsCodes = packsProducts.map(({ packId }) => packId);
    const packsToUpdate = updatedFile.filter(({ code }) => packsCodes.includes(code));
    const verificationProductsPacks: boolean[] = [];
    if (packsToUpdate.length > 0) {
      packsToUpdate.forEach(({ code }) => {
        const products = packsProducts.filter(({ packId }) => code === packId);
        const verification = updatedFile.some(({ code: codeProduct }) => products.find(({ productId }) => codeProduct === productId));
        if (!verification) errors.push({code, message:`Está faltando o código de algum produto do Pack com o código ${code} `});
        verificationProductsPacks.push(verification);
      });
    }
    const verificationPacks = verificationProductsPacks.every((value) => value);
    setErrorsFounded(errors);
    setIsValidated(verificationCodes && !verificationPricesIsNumber && verificationPacks && errors.length === 0);
    setWasVerified(true);
  };

  const updatePrices = async () => {
    const format = updatedFile.map(({ code, newPrice }) => ({ code, salesPrice: newPrice }));
    await patchRequest('/products/price', format);
    setUpdatedFile([]);
    setErrorsFounded([]);
    setWasVerified(false);
    return setIsValidated(false);
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold">Products</h1>
      <div className="flex m-2 flex-wrap">
        { dataProducts.map(({code, name, salesPrice, costPrice}: IProduct) => {
            return (
              <ProductCard
                key={code}
                code={code} 
                name={name} 
                salesPrice={salesPrice} 
                costPrice={costPrice} 
              />
            );
        }) }
      </div>
      <form className="flex flex-col items-center gap-4 m-4">
        <label htmlFor="fileCsv">
          Envie sua planilha
        </label>
        <input type="file" accept=".csv,.xlsx,.xls" id="fileCsv" name="fileCsv" onChange={handleFile}/>
        {keysVerification.length > 0 && <p>{keysVerification}</p>}
      </form>
      <div className="flex m-2 flex-wrap justify-center" >
        { wasVerified &&
        updatedFile.map(({ code, newPrice }) => {
        const product = dataProducts.find(({ code: codeProduct }) => codeProduct === code);
        
        return (
          <ProductCardToUpdate  
            key={code}
            code={code}
            name={product?.name || 'Produto inexistente'}
            newSalesPrice={ newPrice }
            pastSalesPrice={product?.salesPrice || 0}
            messageError={errorsFounded.filter(({ code: codeProductInError }) => codeProductInError === code)}
          />
        );
        }) }
      </div>
      <div className="flex justify-center">
        <button 
        type="button" 
        className="btn bg-blue-300 p-2 m-1 rounded w-32 border-solid border-black border-2 disabled:opacity-50 disabled:border-none hover:opacity-70" 
        id="validationButton" 
        onClick={validatorFile}
        disabled={updatedFile.length === 0 && wasVerified === false}
        >
          VALIDAR
        </button>
        <button 
        type="button" 
        className="btn bg-green-300 p-2 m-1 rounded w-32 border-solid border-black border-2 disabled:opacity-50 disabled:border-none hover:opacity-70" 
        id="updateButton" 
        onClick={updatePrices}
        disabled={!isValidated}
        >
          ATUALIZAR
        </button>
      </div>
    </div>
  );
}

export default Products;