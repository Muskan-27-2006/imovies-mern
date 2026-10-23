import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const defaultMoviesList = [
  { id: "1", title: "Kalki 2898 AD", genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80" },
  { id: "2", title: "Inception", genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80" },
  { id: "3", title: "Interstellar", genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" },
  { id: "4", title: "The Dark Knight", genre: "Action", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80" },
  { id: "5", title: "Avatar: The Way of Water", genre: "Adventure", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
  { id: "6", title: "Oppenheimer", genre: "Biography", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80" },
  { id: "7", title: "Avengers: Endgame", genre: "Action", poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80" },
  { id: "8", title: "Spider-Man: Across the Spider-Verse", genre: "Animation", poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80" },
  { id: "9", title: "Dune: Part Two", genre: "Sci-Fi", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80" },
  { id: "10", title: "Gladiator II", genre: "Action", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
  { id: "11", title: "Jawan", genre: "Action", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80" },
  { id: "12", title: "Pathaan", genre: "Action", poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80" },
  { id: "13", title: "Animal", genre: "Action", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80" },
  { id: "14", title: "Stree 2", genre: "Comedy/Horror", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80" },
  { id: "15", title: "The Batman", genre: "Action", poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80" }
];

const ExploreMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies");
        if (res.data && res.data.length > 0) {
          setMovies(res.data);
        } else {
          setMovies(defaultMoviesList);
        }
      } catch (err) {
        setMovies(defaultMoviesList);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div style={{ padding: "40px", color: "#fff", minHeight: "80vh", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>Explore Movies</h2>
      <p style={{ color: "#a1a1aa", marginBottom: "24px" }}>Browse our complete catalog of blockbusters and upcoming releases.</p>

      {/* Search and Genre Filter Header */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search movie by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: "1",
            minWidth: "260px",
            padding: "12px 18px",
            borderRadius: "8px",
            border: "1px solid #3f3f46",
            backgroundColor: "#18181b",
            color: "#fff",
            fontSize: "15px",
            outline: "none"
          }}
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{
            padding: "12px 18px",
            borderRadius: "8px",
            border: "1px solid #3f3f46",
            backgroundColor: "#18181b",
            color: "#fff",
            fontSize: "15px",
            outline: "none",
            cursor: "pointer"
          }}
        >
          <option value="All">All Genres</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Biography">Biography</option>
          <option value="Animation">Animation</option>
        </select>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px", color: "#a1a1aa" }}>
          <p style={{ fontSize: "18px" }}>No movies match your search query.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
          {filteredMovies.map((movie, index) => (
            <div key={movie.id || index} style={{ border: "1px solid #27272a", padding: "16px", borderRadius: "10px", backgroundColor: "#18181b", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                {movie.poster && <img src={movie.poster} alt={movie.title} style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "6px", marginBottom: "12px" }} />}
                <h3 style={{ fontSize: "18px", fontWeight: "600" }}>{movie.title}</h3>
                <p style={{ color: "#a1a1aa", fontSize: "13px", marginTop: "4px" }}>{movie.genre}</p>
              </div>

              <button
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    alert("Please sign in to proceed with booking.");
                    navigate("/login");
                    return;
                  }
                  navigate("/book-tickets");
                }}
                style={{
                  marginTop: "16px",
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#e11d48",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px"
                }}
              >
                Book Tickets
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreMovies;