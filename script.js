const Api_Personal_key = `aa7f671d53af20c87cf557c4460446b3`;
const Get_most_popular_movies_api = `https://api.themoviedb.org/3/discover/movie?api_key=${Api_Personal_key}
&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

const search_for_movie_api_part1 = `
https://api.themoviedb.org/3/search/movie?api_key=${Api_Personal_key}&language=en-US&query=`;
const search_for_movie_api_part2 = `&page=1&include_adult=false`;

const base_url_for_images=`https://image.tmdb.org/t/p/w500`
const search_field = document.getElementById("search");
const form = document.getElementById("form");

const movies_container = document.getElementById("movies_container");

Get_movies(Get_most_popular_movies_api);

//handling the search bar
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search_field.value && search_field.value.trim() !== " ") {
    search_for_movie(search_field.value);
  }
});

function insert_movies_into_dom(movies) {
  movies_container.innerHTML = " ";
  movies.forEach((movie) => {
    const movie_el = document.createElement("div");
    movie_el.classList.add("movie");
    movie_el.innerHTML = `
    <img src="${base_url_for_images}${movie.poster_path}" alt="${movie.title}" />
    <div class="title_container">
      <p class="title">${movie.title}</p>
      <span class="rate ${decide_class_on_rate(movie.vote_average)}">${
      movie.vote_average.toFixed(1)
    }</span>
    </div>
    <div class="overView_container">
      <h2>OverView</h2>
      <div class="overView_content">
       ${movie.overview}
      </div>
    </div>`;
    movies_container.appendChild(movie_el);
  });
}

function decide_class_on_rate(rate) {
  if (rate >= 8) return "high";
  else if (rate > 5) return "mid";
  else return "low";
}

async function Get_movies(url) {
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  insert_movies_into_dom(data.results);
}

function search_for_movie(movieName) {
  const full_search_url = `${search_for_movie_api_part1}${movieName}${search_for_movie_api_part2}`;
  Get_movies(full_search_url);
}
