import { useContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";
import CatalogState from "../component/CatalogState";
import Footer from "../component/Footer";
import { FiSearch, FiX } from "react-icons/fi";
export default function Collections() {
  const { products, productsLoading, productsError, search, setSearch } =
    useContext(shopDataContext);
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "All";
  const [sort, setSort] = useState("newest");
  const items = useMemo(() => {
    let result = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase()),
    );
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, search, sort]);
  return (
    <main className="storefront">
      <section className="collection-intro container">
        <span className="eyebrow">GOOD STYLE STARTS HERE</span>
        <h1>
          The everyday edit<span>.</span>
        </h1>
        <p>
          Find the pieces that feel like you. Explore, discover, make them
          yours.
        </p>
      </section>
      <section className="container collection-content">
        <div className="catalog-toolbar">
          <div className="filter-tabs">
            {["All", "Men", "Women", "Kids"].map((c) => (
              <button
                key={c}
                className={c === category ? "selected" : ""}
                onClick={() => setParams(c === "All" ? {} : { category: c })}
              >
                {c === "All" ? "Shop all" : c}
              </button>
            ))}
          </div>
          <label className="sort-label">
            Sort by{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="catalog-search">
          <FiSearch />
          <input
            aria-label="Search products"
            placeholder="Search your next favourite…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button aria-label="Clear search" onClick={() => setSearch("")}>
              <FiX />
            </button>
          )}
          <span>{items.length} finds</span>
        </div>
        {productsLoading || productsError || !items.length ? (
          <CatalogState empty={!items.length} />
        ) : (
          <div className="product-grid">
            {items.map((p) => (
              <Card
                key={p._id}
                name={p.name}
                image={p.image1}
                price={p.price}
                id={p._id}
              />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
