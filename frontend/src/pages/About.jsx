import { Link } from "react-router-dom";
import image from "../assets/about.jpeg";
import Footer from "../component/Footer";
export default function About() {
  return (
    <main className="storefront">
      <section className="container section story">
        <div>
          <span className="eyebrow">HELLO, WE’RE PAKISTANMART</span>
          <h1>
            Everyday finds.
            <br />
            <em>Extraordinary you.</em>
          </h1>
          <p>
            We believe good style should feel effortless. PakistanMart brings
            fashion, everyday essentials and fresh discoveries together in one
            place.
          </p>
          <p>
            Our idea is simple: help you find pieces that fit your life, your
            personality and your everyday plans.
          </p>
          <Link className="button dark" to="/collection">
            Explore our collection ↗
          </Link>
        </div>
        <img src={image} alt="The PakistanMart story" />
      </section>
      <section className="container community">
        <span className="eyebrow">OUR APPROACH</span>
        <h2>A little more thoughtful.</h2>
        <p>
          Easy discovery. Personal style. A helpful human when you need one.
          That’s the shopping experience we’re building.
        </p>
      </section>
      <Footer />
    </main>
  );
}
