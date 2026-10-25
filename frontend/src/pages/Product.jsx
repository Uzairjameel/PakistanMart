import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";
import CatalogState from "../component/CatalogState";
import Footer from "../component/Footer";
export default function Product({ embedded = false, category = "All" }) {
  const { products, productsLoading, productsError } =
    useContext(shopDataContext);
  const items = products
    .filter((p) => category === "All" || p.category === category)
    .slice(0, 8);
  const content = (
    <>
      {productsLoading || productsError || !items.length ? (
        <CatalogState empty={!items.length} />
      ) : (
        <div className="product-grid">
          {items.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          ))}
        </div>
      )}
    </>
  );
  return embedded ? (
    content
  ) : (
    <main className="storefront">
      <section className="container section page-heading">
        <span className="eyebrow">THE PAKISTANMART EDIT</span>
        <h1>Your next favourite.</h1>
        {content}
      </section>
      <Footer />
    </main>
  );
}
