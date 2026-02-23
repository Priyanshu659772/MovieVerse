const API_KEY = "880ff750";
const movieContainer = document.getElementById("movieContainer");

// Load default movies
loadMovies("avengers");

// Fetch movies from OMDb
function loadMovies(query) {
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        movieContainer.innerHTML = "<p>No movies found</p>";
      }
    })
    .catch(() => {
      movieContainer.innerHTML = "<p>Error loading movies</p>";
    });
}

// Display movie cards
function displayMovies(list) {
  movieContainer.innerHTML = "";

  list.forEach(movie => {
    movieContainer.innerHTML += `
      <div class="movie-card" onclick="openMovie('${movie.imdbID}')">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}">
        <div class="movie-info">
          <h3>${movie.Title}</h3>
          <span>${movie.Year}</span>
        </div>
      </div>
    `;
  });
}

// Open popup with details
function openMovie(id) {
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
    .then(res => res.json())
    .then(movie => openPopup(movie));
}

function openPopup(movie) {
  document.getElementById("popupTitle").innerText = movie.Title;
  document.getElementById("popupImg").src =
    movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300";
  document.getElementById("popupDesc").innerText = movie.Plot;
  document.getElementById("popupRate").innerText = movie.imdbRating;

  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Search
document.getElementById("searchInput").addEventListener("input", function () {
  const q = this.value.trim();
  if (q.length >= 3) {
    loadMovies(q);
  }
});

// Category → keyword search
function filterCategory(cat) {
  loadMovies(cat);

}

