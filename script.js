const API_BASE_URL = 'http://localhost:3000';
const CHARACTERS_ENDPOINT = "films"

document.addEventListener('DOMContentLoaded', () => {
  const filmsList = document.getElementById('films');
  const movieDetails = document.querySelector('.movie-details');
  const poster = document.getElementById('poster');
  const title = document.getElementById('title');
  const runtime = document.getElementById('runtime');
  const showtime = document.getElementById('showtime');
  const availableTicketsElement = document.getElementById('available-tickets');
  const buyTicketBtn = document.getElementById('buy-ticket');

// function to display the movie details
function displayMovieDetails(movie) {
  const poster = document.querySelector('#poster');
  const title = document.querySelector('#title');
  const runtime = document.querySelector('#runtime');
  const showtime = document.querySelector('#showtime');
  const availableTickets = document.querySelector('#available-tickets');
  const description = document.querySelector('#movie-details p:last-of-type');

  // update the movie details in the DOM with the data from the movie object
  poster.src = movie.poster;
  title.textContent = movie.title;
  runtime.textContent = `Runtime: ${movie.runtime} Min`;
  showtime.textContent = `Showtime: ${movie.showtime}`;
  availableTickets.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
  description.textContent = movie.description;

}


fetch('db.json')
  .then(response => response.json())
  .then(data => {
    // extract the films array from the data
    const films = data.films;
    const filmsList = document.querySelector('#films');

    // loop through the films array and create a list item for each movie title
    for (let i = 0; i < films.length; i++) {
      const movie = films[i];
      const listItem = document.createElement('li');
      listItem.textContent = movie.title;
      filmsList.appendChild(listItem);

      // add an event listener to display the movie details when the movie title is clicked
      listItem.addEventListener('click', () => {
        displayMovieDetails(movie);
      });
    }

    // display the details of the first movie by default
    displayMovieDetails(films[0]);
  })
  .catch(error => console.error(error));

  // Initialize the available tickets count
  let availableTickets = 20;

  // Update the available tickets count on the frontend
  availableTicketsElement.textContent = ` Available Tickets: ${availableTickets} `;
  
  buyTicketBtn.addEventListener('click', () => {
    if (availableTickets > 0) {
      availableTickets--;
      availableTicketsElement.textContent = ` Available Tickets: ${availableTickets} `;
      if (availableTickets ===0) {
        buyTicketBtn.disabled = true;
      }
    }
  })
   
  });  

