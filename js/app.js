const container = document.querySelector(".info-container");
const form = document.querySelector("form");

const request = (countryName) => {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((info) => info.json())
    .then((data) => {
      const country = data[0];

      const template = document.getElementById("country-template");
      const countryCard = template.content.cloneNode(true);

      countryCard.querySelector("#country-flag").src = country.flags.svg;
      countryCard.querySelector(
        "#country-flag"
      ).alt = `${country.name.official} flag`;
      countryCard.querySelector("#country-name").textContent =
        country.name.official;
      countryCard.querySelector("#country-capital").textContent =
        country.capital;
      countryCard.querySelector("#country-population").textContent =
        country.population.toLocaleString();
      countryCard.querySelector("#country-borders").textContent =
        country.borders;
      countryCard.querySelector("#country-continent").textContent =
        country.continents;

      document.getElementById("container").innerHTML = "";
      document.getElementById("container").appendChild(countryCard);
    })
    .catch((error) => console.error("Error:", error));
};

// const request = (countryName) => {
//     fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//         .then((info) => {
//             return info.json();
//         })
//         .then((data) => {
//             const country = data[0];
//             container.innerHTML = `
//         <img src=${country.flags.svg} alt=""/>
//         <h2>${country.name.official} </h2>
//         <p>Capital: ${country.capital}</p>
//         <p>Population: ${country.population}</p>
//         `;
//         })
//         .catch();
// };

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = form.search.value;
  if (!searchInput) {
    alert("Please, write country name");
    return;
  }
  request(searchInput);
  form.reset();
});
