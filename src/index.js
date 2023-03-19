import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const fetchBtn = document.querySelector(".btn");

fetchUsersBtn.addEventListener("click", () => {
  fetchCountries("po")
});

function fetchCountries(name){
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      console.log(response.json);
      return response.json();
    }
  );
}

