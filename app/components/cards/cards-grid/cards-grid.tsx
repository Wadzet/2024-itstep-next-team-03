"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../product-card/product-card";
import { useSearchParams } from "next/navigation";
import {
  defineSortCriteria,
  getSortedProducts,
} from "@/app/utils/sort-products";
import { ProductSortCriteria } from "@/app/enum/ProductSortCriteria";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort");

  let sortedProducts = products;
  if (sortBy) {
    const sortCriteria: ProductSortCriteria = defineSortCriteria(sortBy);
    sortedProducts = getSortedProducts(sortCriteria, products);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid justify-center gap-4 grid-rows-auto sm:grid-cols-2 md:grid-cols-3 ">
      {products.length > 0 ? (
        sortedProducts
          .slice(0, 6)
          .map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}
