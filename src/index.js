import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;


const inputListener = document.getElementById("search-box");
const delayFetch = debounce(() => { if (inputListener.value.trim()) {fetchCountries(inputListener.value)}}, DEBOUNCE_DELAY) ;
inputListener.addEventListener("input", () => {
  delayFetch();
});

