import Notiflix from 'notiflix';
export default function fetchCountries(name) {
    const myList = document.querySelector("ul");
    const myDiv = document.querySelector("div");
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    fetch(`https://restcountries.com/v3.1/name/${name.trim()}?fields=capital,name,population,flags,languages`, requestOptions)
      .then(response => {if (response.status === 404){ Notiflix.Notify.failure("Oops, there is no country with that name"); throw response.status} else return response;  })  
      .then(response => response.json())
      .then((data) => {
        myList.innerHTML = "";
        myDiv.innerHTML = "";
        if (Object.keys(data).length > 10) { Notiflix.Notify.info('Too many matches found. Please enter a more specific name.') ;}
        else if (Object.keys(data).length < 11 && Object.keys(data).length > 1) {
          for (const country of data) {
            const listItem = document.createElement("li");
            const nameElement = document.createElement("h1");
            nameElement.textContent = country.name.official;
  
            const imgElement = document.createElement("img");
            imgElement.src = country.flags.svg;
            imgElement.style.width = '23px';
            imgElement.style.height = '15px';
  
            listItem.append(
              imgElement, nameElement.textContent
            );
            myList.appendChild(listItem);
          }
        } else if (Object.keys(data).length === 1){
          const country = data[0];
          var listItem = document.createElement("div");
          const nameElement = document.createElement("h1");
          const popElement = document.createElement("div");
          const langElement = document.createElement("div");
          const imgElement = document.createElement("img");
          const capitalElement = document.createElement("div");
  
          nameElement.innerText = country.name.official;
  
          imgElement.src = country.flags.png;
          imgElement.style.width = '46px';
          imgElement.style.height = '30px';
  
          capitalElement.innerHTML = `<b>Capital:</b> ` + `${country.capital}`;
          popElement.innerHTML = `<b>Population:</b> ` + `${country.population}`;
          langElement.innerHTML = `<b>Languages:</b> ` + Object.values(country.languages);
  
          myDiv.append(
            imgElement, nameElement.textContent,
          );
          listItem.append(capitalElement);
          listItem.append(popElement);
          listItem.append(langElement);
          myDiv.appendChild(listItem);
        }
      })
      .catch(error => {if (error != 404) Notiflix.Notify.failure(`Oops, there is an error: ${error}`)})
  }
  
  