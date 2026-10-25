import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiArrowUpRight } from "react-icons/fi";
import { shopDataContext } from "../context/ShopContext";
export default function Ai() {
  const [open, setOpen] = useState(false);
  const { search, setSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  return (
    <aside className="shopping-helper">
      {open && (
        <div
          className="helper-panel"
          role="dialog"
          aria-label="Find your style"
        >
          <button
            className="helper-close"
            aria-label="Close shopping helper"
            onClick={() => setOpen(false)}
          >
            <FiX />
          </button>
          <span className="eyebrow">A LITTLE HELP?</span>
          <h3>Let’s find your style.</h3>
          <p>Search our collection for your next favourite.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowSearch(true);
              navigate("/collection");
              setOpen(false);
            }}
          >
            <input
              aria-label="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Try cotton, shirt…"
            />
            <button aria-label="Search">
              <FiArrowUpRight />
            </button>
          </form>
        </div>
      )}
      <button
        className="helper-button"
        aria-label={open ? "Close shopping helper" : "Open shopping helper"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX /> : <FiSearch />}
        <span>Find your style</span>
      </button>
    </aside>
  );
}
