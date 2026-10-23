import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#000000", color: "#ffffff", minHeight: "calc(100vh - 70px)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", boxSizing: "border-box" }}>
      <section 
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "40px 20px",
          textAlign: "center"
        }}
      >
        {/* Subtle Tagline Badge */}
        <span style={{ backgroundColor: "rgba(225, 29, 72, 0.15)", color: "#e11d48", padding: "8px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", border: "1px solid rgba(225, 29, 72, 0.3)" }}>
          WELCOME TO iMOVIES
        </span>

        {/* Main Heading */}
        <h1 style={{ fontSize: "52px", fontWeight: "800", margin: "24px 0 16px", color: "#ffffff", lineHeight: "1.15", letterSpacing: "-1px" }}>
          Experience Cinema Like <br /> Never Before
        </h1>

        {/* Subtitle */}
        <p style={{ color: "#94a3b8", maxWidth: "680px", margin: "0 auto 36px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400" }}>
          Discover the latest blockbusters, select your favorite recliner seats in real-time, and reserve your tickets seamlessly in seconds.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link 
            to={localStorage.getItem("token") ? "/book-tickets" : "/login"} 
            style={{ padding: "14px 36px", backgroundColor: "#e11d48", color: "#ffffff", textDecoration: "none", borderRadius: "8px", fontWeight: "600", fontSize: "16px" }}
          >
            Book Tickets
          </Link>

          <Link 
            to="/explore" 
            style={{ padding: "14px 36px", backgroundColor: "#111111", color: "#ffffff", textDecoration: "none", borderRadius: "8px", fontWeight: "600", fontSize: "16px", border: "1px solid #222222" }}
          >
            Explore Movies
          </Link>
        </div>

        {/* Key App Highlights */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginTop: "60px", textAlign: "left" }}>
          <div style={{ backgroundColor: "#111111", padding: "24px", borderRadius: "12px", border: "1px solid #222222" }}>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#fff" }}>🎬 Latest Releases</h4>
            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: "1.5" }}>Explore curated catalogs and search active movies easily.</p>
          </div>

          <div style={{ backgroundColor: "#111111", padding: "24px", borderRadius: "12px", border: "1px solid #222222" }}>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#fff" }}>🪑 Live Seat Matrix</h4>
            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: "1.5" }}>Interactive seat selection with VIP Recliner choices.</p>
          </div>

          <div style={{ backgroundColor: "#111111", padding: "24px", borderRadius: "12px", border: "1px solid #222222" }}>
            <h4 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#fff" }}>🎟️ Instant Booking</h4>
            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: "1.5" }}>Manage active tickets in your personal "My Bookings" tab.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;