import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { FiArrowLeft, FiArrowUpRight, FiEye, FiEyeOff } from "react-icons/fi";
import { Auth, Provider } from "../../utils/Firebase";
import { authDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";
import photo from "../assets/fancy1.jpeg";
export default function AuthForm({ register = false }) {
  const { ServerUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(UserDataContext);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const complete = async () => {
    await getCurrentUser();
    navigate(location.state?.from || "/");
  };
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const result = await axios.post(
        `${ServerUrl}/api/auth/${register ? "registration" : "login"}`,
        data,
        { withCredentials: true, timeout: 20000 },
      );
      if (result.status !== 201)
        throw new Error("We couldn’t complete that request. Please try again.");
      await complete();
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };
  const google = async () => {
    if (!Auth) {
      setError(
        "Google sign-in is not available right now. Please use your email instead.",
      );
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await signInWithPopup(Auth, Provider);
      await axios.post(
        ServerUrl + "/api/auth/googlelogin",
        { name: result.user.displayName, email: result.user.email },
        { withCredentials: true, timeout: 20000 },
      );
      await complete();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Google sign-in could not be completed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="auth-page">
      <section className="auth-content">
        <Link to="/" className="wordmark">
          pakistan<span>mart.</span>
        </Link>
        <Link to="/" className="text-link auth-back">
          <FiArrowLeft /> Back to the good stuff
        </Link>
        <div className="auth-form-wrap">
          <span className="eyebrow">YOUR OWN LITTLE CORNER</span>
          <h1>{register ? "Make yourself at home." : "Good to see you."}</h1>
          <p>
            {register
              ? "Create an account to save your finds and place an order."
              : "Sign in to pick up where you left off."}
          </p>
          <button className="google-button" onClick={google} disabled={busy}>
            Continue with Google <FiArrowUpRight />
          </button>
          <div className="auth-divider">
            <span>or use your email</span>
          </div>
          <form onSubmit={submit}>
            {register && (
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Your full name"
                />
              </label>
            )}
            <label>
              Email address
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <div className="password-input">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  minLength={register ? 8 : undefined}
                  autoComplete={register ? "new-password" : "current-password"}
                  placeholder={
                    register ? "At least 8 characters" : "Your password"
                  }
                />
                <button
                  type="button"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow(!show)}
                >
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </label>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <button className="button dark" type="submit" disabled={busy}>
              {busy ? "One moment…" : register ? "Create account" : "Sign in"}
              <FiArrowUpRight />
            </button>
          </form>
          <p className="auth-switch">
            {register ? "Already part of the club?" : "New around here?"}{" "}
            <Link to={register ? "/login" : "/singup"} state={location.state}>
              {register ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <Link className="text-link" to="/">
            Just browsing? Explore the collection →
          </Link>
        </div>
      </section>
      <aside className="auth-art">
        <img src={photo} alt="Find your personal style" />
        <div>
          <span className="eyebrow">A LITTLE LOCAL. A LOT OF STYLE.</span>
          <h2>
            Find something
            <br />
            that feels like <em>you.</em>
          </h2>
        </div>
      </aside>
    </main>
  );
}
