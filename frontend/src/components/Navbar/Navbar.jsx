import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets/frontend_assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";

const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // ✅ AI search states
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // ✅ Handle AI Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.post("http://localhost:4000/api/ai/smart-search", {
        query,
      });
      setAiResponse(res.data.suggestion);
    } catch (error) {
      console.error("AI search error:", error);
      setAiResponse("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="navbar">
      <Link to="/"><img src={assets.logo} alt="logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <Link to="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</Link>
        <Link to="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</Link>
        <Link to="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</Link>
      </ul>

      <div className="navbar-right">
        {/* ✅ Small AI Search Bar */}
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search food..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button type="submit" style={{ background: "none", border: "none", cursor: "pointer" }}>
            <img src={assets.search_icon} alt="search" />
          </button>
        </form>

        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="basket" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowlogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" /><p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /><p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* ✅ Show AI Response Below Navbar */}
      {aiResponse && (
        <div style={{ marginTop: "10px", padding: "10px", background: "#f4f4f4", borderRadius: "6px" }}>
          <strong>AI Suggestion:</strong> {aiResponse}
        </div>
      )}
    </div>
  );
};

export default Navbar;
