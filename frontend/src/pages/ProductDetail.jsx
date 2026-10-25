import { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import { shopDataContext } from "../context/ShopContext";
import { UserDataContext } from "../context/UserContext";
import Card from "../component/Card";
import CatalogState from "../component/CatalogState";
import Footer from "../component/Footer";
export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { UserData } = useContext(UserDataContext);
  const { products, productsLoading, productsError, currency, addtocart } =
    useContext(shopDataContext);
  const product = products.find((p) => p._id === productId);
  const [selection, setSelection] = useState({
    id: productId,
    size: "",
    image: "",
    added: false,
  });
  const current =
    selection.id === productId
      ? selection
      : { id: productId, size: "", image: "", added: false };
  const [message, setMessage] = useState("");
  const update = (patch) => setSelection({ ...current, ...patch });
  if (productsLoading || productsError)
    return (
      <main className="container section">
        <CatalogState />
      </main>
    );
  if (!product)
    return (
      <main className="storefront">
        <section className="container section community">
          <h1>This find isn’t available.</h1>
          <p>Explore the collection for something else you’ll love.</p>
          <Link className="button dark" to="/collection">
            Back to the collection <FiArrowRight />
          </Link>
        </section>
        <Footer />
      </main>
    );
  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);
  const related = products
    .filter((p) => p._id !== productId && p.category === product.category)
    .slice(0, 4);
  return (
    <main className="storefront">
      <section className="container detail-section">
        <Link to="/collection" className="text-link">
          <FiArrowLeft /> Back to the collection
        </Link>
        <div className="detail-grid">
          <div>
            <div className="detail-photo">
              {images.length ? (
                <img src={current.image || images[0]} alt={product.name} />
              ) : (
                <span>Image coming soon</span>
              )}
            </div>
            <div className="detail-thumbnails">
              {images.map((img, i) => (
                <button
                  key={i}
                  aria-label={"View image " + (i + 1)}
                  aria-pressed={(current.image || images[0]) === img}
                  onClick={() => update({ image: img })}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-info">
            <span className="eyebrow">
              {product.category} / THE EVERYDAY EDIT
            </span>
            <h1>{product.name}</h1>
            <p className="detail-price">
              {currency} {Number(product.price).toLocaleString("en-PK")}
            </p>
            <p className="detail-description">{product.description}</p>
            <fieldset>
              <legend>Choose your size</legend>
              <div className="size-options">
                {(product.sizes || []).map((size) => (
                  <button
                    type="button"
                    key={size}
                    className={current.size === size ? "selected" : ""}
                    aria-pressed={current.size === size}
                    onClick={() => {
                      update({ size, added: false });
                      setMessage("");
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>
            <button
              className="button dark add-to-bag"
              onClick={async () => {
                if (!current.size) {
                  setMessage("Please choose a size first.");
                  return;
                }
                if (!UserData) {
                  navigate("/login", {
                    state: { from: "/productdetail/" + productId },
                  });
                  return;
                }
                const added = await addtocart(product._id, current.size);
                if (!added) {
                  setMessage("We couldn’t update your bag. Please try again.");
                  return;
                }
                update({ added: true });
                setMessage("Added to your bag.");
              }}
            >
              {current.added ? <FiCheck /> : <FiShoppingBag />}
              {current.added ? "Added to your bag" : "Add to bag"}
            </button>
            <p className="detail-message" role="status">
              {message}
            </p>
            <Link className="text-link" to="/cart">
              View your bag <FiArrowRight />
            </Link>
            <div className="detail-help">
              <h3>A little help?</h3>
              <p>
                Questions about sizing or your order?{" "}
                <Link to="/contact">Get in touch with us.</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="container section">
          <div className="section-heading">
            <h2>You might also love.</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <Card
                key={p._id}
                id={p._id}
                name={p.name}
                image={p.image1}
                price={p.price}
              />
            ))}
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
