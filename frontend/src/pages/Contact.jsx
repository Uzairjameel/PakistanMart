import { FiMail, FiPhone, FiArrowUpRight } from "react-icons/fi";
import Footer from "../component/Footer";
export default function Contact() {
  return (
    <main className="storefront">
      <section className="container section contact-page">
        <span className="eyebrow">WE’RE HERE FOR YOU</span>
        <h1>
          Let’s talk<em>.</em>
        </h1>
        <p>
          A question about your order? Need a little style advice?
          <br />
          There’s a real person on the other side.
        </p>
        <div className="contact-grid">
          <a href="mailto:uzairjameel248@gmail.com">
            <FiMail />
            <h2>Drop us a line.</h2>
            <p>uzairjameel248@gmail.com</p>
            <span>
              Email us <FiArrowUpRight />
            </span>
          </a>
          <a href="tel:+923282737478">
            <FiPhone />
            <h2>Say hello.</h2>
            <p>+92 328 2737478</p>
            <span>
              Give us a call <FiArrowUpRight />
            </span>
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
