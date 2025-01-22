"use client"; // Add this at the very top of your file

import { client } from "@/sanity/lib/client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Datafetch = () => {
  // State for products and cart
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  // Fetch data inside useEffect to work with Client Component
  useEffect(() => {
    const fetchData = async () => {
      const query = await client.fetch(
        `*[_type == "product"]{
          _id,
          name,
          price,
          discountPercentage,
          "imageUrl": image.asset->url
        }`
      );
      setProducts(query);
    };
    
    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to handle adding items to the cart
  const addToCart = (product: any) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {products.map((product: any) => (
        <div
          key={product._id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            width: "200px",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={150}
              height={150}
              style={{ borderRadius: "8px" }}
            />
          )}
          <h2 style={{ fontSize: "16px", margin: "10px 0" }}>{product.name}</h2>
          <p style={{ fontWeight: "bold", margin: "5px 0" }}>Price: ${product.price}</p>
          {product.discountPercentage > 0 && (
            <p style={{ color: "red" }}>Discount: {product.discountPercentage}%</p>
          )}
          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Datafetch;
