import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="wordmark">
            pakistan<span>mart.</span>
          </Link>
          <p>
            A little local. A lot of style.
            <br />
            Find something that feels like you.
          </p>
          <span className="footer-signature">From Pakistan, with love. ✳︎</span>
        </div>
        <div>
          <h3>Take a look</h3>
          <Link to="/collection">
            The collection <FiArrowUpRight />
          </Link>
          <Link to="/about">
            Our story <FiArrowUpRight />
          </Link>
          <Link to="/order">
            Your orders <FiArrowUpRight />
          </Link>
        </div>
        <div>
          <h3>Let’s talk</h3>
          <Link to="/contact">
            Get in touch <FiArrowUpRight />
          </Link>
          <a href="mailto:uzairjameel248@gmail.com">
            Email us <FiArrowUpRight />
          </a>
          <a href="tel:+923282737478">+92 328 2737478</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} PakistanMart. All rights reserved.
        </span>
        <span>Everyday, but better.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
