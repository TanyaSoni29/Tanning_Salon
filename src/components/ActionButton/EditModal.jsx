/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from "react";

const EditModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      // Fetch the product details based on productId
      const fetchProduct = async () => {
        try {
          const response = await getProductById(productId);
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  if (!product) return null; // Optionally render a loading state

  return (
    <div>
      <h2>Edit Product</h2>
      {/* Render product details and form here */}
      <p>{product.name}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditModal;
