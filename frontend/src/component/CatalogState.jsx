import { useContext } from "react";
import { FiRefreshCw, FiShoppingBag } from "react-icons/fi";
import { shopDataContext } from "../context/ShopContext";
export default function CatalogState({ empty = false }) {
  const { productsLoading, productsError, getProducts } =
    useContext(shopDataContext);
  if (productsLoading)
    return (
      <div className="product-grid" role="status" aria-label="Loading products">
        {[0, 1, 2, 3].map((i) => (
          <div className="skeleton-card" key={i}>
            <div />
            <span />
            <span />
          </div>
        ))}
      </div>
    );
  if (!productsError && !empty) return null;
  return (
    <div className="catalog-state" role={productsError ? "alert" : "status"}>
      <span className="state-icon">
        <FiShoppingBag />
      </span>
      <h3>
        {productsError
          ? "Our collection is taking a little longer."
          : "Something good is on its way."}
      </h3>
      <p>
        {productsError
          ? "We couldn’t reach the product catalogue. Please try again in a moment."
          : "No products here just yet. Try another filter or check back soon."}
      </p>
      {productsError && (
        <button className="button dark" onClick={getProducts}>
          <FiRefreshCw /> Try again
        </button>
      )}
    </div>
  );
}
