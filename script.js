document.getElementById('searchButton').addEventListener('click', searchMovies); // Haremos un callback de la función searchMovies para que se ejecute cuando se haga click

let api_key = 'b87f79eafc0f45db24d17c89da13c057'; // Metemos la clave API en variable
let url = 'https://api.themoviedb.org/3/search/movie'; // Metemos la URL de la API en variable
let urlImg = 'https://image.tmdb.org/t/p/w500'; // Metemos la URL de la imagen en variable

function searchMovies() {
    let searchInput = document.getElementById('searchInput').value; // Recogerá el valor que se escriba

    fetch(`${url}?api_key=${api_key}&query=${searchInput}`) // Recogerá la URL con la clave API y el valor que escribamos
        .then(response => response.json())
        .then(response => displayMovies(response))
        .catch(error => console.error('Error fetching movies:', error));
}

// Recogemos los datos de la película y los mostramos en pantalla
function displayMovies(movies) {
    let results = document.getElementById('results');
    results.innerHTML = ''; // Limpiamos los resultados anteriores, no el formulario

    if (movies.results.length === 0) {
        results.innerHTML = 'No se encontraron resultados';
        return;
    }

    movies.results.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        let title = document.createElement('h2');
        title.textContent = movie.title;

        let releaseDate = document.createElement('p');
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let posterPath = movie.poster_path ? urlImg + movie.poster_path : 'placeholder.jpg';

        let poster = document.createElement('img');
        poster.src = posterPath;
        poster.alt = `Poster de ${movie.title}`;

        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);
        movieDiv.appendChild(poster);

        results.appendChild(movieDiv);
    });
}
