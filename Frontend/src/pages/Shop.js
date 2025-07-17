import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "./Shop.css";
import Navbar from "../components/Navbar";

const categories = [
  { id: 1, name: "Women" },
  { id: 2, name: "Men" },
  { id: 3, name: "Kids" },
  { id: 4, name: "Accessories" },
  { id: 5, name: "Home" },
  { id: 6, name: "Art" },
  { id: 7, name: "Computers" },
];

function Shop() {
  const [articles, setArticles] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [direction, setDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const fetchArticles = async (page, isLoadMore = false) => {
    let url = `/articles?page=${page}&size=8&sortBy=${sortBy}&direction=${direction}`;
    if (selectedCategory) {
      url += `&categoryId=${selectedCategory}`;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(url);
      setArticles((prev) =>
        isLoadMore ? [...prev, ...data.content] : data.content
      );
      setHasMore(!data.last);
      setCurrentPage(data.number);
      setLoading(false);

      data.content.forEach(async (article) => {
        try {
          const res = await axios.get(
            `/article-images/${article.id}`
          );
          setImagesMap((prev) => ({ ...prev, [article.id]: res.data }));
        } catch (err) {
          console.error(`Error fetching images for article ${article.id}:`, err);
        }
      });
    } catch (err) {
      console.error("Error fetching articles:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setImagesMap({});
    setCurrentPage(0);
    setHasMore(true);
    fetchArticles(0);
  }, [selectedCategory, sortBy, direction]);

  return (
    <>
    <Navbar/>
    <div className="shop-layout">
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          <li
            className={!selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={selectedCategory === cat.id ? "active" : ""}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="shop-container">
        <h2>Shop</h2>

        <div className="top-controls">
          <div className="sort-controls">
            <label htmlFor="sortSelect">Sort by: </label>
            <select
              id="sortSelect"
              value={`${sortBy}_${direction}`}
              onChange={(e) => {
                const [sort, dir] = e.target.value.split("_");
                setSortBy(sort);
                setDirection(dir);
              }}
            >
              <option value="startDate_desc">Date Created (Newest)</option>
              <option value="startDate_asc">Date Created (Oldest)</option>
              <option value="startPrice_asc">Price (Low to High)</option>
              <option value="startPrice_desc">Price (High to Low)</option>
              <option value="title_asc">Name (A–Z)</option>
              <option value="title_desc">Name (Z–A)</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
          </div>
        </div>

        <div className={viewMode === "grid" ? "shop-grid" : "shop-list"}>
          {articles.map((item) => {
            const images = imagesMap[item.id] || [];
            const mainImage = images.length > 0 ? images[0] : null;

            return (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className={`item-card ${viewMode}`}
              >
                {mainImage && (
                  <div className="image-wrapper">
                    <img src={mainImage} alt={item.title} className="card-image" />
                  </div>
                )}
                <div className="card-content">
                  <h3>{item.title}</h3>
                  {viewMode === "list" && (
                    <p className="description">{item.description}</p>
                  )}
                  <p>Start from ${item.startPrice}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {hasMore && (
          <div className="load-more-container">
            <button
              onClick={() => fetchArticles(currentPage + 1, true)}
              className="load-more-button"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </main>
    </div>
    </>
  );
}

export default Shop;
