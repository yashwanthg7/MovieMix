const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector(".search");
const searchButton = document.querySelector(".search-btn");

const apiKey = 'c47a2204';
const moviesPerPage = 10;
let totalMovies = 128;
let searchTerm = "";

async function fetchMovies() {
    const allMovies = [];

    let page = 1;
    let totalPages = Math.ceil(totalMovies / moviesPerPage);

    while (page <= totalPages) {

        const response = await fetch(`https://www.omdbapi.com/?s=movie&apikey=${apiKey}&page=${page}`);
        const data = await response.json();

        if (data.Response === "True") {
            allMovies.push(...data.Search);
        } else {
            console.error(`Error fetching movies from page ${page}: ${data.Error}`);
        }

        page++;
    }
    return allMovies.slice(0, totalMovies);
}

function createMovieCard(movie) {
    const card = document.createElement('article');
    card.id = movie.imdbID;
    card.classList.add('card');

    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = movie.Poster;
    img.alt = movie.Title;
    img.style.width = "100%";

    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `<h3>${movie.Title}</h3>`;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    card.appendChild(figure);
    return card;
}

async function displayMovies() {
    if (searchTerm.length === 0) {
        if (gallery.firstChild) {
            gallery.removeChild.firstChild;
        }
        const movies = await fetchMovies();

        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            gallery.appendChild(movieCard);
        });
    }
    if (searchTerm.length > 0 && searchTerm.length < 3) {
        console.log("increase")
        const divElement = document.createElement('div');
        divElement.innerText = "Please enter 3 or more characters...";
        divElement.style.marginTop = "0px"
        gallery.appendChild(divElement)
    }
    if (searchTerm.length > 3) {
        if (gallery.firstChild) {
            gallery.removeChild.firstChild;
        }
        const movies = await fetchSearchedMovies(searchTerm);

        movies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            gallery.appendChild(movieCard);
        });
    }

}

displayMovies();


searchInput.addEventListener("input", async () => {
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
    searchTerm = searchInput.value;
    displayMovies();
});



async function fetchSearchedMovies(searchTerm) {
    const allMovies = [];

    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === "True") {
        console.log(data.Search)
        allMovies.push(...data.Search);
    } else {
        console.error(`Error fetching movies: ${data.Error}`);
    }

    return allMovies;
}

// https://www.omdbapi.com/?i=tt3214002&apikey=c47a2204

function checkAuth() {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      return true;
    } else {
      return false;
    }
  }

checkAuth();