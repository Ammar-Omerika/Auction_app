import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios"; 
import "./ItemPage.css";
import Navbar from "../components/Navbar";

function ItemPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleRes = await axios.get(`/articles/${id}`);
        setArticle(articleRes.data);

        const imagesRes = await axios.get(`/article-images/${id}`);
        setImages(imagesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (<>
    <Navbar/>
    <div className="item-container">
      <div className="item-left">
        {images.length > 0 && (
          <>
            <img
              src={images[0]}
              alt="Main"
              className="main-image"
            />
            <div className="thumbnail-grid">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index}`}
                  className="thumbnail-image"
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="item-right">
        <h3>{article.title}</h3>
        <p>Starts from $<strong>{article.startPrice}</strong></p>
        <div className="bid-box">
          <p>Highest bid: <span>${article.startPrice + 23}</span></p>
          <p>Number of bids: <span>1</span></p>
          <p>Time left: <span>{article.endDate}</span></p>
        </div>

        <p><strong>Details</strong></p>
        <p>{article.description}</p>
      </div>
    </div>
    </>
  );
}

export default ItemPage;
