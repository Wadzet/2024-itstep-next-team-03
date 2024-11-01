"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../product-card/product-card";
import { useSearchParams } from "next/navigation";
import productsData from "@/app/lib/products_data.json";
import { defineSortCriteria, getSortedProducts } from "@/app/utils/sort-products";
import { ProductSortCriteria } from "@/app/enum/ProductSortCriteria";

export type Product = {
  id: number;
  productName: string;
  price: number;
  imageUrl: string;
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
    setProducts(productsData);
  }, []);

  return (
      <div className="grid justify-center gap-4 grid-rows-auto sm:grid-cols-2 md:grid-cols-3 ">
        {products.length > 0 ? (
            sortedProducts.slice(0, 6).map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.productName}
                    price={product.price}
                    image={product.imageUrl}
                />
            ))
        ) : (
            <p>Loading products...</p>
        )}
      </div>
  );
}
