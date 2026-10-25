import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { useContext, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
export default function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext);
  const [failed, setFailed] = useState(false);
  return (
    <Link className="product-card" to={`/productdetail/${id}`}>
      <div className="product-image">
        {image && !failed ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="image-placeholder">Image coming soon</span>
        )}
        <span className="product-badge">THE EVERYDAY EDIT</span>
        <span className="product-arrow">
          <FiArrowUpRight />
        </span>
      </div>
      <div className="product-meta">
        <h3>{name}</h3>
        <p>
          {currency} {Number(price).toLocaleString("en-PK")}
        </p>
      </div>
      <span className="product-subtitle">Discover the details</span>
    </Link>
  );
}
