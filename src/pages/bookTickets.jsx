import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Default Movies Array (Fallback agar LocalStorage khali ho)
const defaultMovies = [
  { id: "1", title: "Kalki 2898 AD", genre: "Sci-Fi / Action", showtimes: ["03:00 PM", "06:30 PM", "09:45 PM"] },
  { id: "2", title: "Inception", genre: "Sci-Fi / Thriller", showtimes: ["04:15 PM", "07:30 PM", "10:30 PM"] },
  { id: "3", title: "The Dark Knight", genre: "Action / Crime", showtimes: ["02:00 PM", "05:45 PM", "09:00 PM"] }
];

const initialBookedSeats = ["R1", "R2", "B3", "B4", "D5", "D6"];

const SeatIcon = ({ status, isRecliner }) => {
  let fillColor = "#27272a";
  let strokeColor = "#52525b";

  if (status === "available") {
    if (isRecliner) {
      fillColor = "#2a220a";
      strokeColor = "#eab308";
    } else {
      fillColor = "#18181b";
      strokeColor = "#71717a";
    }
  } else if (status === "booked") {
    fillColor = "#3f3f46";
    strokeColor = "#ef4444";
  } else if (status === "selected") {
    fillColor = "#e11d48";
    strokeColor = "#fda4af";
  }

  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill={fillColor} stroke={strokeColor} strokeWidth="1" style={{ transition: "0.2s all" }}>
      <path d="M4 3C4 1.89543 4.89543 1 6 1H18C19.1046 1 20 1.89543 20 3V13C20 14.1046 19.1046 15 18 15H6C4.89543 15 4 14.1046 4 13V3Z" />
      <path d="M2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V12Z" />
      <rect x="1" y="11" width="3" height="7" rx="1" fill={fillColor} />
      <rect x="20" y="11" width="3" height="7" rx="1" fill={fillColor} />
    </svg>
  );
};

