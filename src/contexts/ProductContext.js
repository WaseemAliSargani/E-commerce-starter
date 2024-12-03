import React, { createContext, useState, useEffect } from 'react';
import { resolvePath } from 'react-router-dom';

// import data
import { ProductData } from '../data'
// create context
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  
  // products state
  const [products, setProducts] = useState(ProductData);



  return <ProductContext.Provider value={{ products }}>
    {children}
  </ProductContext.Provider>
};

export default ProductProvider;
