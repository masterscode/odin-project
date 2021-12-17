window.addEventListener('DOMContentLoaded', initializeMap);
const currentRide = {};

const payload = {
    latitude:0,
    longitude:0,
    time:'', 
    city:'',
    country:'', 
    fullAddress:''
}
let ride = true;
let pickupLocation = {
    latitude:0,
    longitude:0,
    time:'', 
    city:'',
    country:'', 
    fullAddress:''
}

const mapboxToken =
  "pk.eyJ1IjoibWFzdGVyc2NvZGUiLCJhIjoiY2t4N2htdG5pMDIxbzJ2dDh1endpMzNibyJ9.5p1nDNBo3aX93-Lc7IdsOg";
const mapboxEndpoint = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`;
const map = L.map("map");

async function initializeMap() {
       navigator.geolocation.getCurrentPosition(e=> {
           const lat =  e.coords.latitude;
           const lng = e.coords.longitude;
           map.setView([lat, lng], 10);
        });
}
  
const MAPBOX_OPTIONS = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: mapboxToken,
};

L.tileLayer(mapboxEndpoint, MAPBOX_OPTIONS).addTo(map);


function createMarker(lat, lng, city){
marker = L.marker([lat.toFixed(2), lng.toFixed(2)]).addTo(map)
marker.bindPopup(`<b>${city}</b>`).openPopup();
}

showPickupLocationBox(false);


//https://github.com/perliedman/leaflet-control-geocoder
var geocoder = L.Control.geocoder({placeholder:'Input your location here', keepOpen:true})
.on('markgeocode', function(e) {
    const coords = {latlng: e.geocode.center, name: e.geocode.name}
    console.log(coords);
    const{fullAddress, city, country} = getName(coords.name);
    payload.longitude = coords.latlng.lng;
    payload.latitude = coords.latlng.lat;
    payload.city = city;
    payload.country = country;
    payload.fullAddress = fullAddress;

    showPickupLocationBox(true)
    createMarker(coords.latlng.lng, coords.latlng.lat, city);
    setPickupLocation();
    populatePickupFields();


}).addTo(map);


function setPickupLocation(){
    pickupLocation = payload;
}

function showPickupLocationBox(show){
    if(show)document.getElementById('pick-up-box').style.display = 'block';
    if(!show)document.getElementById('pick-up-box').style.display = 'none';
}
function populatePickupFields(){
    const  fullAddressInput = document.getElementById('pick-up-address');
    const  cityInput = document.getElementById('pick-up-city');

    fullAddressInput.value = pickupLocation.fullAddress;
    cityInput.value = pickupLocation.city;
}


function getName(label){
    const parts = label.split(',');
    const fullAddress = label;
    let city = parts[0] + parts[1];
    const country = parts[parts.length - 1];
    return{fullAddress, city, country};
}