const BookTickets = () => {
  // 🟢 Dynamic Movies State
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Checkout Modal States
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const navigate = useNavigate();

  // 🔴 FIX: Fetch Admin Updated Movies from LocalStorage on load
  useEffect(() => {
    // Apne Admin Panel me jo LocalStorage key use ki hai wahi exact key yahan fetch karein
    // Common keys: "imovies_movies", "admin_movies", ya "movies"
    const savedAdminMovies = JSON.parse(
      localStorage.getItem("imovies_movies") || 
      localStorage.getItem("admin_movies") || 
      localStorage.getItem("movies") || 
      "[]"
    );

    const activeList = savedAdminMovies.length > 0 ? savedAdminMovies : defaultMovies;
    
    setMoviesList(activeList);
    setSelectedMovie(activeList[0]);
    setSelectedShowtime(activeList[0]?.showtimes ? activeList[0].showtimes[0] : "03:00 PM");
  }, []);

  const handleMovieChange = (movie) => {
    setSelectedMovie(movie);
    const times = movie.showtimes && movie.showtimes.length > 0 ? movie.showtimes : ["03:00 PM", "06:30 PM", "09:45 PM"];
    setSelectedShowtime(times[0]);
    setSelectedSeats([]);
  };

  const toggleSeatSelection = (seatId) => {
    if (initialBookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const calculateBaseTotal = () => {
    return selectedSeats.reduce((acc, seat) => {
      const isRecliner = seat.startsWith("R");
      return acc + (isRecliner ? 500 : 250);
    }, 0);
  };

  const baseAmount = calculateBaseTotal();
  const convenienceFee = selectedSeats.length > 0 ? 30 : 0;
  const gstTax = Math.round(baseAmount * 0.18);
  const finalTotal = baseAmount + convenienceFee + gstTax;

  const handleOpenCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to proceed with booking.");
      navigate("/login");
      return;
    }

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }

    setShowCheckout(true);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        const userObj = JSON.parse(localStorage.getItem("user") || "{}");
        const currentUserEmail = userObj.email || "guest_user";

        const newBooking = {
          id: Date.now().toString(),
          userEmail: currentUserEmail,
          title: selectedMovie?.title || "Movie",
          genre: selectedMovie?.genre || "Cinema",
          showtime: selectedShowtime,
          seats: selectedSeats,
          totalAmount: finalTotal,
          paymentMethod: paymentMethod.toUpperCase(),
          bookingDate: new Date().toLocaleDateString()
        };

        const userBookingKey = `myBookings_${currentUserEmail}`;
        const existingBookings = JSON.parse(localStorage.getItem(userBookingKey) || "[]");
        localStorage.setItem(userBookingKey, JSON.stringify([...existingBookings, newBooking]));

        const globalBookings = JSON.parse(localStorage.getItem("myBookings") || "[]");
        localStorage.setItem("myBookings", JSON.stringify([...globalBookings, newBooking]));

        setShowCheckout(false);
        setIsSuccess(false);
        navigate("/user-products");
      }, 1500);
    }, 2000);
  };

  const renderSeatRow = (rowLabel, isRecliner = false) => {
    const leftBlock = [1, 2];
    const centerBlock = [3, 4, 5, 6];
    const rightBlock = [7, 8];

    const renderBlock = (seats) =>
      seats.map((num) => {
        const seatId = `${rowLabel}${num}`;
        const isBooked = initialBookedSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);

        let status = "available";
        if (isBooked) status = "booked";
        if (isSelected) status = "selected";

        return (
          <button
            key={seatId}
            disabled={isBooked}
            onClick={() => toggleSeatSelection(seatId)}
            title={`${seatId}\n${isRecliner ? "₹500 (VIP Recliner)" : "₹250 (Standard)"}`}
            style={{
              background: "none",
              border: "none",
              cursor: isBooked ? "not-allowed" : "pointer",
              padding: "2px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: isBooked ? 0.4 : 1
            }}
          >
            <SeatIcon status={status} isRecliner={isRecliner} />
            <span style={{ fontSize: "10px", color: isSelected ? "#e11d48" : isBooked ? "#ef4444" : "#a1a1aa", marginTop: "2px", fontWeight: "600" }}>
              {seatId}
            </span>
          </button>
        );
      });

    return (
      <div key={rowLabel} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <span style={{ width: "24px", color: "#a1a1aa", fontWeight: "bold", fontSize: "14px" }}>{rowLabel}</span>
        
        <div style={{ display: "flex", gap: "6px" }}>{renderBlock(leftBlock)}</div>
        <div style={{ width: "30px" }}></div>
        <div style={{ display: "flex", gap: "6px" }}>{renderBlock(centerBlock)}</div>
        <div style={{ width: "30px" }}></div>
        <div style={{ display: "flex", gap: "6px" }}>{renderBlock(rightBlock)}</div>
      </div>
    );
  };

  if (!selectedMovie) return <div style={{ color: "#fff", textAlign: "center", padding: "50px" }}>Loading Movies...</div>;

  return (
    <div style={{ padding: "40px 20px", color: "#fff", minHeight: "85vh", maxWidth: "950px", margin: "0 auto", position: "relative" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px", textAlign: "center" }}>Select Seats</h2>
      <p style={{ color: "#a1a1aa", marginBottom: "32px", textAlign: "center" }}>Pick your seats with live theater layout & recliner choices.</p>

      {/* Movie & Showtime Controls */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "space-between", marginBottom: "40px", backgroundColor: "#18181b", padding: "20px", borderRadius: "12px", border: "1px solid #27272a" }}>
        <div>
          <label style={{ display: "block", color: "#a1a1aa", fontSize: "14px", marginBottom: "6px" }}>Select Movie</label>
          <select 
            value={selectedMovie.id || selectedMovie.title} 
            onChange={(e) => handleMovieChange(moviesList.find((m) => (m.id || m.title) === e.target.value))}
            style={{ padding: "10px 16px", borderRadius: "6px", backgroundColor: "#27272a", color: "#fff", border: "none", fontSize: "15px", cursor: "pointer" }}
          >
            {moviesList.map((m) => (
              <option key={m.id || m.title} value={m.id || m.title}>{m.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: "block", color: "#a1a1aa", fontSize: "14px", marginBottom: "6px" }}>Select Showtime</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {(selectedMovie.showtimes && selectedMovie.showtimes.length > 0 ? selectedMovie.showtimes : ["03:00 PM", "06:30 PM", "09:45 PM"]).map((time) => (
              <button
                key={time}
                onClick={() => setSelectedShowtime(time)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: selectedShowtime === time ? "#e11d48" : "#27272a",
                  color: "#fff",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Screen Graphic */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{ width: "75%", height: "10px", backgroundColor: "#e11d48", margin: "0 auto 10px", borderRadius: "50%", boxShadow: "0px 6px 25px #e11d48" }}></div>
        <p style={{ fontSize: "11px", color: "#71717a", letterSpacing: "3px", textTransform: "uppercase" }}>ALL EYES THIS WAY (SCREEN)</p>
      </div>

      {/* Theater Layout */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px" }}>
        <p style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: "600", letterSpacing: "1px", marginBottom: "12px" }}>EXECUTIVE SEATS (₹250)</p>
        {["A", "B", "C", "D"].map((row) => renderSeatRow(row, false))}

        <div style={{ borderTop: "1px dashed #3f3f46", paddingTop: "20px", marginTop: "16px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p style={{ fontSize: "12px", color: "#eab308", fontWeight: "700", letterSpacing: "1px", marginBottom: "12px" }}>VIP RECLINERS - BACK ROW (₹500)</p>
          {renderSeatRow("R", true)}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "36px", flexWrap: "wrap", backgroundColor: "#18181b", padding: "16px", borderRadius: "8px", border: "1px solid #27272a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SeatIcon status="available" isRecliner={false} />
          <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Standard (Available)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SeatIcon status="available" isRecliner={true} />
          <span style={{ fontSize: "13px", color: "#eab308" }}>Recliner (Available)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SeatIcon status="selected" isRecliner={false} />
          <span style={{ fontSize: "13px", color: "#e11d48", fontWeight: "bold" }}>Selected</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <SeatIcon status="booked" isRecliner={false} />
          <span style={{ fontSize: "13px", color: "#ef4444" }}>Booked (Occupied)</span>
        </div>
      </div>

      {/* Booking Summary Box */}
      <div style={{ backgroundColor: "#18181b", padding: "20px 30px", borderRadius: "12px", border: "1px solid #27272a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ color: "#a1a1aa", fontSize: "14px" }}>Selected Seats: <strong style={{ color: "#fff" }}>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</strong></p>
          <p style={{ color: "#a1a1aa", fontSize: "14px", marginTop: "4px" }}>Estimated Total: <strong style={{ color: "#e11d48", fontSize: "20px" }}>₹{finalTotal}</strong></p>
        </div>

        <button
          onClick={handleOpenCheckout}
          style={{
            padding: "12px 32px",
            backgroundColor: selectedSeats.length > 0 ? "#e11d48" : "#3f3f46",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "15px",
            cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed"
          }}
        >
          Proceed to Pay
        </button>
      </div>

      {/* Payment Checkout Modal Overlay */}
      {showCheckout && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ backgroundColor: "#18181b", border: "1px solid #27272a", width: "100%", maxWidth: "480px", borderRadius: "16px", padding: "28px", color: "#fff" }}>
            
            {isSuccess ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: "60px", height: "60px", backgroundColor: "#22c55e", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 16px", fontSize: "30px" }}>✓</div>
                <h3 style={{ fontSize: "22px", fontWeight: "700" }}>Payment Successful!</h3>
                <p style={{ color: "#a1a1aa", fontSize: "14px", marginTop: "6px" }}>Redirecting to your booked tickets...</p>
              </div>
            ) : isProcessing ? (
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Processing Payment...</p>
                <p style={{ color: "#a1a1aa", fontSize: "14px" }}>Please do not refresh or close the page.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: "700" }}>Checkout & Payment</h3>
                  <button onClick={() => setShowCheckout(false)} style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "18px", cursor: "pointer" }}>✕</button>
                </div>

                {/* Ticket Summary Breakdown */}
                <div style={{ backgroundColor: "#27272a", padding: "16px", borderRadius: "10px", marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{selectedMovie.title}</h4>
                  <p style={{ color: "#a1a1aa", fontSize: "13px" }}>Showtime: {selectedShowtime} | Seats: {selectedSeats.join(", ")}</p>
                  <hr style={{ borderColor: "#3f3f46", margin: "12px 0" }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#a1a1aa" }}>
                    <span>Tickets Base Amount</span>
                    <span>₹{baseAmount}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#a1a1aa", marginTop: "6px" }}>
                    <span>Convenience Fee</span>
                    <span>₹{convenienceFee}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#a1a1aa", marginTop: "6px" }}>
                    <span>GST (18%)</span>
                    <span>₹{gstTax}</span>
                  </div>
                  <hr style={{ borderColor: "#3f3f46", margin: "12px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "700", color: "#fff" }}>
                    <span>Total Amount</span>
                    <span style={{ color: "#e11d48" }}>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Select Payment Method */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", color: "#a1a1aa", marginBottom: "10px" }}>Select Payment Mode</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                    {["upi", "card", "netbanking"].map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        style={{
                          padding: "10px 8px",
                          borderRadius: "8px",
                          border: paymentMethod === method ? "2px solid #e11d48" : "1px solid #3f3f46",
                          backgroundColor: paymentMethod === method ? "rgba(225, 29, 72, 0.15)" : "#27272a",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          cursor: "pointer"
                        }}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Pay Button */}
                <button
                  onClick={handleProcessPayment}
                  style={{
                    width: "100%",
                    padding: "14px",
                    backgroundColor: "#e11d48",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "15px",
                    cursor: "pointer"
                  }}
                >
                  Pay ₹{finalTotal} Now
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookTickets;