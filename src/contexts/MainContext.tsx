/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { IProduct } from "@/interfaces";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface IMainContext {
  cart: Record<number, number>,
  products: IProduct[],
  filteredProducts: IProduct[],
  onlyNew: boolean,
  setOnlyNew: any,
  priceRange: number[],
  handleAdd: (id: number) => void,
  handleRemove: (id: number) => void,
  handleGetProduct: (id: number) => Promise<IProduct | null>,
  handlePriceChange: (event: Event, newValue: number | number[]) => void
}

const MainContext = createContext<undefined | IMainContext>(undefined);

export function MainProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [products, setProducts] = useState<IProduct[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [onlyNew, setOnlyNew] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])

  const handleAdd = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemove = (id: number) => {
    setCart((prev) => {
      const count = prev[id] - 1;
      if (count <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: count };
    });
  };

  const handleFetchProducts = async () => {
    if (products.length === 0) {
      const data = await fetch('/assets/products.json').then(res => res.json());
      setProducts(data)
      return data
    }

    return products
  }

  const handleGetProduct = async (id: number): Promise<IProduct | null> => {
    const products = await handleFetchProducts()
    return products.find((item: IProduct) => item.id === id) || null;
  }

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
    if (Array.isArray(newValue)) {
      setFilteredProducts(products.filter(item => item.price >= newValue[0] && item.price <= newValue[1]))
    }
  };

  useEffect(() => {
    let newProducts = products;

    newProducts = newProducts.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1])

    if (onlyNew !== null) {
      newProducts = newProducts.filter(item => item.novelty === onlyNew)
    }

    setFilteredProducts(newProducts)
  }, [products, onlyNew, priceRange])


  useEffect(() => {
    setPriceRange([Math.min(...products.map(item => item.price)), Math.max(...products.map(item => item.price))])
  }, [products])

  useEffect(() => {
    handleFetchProducts()
  }, [])

  return (
    <MainContext.Provider
      value={{
        cart,
        products,
        handleAdd,
        handleRemove,
        handleGetProduct,
        handlePriceChange,
        onlyNew,
        priceRange,
        setOnlyNew,
        filteredProducts
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const useMainContext = (): IMainContext => {
  const context = useContext(MainContext);

  if (!context) throw new Error('useMainContext must be used within a MainProvider');

  return context;
}