import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./articleSell.css"; 


const categories = [
  { id: 1, name: "Women" },
  { id: 2, name: "Men" },
  { id: 3, name: "Kids" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Home" },
  { id: 6, name: "Art" },
  { id: 7, name: "Computers" },
];

function ArticleSell() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startPrice: "",
    startDate: "",
    endDate: "",
    categoryName: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [redirecting, setRedirecting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    const apiKey = "";    //Put the API key in here

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      setImageUrl(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to post an item.");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      startPrice: parseFloat(formData.startPrice),
      startDate: formData.startDate,
      endDate: formData.endDate,
      userId: null,
      categoryName: formData.categoryName,
      subcategoryName: "Paintings",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/articles",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const article = response.data;
      alert("Item posted successfully!");
      setRedirecting(true);

      if (imageUrl) {
        const imagePayload = {
          link: imageUrl,
          articleId: article.id,
        };

        try {
          await axios.post(
            "http://localhost:8080/api/v1/article-images",
            imagePayload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (err) {
          console.error("Image upload failed:", err);
        }
      }

      setTimeout(() => {
        navigate(`/item/${article.id}`);
      }, 1000);
    } catch (err) {
      console.error("Error posting item:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <>
    <Navbar/>
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Sell an Item</h2>
      {redirecting && <p style={{ color: "#8367D8" }}>Redirecting to your item...</p>}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <label>
              What do you sell?
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <label>
              Category:
              <select
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
            <br />

            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            

            <label>
              Upload Photo:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
            <br />

            {loading && <p>Uploading...</p>}
            {imageUrl && (
              <img src={imageUrl} alt="Preview" style={{ width: "150px" }} />
            )}

            <button type="button" onClick={() => setStep(2)}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>
              Starting Price:
              <input
                type="number"
                name="startPrice"
                value={formData.startPrice}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <label>
              Start Date:
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <label>
              End Date:
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </label>
            <br />

            <button type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
    </>
  );
}

export default ArticleSell;
