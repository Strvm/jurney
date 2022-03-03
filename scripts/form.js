const api_key = "AIzaSyCU7YCNbz_1znk7ha6WYd9BbrQPJ5mT-kE"
let place = "Paris"
const form = document.querySelector('.form')

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
    // const map = new google.maps.Map(document.getElementById("map"), {
    //     center: { lat: 50.064192, lng: -130.605469 },
    //     zoom: 3,
    // });

    // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    const center = { lat: 50.064192, lng: -130.605469 };
    // Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
    };
    const input = document.querySelector(".location");
    const options = {
        bounds: defaultBounds,
        // fields: ["country"],
        strictBounds: false,
        types: ["(regions)"],
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);


    const southwest = { lat: 5.6108, lng: 136.589326 };
    const northeast = { lat: 61.179287, lng: 2.64325 };
    const newBounds = new google.maps.LatLngBounds(southwest, northeast);

    autocomplete.setBounds(newBounds);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);


    autocomplete.addListener("place_changed", () => {
        infowindow.close();
        place = autocomplete.getPlace().name;
        infowindowContent.children["place-icon"].src = place.icon;
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent = address;
    });

    // Sets a listener on a given radio button. The radio buttons specify
    // the countries used to restrict the autocomplete search.


    // setupClickListener("changecountry-usa", "us");
    // setupClickListener("changecountry-usa-and-uot", [
    //     "us",
    //     "pr",
    //     "vi",
    //     "gu",
    //     "mp",
    // ]);
}


types = ["comptabilité", "aéroport", "parc d'attractions", "aquarium", "galerie d'art", "atm", "boulangerie", "banque", "bar", "salon de beauté", "magasin de vélos", "librairie", "bowling", "gare routière", "café", "camping", "vendeur de voitures", "location de voitures", "réparation de voitures", "lavage de voiture", "casino", "cimetière", "église", "mairie hall", "magasin de vêtements", "magasin de proximité", "palais de justice", "dentiste", "magasin", "médecin", "pharmacie", "électricien", "magasin d'électronique", "ambassade", "caserne de pompiers", "fleuriste", "salon funéraire", "magasin de mobilier", "station-service", "salle de sport", "soins capillaires", "quincaillerie", "temple hindou", "magasin de bricolage", "hôpital", "Agence d'assurance", "bijouterie", "blanchisserie", "avocat", "bibliothèque", "station de métro léger", "magasin de boissons alcoolisées", "bureau de l'administration locale", "serrurier", "logement", "livraison de repas", "repas à emporter", "mosquée", "cinéma location", "cinéma théâtre", "entreprise de déménagement", "musée", "boîte de nuit", "peintre", "parc", "parking", "animalerie", "pharmacie", "physiothérapeute", "plombier", "police", "bureau de poste", "école primaire", "agence immobilière", "restaurant", "entreprise de toiture", "parking pour camping-cars", "école", "école secondaire", "magasin de chaussures", "centre commercial", "spa", "stade", "stockage", "magasin", "subway station", "supermarché", "synagogue", "station de taxi", "attraction touristique", "gare", "gare de transit", "agence de voyage", "université", "soins vétérinaires", "zoo"]
const typesContainer = document.querySelector('.typeSearch')
const activitySearch = document.querySelector('.activitySearch')
const chosenActivities = document.querySelector('.chosenActivities')
const nextButton = document.querySelector('.nextButton')
const formQuestion = document.querySelector('.formQuestion')
const daySelector = document.querySelector('.daySelector')
const amountFound = document.querySelector('.amountFound')
const emailInput = document.querySelector('.emailInput')
const mainDiscover = document.querySelector('.mainDiscover')

let wanted = []
let stage = 1
activitySearch.addEventListener('input', (event) =>{
    const value = activitySearch.value.toLowerCase()
    console.log(value)
    matched = []
    removeAllChildNodes(typesContainer)
    needBreak = false
    for (let t of types) {
        if (needBreak)break
        const normalized = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        if (normalized.startsWith(value) || t.startsWith(value)){
            matched.push(t)
            if ( typesContainer.children.length <= 5) {
                const activity = document.createElement("p");
                activity.className = "activityName"
                activity.innerText = t
                typesContainer.appendChild(activity)
                activity.addEventListener("click", (event) =>{
                    activitySearch.value = ""
                    types = types.filter(e => e !== t);
                    activitySearch.style.borderRadius = '50px 50px 50px 50px'
                    typesContainer.style.border = 'none'
                    const chosen = document.createElement("p");
                    chosen.className = "chosenActivity"
                    chosen.innerText = event.target.innerText
                    chosenActivities.appendChild(chosen)
                    wanted.push(event.target.innerText)
                    removeAllChildNodes(typesContainer)
                    needBreak = true
                })
            }
        }
    }
    if (typesContainer.children.length > 0){
        activitySearch.style.borderRadius = '50px 50px 0 0'
        typesContainer.style.border = '#4D61FC 1px solid'
    }else{
        activitySearch.style.borderRadius = '50px 50px 50px 50px'
        typesContainer.style.border = 'none'
    }

})

nextButton.addEventListener("click", (event) =>{
    switch (stage){
        case 1:
            if (wanted.length > 0){
                stage++
                document.body.style.cursor = "wait"
                setTimeout(() =>{
                    document.body.style.cursor = "initial"
                    activitySearch.remove()
                    chosenActivities.remove()
                    typesContainer.remove()
                    formQuestion.innerHTML = `Nombre de jours à <span class=\"blueText\">${place}</span>?`
                    daySelector.style.display = "block"
                }, 1500);
            }
            break
        case 2:
            if (daySelector.value != ""){
                stage++
                document.body.style.cursor = "wait"
                setTimeout(() =>{
                    document.body.style.cursor = "initial"
                    daySelector.remove()
                    // nextButton.remove()
                    formQuestion.innerHTML = `Bonne nouvelle!`
                    formQuestion.style.margin = "0"
                    amountFound.innerHTML = `On vous a trouvé <span class="blueText"><strong>${getRandomInt(10, 30)}</strong></span> trajets à <span class="blueText"><strong>${place}</strong></span> selon vos filtres, venez les découvrir par vous même`
                    amountFound.style.display = "inline"
                    emailInput.style.display = "block"
                    daySelector.style.display = "block"
                }, 1500);
            }
            break
        case 3:
            if (emailInput.value != "" && validateEmail(emailInput.value)){
                location.reload()
            }
            break
    }
})


mainDiscover.addEventListener("click", (event) =>{
    if (place != ""){
        document.body.style.overflow = "hidden"
        formQuestion.innerHTML = `Que voulez vous faire à <span class=\"blueText\">${place}</span>?`
        form.style.display = "block"


    }
})


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};