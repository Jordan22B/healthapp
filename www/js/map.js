// On initialise la latitude et la longitude de Paris (centre de la carte)
var lat = 48.852969;
var lon = 2.349903;
var map = null;
var position;

var x = document.getElementById("demo");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(initMap); 
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}

// Fonction d'initialisation de la carte
function initMap(position) {
   lat = position.coords.latitude;
  lon = position.coords.longitude;
   
  // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
  map = L.map('map').setView([lat, lon], 11);
  // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    // Il est toujours bien de laisser le lien vers la source des données
    attribution: '© OSM',
    minZoom: 1,
    maxZoom: 20
  }).addTo(map);
  
  var marker = L.marker([lat, lon]).addTo(map);
}