
import { useState } from "react";
import "./App.css";

const movies = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi", price: 250, image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { id: 2, title: "Inception", genre: "Action", price: 220, image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" },
  { id: 3, title: "The Batman", genre: "Thriller", price: 200, image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
  { id: 4, title: "Dune: Part Two", genre: "Adventure", price: 280, image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
  { id: 5, title: "Joker", genre: "Drama", price: 230, image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" },
  { id: 6, title: "Avatar", genre: "Fantasy", price: 260, image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" }
];

export default function App() {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState(null);
  const [time, setTime] = useState("18:00");
  const [seats, setSeats] = useState([]);
  const [confirmation, setConfirmation] = useState("");

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  function toggleSeat(seat) {
    setSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  }

  function bookTicket() {
    if (!seats.length) {
      alert("Please select at least one seat.");
      return;
    }
    setConfirmation(
      `Booking preview: ${movie.title} | ${time} | Seats: ${seats.join(", ")} | Total: ₹${seats.length * movie.price}`
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#">iMovies<span>.</span></a>
        <nav>
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-btn" href="#movies">Book Tickets</a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-text">
            <p className="tag">YOUR CINEMA, YOUR EXPERIENCE</p>
            <h1>Every Story<br />Starts <span>Here.</span></h1>
            <p className="description">
              Discover your favourite movies, choose your seats,
              and make every movie night unforgettable.
            </p>
            <a className="primary-btn" href="#movies">Explore Movies →</a>
          </div>
          <img
            className="hero-image"
            src={movies[0].image}
            alt="Featured movie"
          />
        </section>

        <section className="movies-section" id="movies">
          <div className="section-title">
            <div>
              <p className="tag">NOW PLAYING</p>
              <h2>Popular Movies</h2>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              aria-label="Search movies"
            />
          </div>

          <div className="movie-grid">
            {filtered.map((m) => (
              <article className="movie-card" key={m.id}>
                <img src={m.image} alt={m.title} />
                <div className="movie-info">
                  <h3>{m.title}</h3>
                  <p>{m.genre}</p>
                  <div className="movie-bottom">
                    <strong>₹{m.price}</strong>
                    <button onClick={() => {
                      setMovie(m);
                      setSeats([]);
                      setConfirmation("");
                    }}>
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && <p>No movies found.</p>}
        </section>

        <section className="features">
          <h2>Your Movie Night, Made Easy</h2>
          <div className="feature-grid">
            <div><span>🎬</span><h3>Latest Movies</h3><p>Explore your favourites.</p></div>
            <div><span>💺</span><h3>Choose Your Seats</h3><p>Select seats you prefer.</p></div>
            <div><span>🎟️</span><h3>Easy Booking</h3><p>Preview your ticket details.</p></div>
          </div>
        </section>
      </main>

      <footer id="about">
        <a className="logo" href="#">iMovies<span>.</span></a>
        <p>Your next movie experience starts here.</p>
        <small>© 2026 iMovies Movie Ticket Booking System</small>
      </footer>

      {movie && (
        <div className="overlay" onClick={() => setMovie(null)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setMovie(null)}>×</button>
            <p className="tag">RESERVE YOUR SEATS</p>
            <h2>{movie.title}</h2>
            <p>{movie.genre} · ₹{movie.price} per seat</p>

            <label htmlFor="showtime">Showtime</label>
            <select id="showtime" value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="10:00">10:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>

            <p className="seat-heading">Choose seats</p>
            <div className="screen">SCREEN</div>
            <div className="seat-grid">
              {Array.from({ length: 24 }, (_, i) => {
                const seat = ` ${String.fromCharCode(65 + Math.floor(i / 6))}${(i % 6) + 1}`.trim();
                return (
                  <button
                    key={seat}
                    className={seats.includes(seat) ? "seat selected" : "seat"}
                    onClick={() => toggleSeat(seat)}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>

            <p>Total: <strong>₹{seats.length * movie.price}</strong></p>
            <button className="primary-btn confirm-btn" onClick={bookTicket}>
              Confirm Booking
            </button>
            {confirmation && <p className="confirmation">{confirmation}</p>}
            <small>This is a demo. Real bookings require a backend and database.</small>
          </div>
        </div>
      )}
    </div>
  );
}
