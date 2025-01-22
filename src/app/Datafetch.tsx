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
      backgroundColor: "#fff",
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
const ChefCard = ({ chef, onClick }: { chef: any; onClick: (chef: any) => void }) => (
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
    onClick={() => onClick(chef)} // Triggering the modal on click
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
    </div>
  </div>
);

// ChefModal Component
const ChefModal = ({ chef, onClose }: { chef: any; onClose: () => void }) => (
  <div
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
    }}
    onClick={onClose}
  >
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "600px",
        width: "80%",
        position: "relative",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          cursor: "pointer",
        }}
      >
        X
      </button>
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
            margin: "0 auto",
          }}
        />
      )}
      <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "20px", textAlign: "center" }}>
        {chef.name}
      </h3>
      <p style={{ fontSize: "1.4rem", textAlign: "center", marginBottom: "15px" }}>{chef.position}</p>
      <p style={{ fontSize: "1.3rem", fontStyle: "italic", textAlign: "center" }}>
        Specialty: {chef.specialty}
      </p>
      <p style={{ fontSize: "1.1rem", color: "#444", marginTop: "20px" }}>{chef.description}</p>
      <p style={{ fontSize: "1rem", marginTop: "20px", color: "#888" }}>
        Experience: {chef.experience} years
      </p>
    </div>
  </div>
);

// Main Datafetch Component
const Datafetch = () => {
  const [foods, setFoods] = useState<any[]>([]);
  const [chefs, setChefs] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]); // State for blog data
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedChef, setSelectedChef] = useState<any | null>(null); // Track selected chef

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
        },
        "blogs": *[_type == "blog"] | order(publishedAt desc) [0..1] {
          title,
          "imageUrl": image.asset->url,
          excerpt
        }
      }`;

      const data = await client.fetch(query);
      setFoods(data.foods);
      setChefs(data.chefs);
      setBlogs(data.blogs); // Set blog data
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

  const handleChefClick = (chef: any) => {
    setSelectedChef(chef); // Set the selected chef for the modal
  };

  const closeModal = () => {
    setSelectedChef(null); // Close the modal
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {blogs.length > 0 && (
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center" }}>
            Latest Blog
          </h2>
          {blogs[0].imageUrl && (
            <Image
              src={blogs[0].imageUrl}
              alt={blogs[0].title}
              width={600}
              height={350}
              style={{ width: "100%", height: "auto", objectFit: "cover", marginBottom: "20px" }}
            />
          )}
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
            {blogs[0].title}
          </h3>
          <p style={{ fontSize: "1.1rem", textAlign: "center", color: "#666" }}>
            {blogs[0].excerpt}
          </p>
        </div>
      )}

      <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "bold", marginBottom: "50px" }}>
        Food Menu
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
        }}
      >
        {foods.map((food) => (
          <FoodCard key={food.name} food={food} onAddToCart={addToCart} />
        ))}
      </div>

      <h1 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "bold", marginBottom: "50px" }}>
        Our Chefs
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
        }}
      >
        {chefs.map((chef) => (
          <ChefCard key={chef.name} chef={chef} onClick={handleChefClick} />
        ))}
      </div>

      {selectedChef && <ChefModal chef={selectedChef} onClose={closeModal} />} {/* Show modal */}
    </div>
  );
};

export default Datafetch;
