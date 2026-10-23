import { useState, useEffect } from "react";
import API from "../api";

const defaultMoviesList = [
  { id: "1", title: "Kalki 2898 AD", genre: "Sci-Fi", price: 300, poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80" },
  { id: "2", title: "Inception", genre: "Sci-Fi", price: 250, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80" },
  { id: "3", title: "The Dark Knight", genre: "Action", price: 280, poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80" }
];

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    price: "",
    poster: ""
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      if (res.data && res.data.length > 0) {
        setMovies(res.data);
      } else {
        // 🔴 KEY HARMONIZATION: "imovies_movies" key use kar rahe hain
        const localMovies = JSON.parse(localStorage.getItem("imovies_movies") || "[]");
        setMovies(localMovies.length > 0 ? localMovies : defaultMoviesList);
      }
    } catch (err) {
      const localMovies = JSON.parse(localStorage.getItem("imovies_movies") || "[]");
      setMovies(localMovies.length > 0 ? localMovies : defaultMoviesList);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.genre || !formData.price) {
      alert("Please fill in title, genre, and price!");
      return;
    }

    const newMovie = {
      id: Date.now().toString(),
      title: formData.title,
      genre: formData.genre,
      price: Number(formData.price),
      poster: formData.poster || "https://via.placeholder.com/200x300?text=Movie+Poster"
    };

    try {
      await API.post("/movies/add", newMovie);
      alert("Movie added successfully!");
    } catch (err) {
      // 🔴 LocalStorage fallback with unified key "imovies_movies"
      const updatedMovies = [...movies, newMovie];
      setMovies(updatedMovies);
      localStorage.setItem("imovies_movies", JSON.stringify(updatedMovies));
      alert("Movie added to local catalog successfully!");
    }

    setFormData({ title: "", genre: "", price: "", poster: "" });
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await API.delete(`/movies/${id}`);
      setMovies(movies.filter((m) => m.id !== id));
      alert("Movie deleted successfully!");
    } catch (err) {
      // 🔴 LocalStorage fallback with unified key "imovies_movies"
      const updatedMovies = movies.filter((m) => m.id !== id);
      setMovies(updatedMovies);
      localStorage.setItem("imovies_movies", JSON.stringify(updatedMovies));
      alert("Movie deleted from catalog!");
    }
  };

  return (
    <div style={{ padding: "40px 20px", color: "#fff", minHeight: "85vh", maxWidth: "1100px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>Admin Dashboard</h2>
      <p style={{ color: "#a1a1aa", marginBottom: "32px" }}>Manage live movie inventory, add new releases, and update show details.</p>

      {/* Stats Header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div style={{ backgroundColor: "#18181b", padding: "20px", borderRadius: "10px", border: "1px solid #27272a" }}>
          <p style={{ color: "#a1a1aa", fontSize: "14px" }}>Total Movies</p>
          <h3 style={{ fontSize: "28px", fontWeight: "700", marginTop: "4px" }}>{movies.length}</h3>
        </div>
        <div style={{ backgroundColor: "#18181b", padding: "20px", borderRadius: "10px", border: "1px solid #27272a" }}>
          <p style={{ color: "#a1a1aa", fontSize: "14px" }}>System Status</p>
          <h3 style={{ fontSize: "28px", fontWeight: "700", marginTop: "4px", color: "#22c55e" }}>Active</h3>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px", flexWrap: "wrap" }}>
        {/* Form Section */}
        <div style={{ backgroundColor: "#18181b", padding: "24px", borderRadius: "12px", border: "1px solid #27272a", height: "fit-content" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Add New Movie</h3>
          <form onSubmit={handleAddMovie} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", color: "#a1a1aa", fontSize: "13px", marginBottom: "6px" }}>Movie Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Dune: Part Two"
                style={{ width: "100%", padding: "10px", borderRadius: "6px", backgroundColor: "#27272a", border: "1px solid #3f3f46", color: "#fff", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#a1a1aa", fontSize: "13px", marginBottom: "6px" }}>Genre</label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="e.g. Action / Sci-Fi"
                style={{ width: "100%", padding: "10px", borderRadius: "6px", backgroundColor: "#27272a", border: "1px solid #3f3f46", color: "#fff", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#a1a1aa", fontSize: "13px", marginBottom: "6px" }}>Ticket Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 300"
                style={{ width: "100%", padding: "10px", borderRadius: "6px", backgroundColor: "#27272a", border: "1px solid #3f3f46", color: "#fff", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#a1a1aa", fontSize: "13px", marginBottom: "6px" }}>Poster Image URL</label>
              <input
                type="text"
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                placeholder="https://..."
                style={{ width: "100%", padding: "10px", borderRadius: "6px", backgroundColor: "#27272a", border: "1px solid #3f3f46", color: "#fff", outline: "none" }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: "10px",
                padding: "12px",
                backgroundColor: "#e11d48",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              + Add Movie
            </button>
          </form>
        </div>

        {/* Movie Inventory Table */}
        <div style={{ backgroundColor: "#18181b", padding: "24px", borderRadius: "12px", border: "1px solid #27272a" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Current Movie Catalog</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #27272a", color: "#a1a1aa", fontSize: "14px" }}>
                  <th style={{ padding: "12px 8px" }}>Movie</th>
                  <th style={{ padding: "12px 8px" }}>Genre</th>
                  <th style={{ padding: "12px 8px" }}>Price</th>
                  <th style={{ padding: "12px 8px", textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} style={{ borderBottom: "1px solid #27272a" }}>
                    <td style={{ padding: "12px 8px", fontWeight: "600" }}>{movie.title}</td>
                    <td style={{ padding: "12px 8px", color: "#a1a1aa", fontSize: "14px" }}>{movie.genre}</td>
                    <td style={{ padding: "12px 8px", color: "#e11d48", fontWeight: "600" }}>₹{movie.price || 250}</td>
                    <td style={{ padding: "12px 8px", textAlign: "right" }}>
                      <button
                        onClick={() => handleDeleteMovie(movie.id)}
                        style={{
                          backgroundColor: "#ef4444",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;