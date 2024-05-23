import React from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { imageUrl, status } = state || {};

  if (!imageUrl) {
    return <div>No image available</div>;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>
        <h2>Status: {status}</h2>
        <img src={imageUrl} alt="Dog" />
      </div>
    </div>
  );
};

export default HomePage;
