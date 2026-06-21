import { createContext, useContext, useState, useMemo } from "react";
import productsData from "../data/products.json";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [sortBy, setSortBy] = useState("vendidos");
  const [sortOrder, setSortOrder] = useState("desc");

  const products = useMemo(() => {
    const sorted = [...productsData];
    sorted.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "vendidos":
          comparison = a.vendidos - b.vendidos;
          break;
        case "precio":
          comparison = a.precio - b.precio;
          break;
        case "fecha":
          comparison =
            new Date(a.fechaModificacion) - new Date(b.fechaModificacion);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });
    return sorted;
  }, [sortBy, sortOrder]);

  const getProductById = (id) =>
    productsData.find((p) => p.id === id) || null;

  return (
    <ProductContext.Provider
      value={{ products, sortBy, setSortBy, sortOrder, setSortOrder, getProductById }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used within ProductProvider");
  return context;
}
