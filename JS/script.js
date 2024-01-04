// déclarer le clé API et l'URL des données
const apiKey = "49d8120fcfd33741453d50aa5c39c635"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather"

// Déclarer les éléments
const locationInput = document.getElementById("locationInput")
const searchButton = document.getElementById("searchButton")
const weatherInfos = document.querySelector(".weather-info")
const locationElement = document.getElementById("location")
const temperatureElement = document.getElementById("temperature")
const descriptionElement = document.getElementById("description")

// Déclarer la fonction fetch de recherce de la météo de la ville
function fetchMeteo(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`

    fetch(url)
        .then(response => response.json()) // transformer la réponse en format json
        .then(data => {
            locationElement.textContent = data.name
            temperatureElement.textContent = `${Math.round(data.main.temp)} +°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error("Erreur dans la récupération des données", error)
            weatherInfos.innerText = "Veuillez rentrer correctement le nom de la ville";
        });
}

function rechercheVille() {
    const location = locationInput.value;
    if (location) { // Si location = true alors j'applique la fonction fetchMeteo avec la ville en paramètre
        fetchMeteo(location)
    }
};

searchButton.addEventListener("click", rechercheVille); // rechercher au click du boutton
locationInput.addEventListener("keyup", function (event) { // rechercher avec la touche entrée
    if (event.key === "Enter") {
        rechercheVille();
    }
});