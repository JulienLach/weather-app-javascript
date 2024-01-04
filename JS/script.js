// déclarer le clé API et l'URL des données
const apiKey = "49d8120fcfd33741453d50aa5c39c635"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather"

// Déclarer les éléments
const locationInput = document.getElementById("locationInput")
const searchButton = document.getElementById("searchButton")
const locationElement = document.getElementById("location")
const weatherInfos = document.querySelector(".weather-info")
const temperatureElement = document.getElementById("temperature")
const descriptionElement = document.getElementById("description")
const humidityElement = document.getElementById("humidity")
const windElement = document.getElementById("wind")
const notFoundImg = document.getElementById("not-found-img")
const imageElement = document.getElementById("image")

// Déclarer la fonction fetch de recherce de la météo de la ville
function fetchMeteo(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)} °C`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = "Humidity " + data.main.humidity + "%";
            windElement.textContent = `Wind speed ${parseInt(data.wind.speed)} km/h`;

            // affichage de l'image en fonction de la data weather
            switch (data.weather[0].main) {
                case 'Clear':
                    imageElement.src = 'img/clear.jpg';
                    break;

                case 'Rain':
                    imageElement.src = 'img/rain.png';
                    break;

                case 'Clouds':
                    imageElement.src = 'img/cloud.png';
                    break

                case 'Snow':
                    imageElement.src = 'img/snow.png'
                    break

                case 'Haze':
                    imageElement.src = 'img/mist.png';
                    break;

                default:
                    imageElement.src = '';
            }
        })
        .catch(error => {
            console.error("Erreur dans la récupération des données", error);
            weatherInfos.innerText = "Oups ! La ville n'a pas été trouvée";
            notFoundImg.classList.add("active");
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