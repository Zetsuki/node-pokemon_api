// Simple use of the api using pure js

// Step 1 : "Hello, Heroku ! "
fetch("https://still-oasis-52027-7f184b2c3b28.herokuapp.com/")
  .then((res) => res.json())
  .then((res) => console.log(res));

// Step 2 : "Get JWT token "
fetch("https://still-oasis-52027-7f184b2c3b28.herokuapp.com/api/login", {
  method: "POST",
  body: JSON.stringify({ username: "pikachu", password: "pikachu" }),
  headers: { "Content-type": "application/json" }
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    return res.token;
  })
  .then((token) => fetchPokemonlist(token));

// Step 3 : "Get pokemon list "
const fetchPokemonlist = (token) => {
  fetch("https://still-oasis-52027-7f184b2c3b28.herokuapp.com/api/pokemons", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};