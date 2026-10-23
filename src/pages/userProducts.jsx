import { useState, useEffect } from "react";

const UserProducts = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // 1. Current logged-in user fetch karein
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userEmail = currentUser.email;

    if (userEmail) {
      // Priority 1: User specific LocalStorage key se bookings fetch karein
      const userSpecificBookings = JSON.parse(localStorage.getItem(`myBookings_${userEmail}`) || "[]");
      
      // Priority 2: Fallback filter from global bookings array
      const globalBookings = JSON.parse(localStorage.getItem("myBookings") || "[]");
      const filteredGlobal = globalBookings.filter((b) => b.userEmail === userEmail);

      setBookings(userSpecificBookings.length > 0 ? userSpecificBookings : filteredGlobal);
    } else {
      // Agar user login nahi hai to array blank rakhein
      setBookings([]);
    }
  }, []);

  const handleDownloadTicket = (booking) => {
    const printWindow = window.open("", "_blank");
    
    const formattedSeats = Array.isArray(booking.seats) 
      ? booking.seats.join(", ") 
      : booking.seats;

    const ticketContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>iMovies - Ticket Pass (${booking.title})</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #fff;
              color: #111;
              margin: 0;
              padding: 40px;
            }
            .ticket-card {
              max-width: 500px;
              margin: 0 auto;
              border: 2px dashed #000;
              border-radius: 12px;
              padding: 24px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #e11d48;
              padding-bottom: 12px;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              color: #e11d48;
              font-size: 28px;
              letter-spacing: 1px;
            }
            .header p {
              margin: 4px 0 0;
              color: #666;
              font-size: 13px;
              text-transform: uppercase;
            }
            .details {
              line-height: 1.8;
            }
            .row {
              display: flex;
              justify-content: space-between;
              font-size: 15px;
              margin-bottom: 8px;
            }
            .label {
              color: #555;
            }
            .value {
              font-weight: bold;
              color: #000;
            }
            .qr-mock {
              text-align: center;
              margin-top: 24px;
              padding-top: 16px;
              border-top: 1px dashed #ccc;
            }
            .qr-mock p {
              font-size: 11px;
              color: #888;
              letter-spacing: 2px;
            }
          </style>
        </head>
        <body>
          <div class="ticket-card">
            <div class="header">
              <h1>iMOVIES</h1>
              <p>Official Cinema Admit Pass</p>
            </div>
            <div class="details">
              <div class="row">
                <span class="label">Movie:</span>
                <span class="value">${booking.title || booking.name}</span>
              </div>
              <div class="row">
                <span class="label">Genre:</span>
                <span class="value">${booking.genre || "N/A"}</span>
              </div>
              <div class="row">
                <span class="label">Showtime:</span>
                <span class="value">${booking.showtime || "N/A"}</span>
              </div>
              <div class="row">
                <span class="label">Booked Seats:</span>
                <span class="value" style="color: #e11d48;">${formattedSeats}</span>
              </div>
              <div class="row">
                <span class="label">Amount Paid:</span>
                <span class="value">₹${booking.totalAmount || 0}</span>
              </div>
              <div class="row">
                <span class="label">Booking Date:</span>
                <span class="value">${booking.bookingDate || new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div class="qr-mock">
              <p>CONFIRMED PASS • TICKET ID: #${booking.id}</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(ticketContent);
    printWindow.document.close();
  };

  return (
    <div style={{ padding: "40px 20px", color: "#fff", minHeight: "80vh", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>My Bookings</h2>
      <p style={{ color: "#a1a1aa", marginBottom: "32px" }}>View and download your confirmed cinema tickets.</p>
      
      {bookings.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px", color: "#a1a1aa" }}>
          <p style={{ fontSize: "18px", fontWeight: "500" }}>No bookings found.</p>
          <p style={{ fontSize: "14px", marginTop: "6px" }}>You haven't booked any movies yet. Reserve your tickets to get started!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {bookings.map((booking, index) => (
            <div key={booking.id || index} style={{ border: "1px solid #27272a", padding: "24px", borderRadius: "12px", backgroundColor: "#18181b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>{booking.title || booking.name}</h3>
                <p style={{ color: "#a1a1aa", fontSize: "13px", marginTop: "4px" }}>{booking.genre || "Movie"}</p>
                
                <hr style={{ borderColor: "#27272a", margin: "16px 0" }} />

                {booking.showtime && <p style={{ color: "#e2e8f0", fontSize: "14px" }}>Showtime: <strong>{booking.showtime}</strong></p>}
                {booking.seats && (
                  <p style={{ color: "#e2e8f0", fontSize: "14px", marginTop: "6px" }}>
                    Seats: <strong style={{ color: "#e11d48" }}>{Array.isArray(booking.seats) ? booking.seats.join(", ") : booking.seats}</strong>
                  </p>
                )}
                {booking.totalAmount && <p style={{ color: "#e2e8f0", fontSize: "14px", marginTop: "6px" }}>Total Paid: <strong>₹{booking.totalAmount}</strong></p>}
                
                <p style={{ color: "#22c55e", fontSize: "13px", marginTop: "12px", fontWeight: "600" }}>✓ Status: Confirmed</p>
              </div>

              <button
                onClick={() => handleDownloadTicket(booking)}
                style={{
                  marginTop: "20px",
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#27272a",
                  color: "#fff",
                  border: "1px solid #3f3f46",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                📥 Download Ticket PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProducts;