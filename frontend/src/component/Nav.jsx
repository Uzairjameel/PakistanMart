import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiArrowUpRight,
} from "react-icons/fi";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";
import { shopDataContext } from "../context/ShopContext";
export default function Nav() {
  const { UserData, getCurrentUser } = useContext(UserDataContext);
  const { ServerUrl } = useContext(authDataContext);
  const [profile, setProfile] = useState(false);
  const [accountError, setAccountError] = useState("");
  const logout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
        timeout: 15000,
      });
      await getCurrentUser();
      setProfile(false);
      navigate("/");
    } catch {
      setAccountError("Could not sign out. Please try again.");
    }
  };
  const { getCartCount, search, setSearch, setShowSearch } =
    useContext(shopDataContext);
  const [menu, setMenu] = useState(false);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="site-header">
      <div className="announcement">
        A little local. A lot of style.{" "}
        <Link to="/collection">
          Discover the collection <FiArrowUpRight />
        </Link>
      </div>
      <div className="nav-inner container">
        <Link to="/" className="wordmark" aria-label="PakistanMart home">
          <span className="brand-symbol">
            p<span>m</span>
          </span>
          pakistan<span>mart.</span>
        </Link>
        <nav
          className={menu ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          {[
            ["/", "Home"],
            ["/collection", "Shop all"],
            ["/about", "Our story"],
            ["/contact", "Get in touch"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenu(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Search products"
            onClick={() => setSearching(!searching)}
          >
            <FiSearch />
          </button>
          <div className="account-menu">
            {UserData ? (
              <button
                aria-label="Your account"
                aria-expanded={profile}
                onClick={() => setProfile(!profile)}
              >
                <FiUser />
              </button>
            ) : (
              <Link to="/login" aria-label="Log in">
                <FiUser />
              </Link>
            )}
            {profile && UserData && (
              <div className="account-popover">
                <span>Hello, {UserData.name?.split(" ")[0] || "there"}</span>
                <Link to="/order" onClick={() => setProfile(false)}>
                  Your orders
                </Link>
                <button onClick={logout}>Sign out</button>
                {accountError && <p role="alert">{accountError}</p>}
              </div>
            )}
          </div>
          <Link
            to="/cart"
            className="bag-link"
            aria-label={`Shopping bag, ${getCartCount()} items`}
          >
            <FiShoppingBag />
            <span>{getCartCount()}</span>
          </Link>
          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {searching && (
        <form
          className="nav-search container"
          onSubmit={(e) => {
            e.preventDefault();
            setShowSearch(true);
            setSearching(false);
            navigate("/collection");
          }}
        >
          <FiSearch />
          <input
            autoFocus
            aria-label="Search collection"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button dark" type="submit">
            Search
          </button>
        </form>
      )}
    </header>
  );
}
