import { useEffect, useState } from "react";
import { getRequest } from "../utils/axios";
import { IProduct } from "../interfaces/IProduct";
import ProductCard from "../components/ProductCard";

function Products() {
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await getRequest('/products');
      const formatProducts = response.map(({ salesPrice, costPrice, ...rest }: IProduct) => {
        return {
          ...rest,
          salesPrice: Number(salesPrice),
          costPrice: Number(costPrice)
        };
      });
      setDataProducts(formatProducts);
    };
    request();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div>
        { dataProducts.map(({code, name, salesPrice, costPrice}: IProduct) => {
            return (
              <ProductCard 
                code={code} 
                name={name} 
                salesPrice={salesPrice} 
                costPrice={costPrice} 
              />
            );
        }) }
      </div>
    </div>
  );
}

export default Products;