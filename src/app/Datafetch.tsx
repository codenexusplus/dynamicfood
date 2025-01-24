"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

// FoodCard Component
const FoodCard = ({ food, onAddToCart }: { food: any; onAddToCart: (food: any) => void }) => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      backgroundColor: "white",
      cursor: "pointer",
      maxWidth: "350px", // Ensuring card size is bigger
      margin: "0 auto", // Centers the card
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)";
    }}
  >
    {food.imageUrl && (
      <Image
        src={food.imageUrl}
        alt={food.name}
        width={350}
        height={200}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    )}
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3 style={{ fontSize: "1.6rem", fontWeight: "bold", marginBottom: "10px" }}>{food.name}</h3>
      <p style={{ fontSize: "1.1rem", color: "#666", marginBottom: "15px" }}>{food.category}</p>
      <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "15px" }}>${food.price}</p>
      <p style={{ fontSize: "1rem", color: "#888", marginBottom: "20px" }}>{food.description}</p>
      {food.available ? (
        <button
          onClick={() => onAddToCart(food)}
          style={{
            padding: "12px 25px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
        >
          Add to Cart
        </button>
      ) : (
        <p style={{ color: "#f44336", fontSize: "1.1rem" }}>Out of Stock</p>
      )}
    </div>
  </div>
);

// ChefCard Component
const ChefCard = ({ chef }: { chef: any }) => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      maxWidth: "350px", // Ensuring card size is bigger
      margin: "0 auto", // Centers the card
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.1)";
    }}
  >
    {chef.imageUrl && (
      <Image
        src={chef.imageUrl}
        alt={chef.name}
        width={150}
        height={150}
        style={{
          borderRadius: "50%",
          width: "150px",
          height: "150px",
          objectFit: "cover",
          margin: "20px auto",
        }}
      />
    )}
    <div style={{ padding: "20px" }}>
      <h3 style={{ fontSize: "1.6rem", fontWeight: "bold", marginBottom: "10px" }}>{chef.name}</h3>
      <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "10px" }}>{chef.position}</p>
      <p style={{ fontSize: "1.2rem", color: "#444", marginBottom: "15px" }}>{chef.specialty}</p>
      <p style={{ fontSize: "1rem", color: "#888" }}>{chef.description}</p>
    </div>
  </div>
);

// Main Datafetch Component
const Datafetch = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [chefs, setChefs] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const query = `{
        "foods": *[_type == "food"] {
          name,
          category,
          price,
          originalPrice,
          tags,
          "imageUrl": image.asset->url,
          description,
          available
        },
        "chefs": *[_type == "chef"] {
          name,
          position,
          experience,
          specialty,
          "imageUrl": image.asset->url,
          description,
          available
        }
      }`;

      const data = await client.fetch(query);
      setFoods(data.foods);
      setChefs(data.chefs);
    };

    fetchData();
  }, []);

  const addToCart = (food: any) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, food];
      const newTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
      setTotal(newTotal);
      return updatedCart;
    });
  };

  const removeFromCart = (food: any) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.name !== food.name);
      const newTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
      setTotal(newTotal);
      return updatedCart;
    });
  };

  const handleCheckout = () => {
    alert(`Proceeding to checkout with total of $${total.toFixed(2)}`);
    setCart([]);
    setTotal(0);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Centered Header */}
      <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "bold", marginBottom: "50px" }}>
        Food Menu
      </h1>
      {/* Food Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 Columns for Food
          gap: "30px",
        }}
      >
        {foods.map((food) => (
          <FoodCard key={food.name} food={food} onAddToCart={addToCart} />
        ))}
      </div>

      {/* Centered Header for Chefs */}
      <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "bold", marginBottom: "50px" }}>
        Our Chefs
      </h1>
      {/* Chef Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 Columns for Chefs
          gap: "30px",
        }}
      >
        {chefs.map((chef) => (
          <ChefCard key={chef.name} chef={chef} />
        ))}
      </div>

      {/* Cart Section */}
      {cart.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            width: "350px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "15px" }}>Shopping Cart</h2>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px" }}>
            {cart.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button
                  onClick={() => removeFromCart(item)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: "none",
                    padding: "5px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "bold" }}>
            <p>Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datafetch;
