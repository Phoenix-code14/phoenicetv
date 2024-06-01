const searchInput = document.getElementById('search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', async () => {
  const searchQuery = searchInput.value.trim().toLowerCase();
  const response = await fetch('movies.json');
  const movies = await response.json();

  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(searchQuery);
    const characterMatch = movie.characters.some((character) => character.toLowerCase().includes(searchQuery));
    const directorMatch = movie.director.toLowerCase().includes(searchQuery);

    return titleMatch || characterMatch || directorMatch;
  });

  // Display the filtered results
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  filteredMovies.forEach((movie) => {
    const resultHTML = `
      <div>
        <h2>${movie.title}</h2>
        <p>Characters: ${movie.characters.join(', ')}</p>
        <p>Director: ${movie.director}</p>
      </div>
    `;
    resultsContainer.innerHTML += resultHTML;
  });
});