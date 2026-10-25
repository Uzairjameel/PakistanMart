import { createElement, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiPackage,
  FiRefreshCw,
  FiHeadphones,
} from "react-icons/fi";
import hero from "../assets/fancy.jpeg";
import men from "../assets/clothes.jpeg";
import women from "../assets/fancy1.jpeg";
import kids from "../assets/clothes2.jpeg";
import Product from "./Product";
import Footer from "../component/Footer";
import { shopDataContext } from "../context/ShopContext";
export default function Home() {
  const { setSearch, setShowSearch } = useContext(shopDataContext);
  const [active, setActive] = useState("All");
  return (
    <main className="storefront">
      <section className="hero container">
        <div className="hero-copy enter">
          <span className="eyebrow">
            <i /> THE EVERYDAY, REIMAGINED
          </span>
          <h1>
            Good style.
            <br />
            Great finds.
            <br />
            <em>All yours.</em>
          </h1>
          <p>
            Fresh favourites, everyday essentials, and a little something
            unexpected. Find your next favourite at PakistanMart.
          </p>
          <div className="hero-buttons">
            <Link className="button dark" to="/collection">
              Explore the collection <FiArrowUpRight />
            </Link>
            <a className="text-link" href="#discover">
              Find your style <FiArrowRight />
            </a>
          </div>
          <div className="hero-note">
            <span className="little-star">✳︎</span>
            <span>
              Made for your everyday.
              <br />
              <strong>Picked for your own kind of style.</strong>
            </span>
          </div>
        </div>
        <div className="hero-art enter">
          <img
            src={hero}
            alt="A curated rail of contemporary outfits in emerald, red and neutral tones"
            fetchPriority="high"
          />
          <span className="image-caption">THE STYLE EDIT / 01</span>
          <div className="hero-tag">
            <span>
              YOUR NEXT
              <br />
              FAVOURITE FIND
            </span>
            <FiArrowUpRight />
          </div>
          <div className="round-stamp">
            A FRESH PERSPECTIVE <span>✳︎</span>
          </div>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              EVERYDAY, BUT BETTER <b>✳︎</b> FIND YOUR OWN STYLE <b>✳︎</b> THE
              PAKISTANMART EDIT <b>✳︎</b>
            </span>
          ))}
        </div>
      </div>
      <section className="container section" id="discover">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A LITTLE INSPIRATION</span>
            <h2>Your style. Your way.</h2>
          </div>
          <Link className="text-link" to="/collection">
            Explore all <FiArrowUpRight />
          </Link>
        </div>
        <div className="category-grid">
          {[
            [men, "Men", "Everyday, elevated."],
            [women, "Women", "Make it your own."],
            [kids, "Kids", "Little looks. Big personality."],
          ].map(([img, name, caption], i) => (
            <Link
              className={"category-card category-" + i}
              key={name}
              to={"/collection?category=" + name}
            >
              <img src={img} alt={name + " style inspiration"} loading="lazy" />
              <div>
                <span>{caption}</span>
                <h3>
                  {name}
                  <FiArrowUpRight />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="container section arrivals">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FRESH FINDS, GOOD VIBES</span>
            <h2>Meet your new favourites.</h2>
          </div>
          <Link to="/collection" className="text-link">
            Shop the edit <FiArrowUpRight />
          </Link>
        </div>
        <div
          className="filter-tabs"
          role="group"
          aria-label="Filter featured products"
        >
          {["All", "Men", "Women", "Kids"].map((name) => (
            <button
              key={name}
              className={active === name ? "selected" : ""}
              onClick={() => setActive(name)}
            >
              {name === "All" ? "All finds" : name}
            </button>
          ))}
        </div>
        <Product embedded category={active} />
      </section>
      <section className="editorial container">
        <div>
          <span className="eyebrow">LESS SCROLLING. MORE DISCOVERING.</span>
          <h2>
            A wardrobe that
            <br />
            feels like <em>you.</em>
          </h2>
          <p>
            From easy mornings to your next big plan. Discover pieces that go
            wherever life takes you.
          </p>
          <Link to="/collection" className="button light">
            Find your next favourite <FiArrowUpRight />
          </Link>
        </div>
        <div className="editorial-art">
          <img
            src={women}
            alt="Fashion inspiration from the PakistanMart edit"
            loading="lazy"
          />
          <span>Wear it your way.</span>
        </div>
      </section>
      <section className="container benefits">
        {[
          [
            FiPackage,
            "Everyday convenience",
            "Your next find, just a few clicks away.",
          ],
          [
            FiRefreshCw,
            "Shop with confidence",
            "Questions about a purchase? Talk to us.",
          ],
          [FiHeadphones, "A human touch", "We’re here when you need a hand."],
        ].map(([icon, title, text]) => (
          <div key={title}>
            {createElement(icon)}
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="container community">
        <span className="eyebrow">LET’S FIND YOUR NEXT FAVOURITE</span>
        <h2>A little help with your next look?</h2>
        <p>
          Explore the collection or get in touch. We’re happy to help you find
          your style.
        </p>
        <div>
          <Link
            className="button dark"
            to="/collection"
            onClick={() => {
              setSearch("");
              setShowSearch(false);
            }}
          >
            Keep exploring <FiArrowUpRight />
          </Link>
          <Link className="text-link" to="/contact">
            Say hello <FiArrowRight />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
