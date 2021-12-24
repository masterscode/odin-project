document.addEventListener("DOMContentLoaded", (e) => getLocation());
//use L.marker to check for location name
var currentPosition = {
  latitude: 0,
  longitude: 0,
};
const mapboxToken =
  "pk.eyJ1IjoibWFzdGVyc2NvZGUiLCJhIjoiY2t4N2htdG5pMDIxbzJ2dDh1endpMzNibyJ9.5p1nDNBo3aX93-Lc7IdsOg";
const mapboxEndpoint = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function setPosition(position) {
  currentPosition.longitude = position.coords.longitude;
  currentPosition.latitude = position.coords.latitude;
}

function getMapView() {
  return {
    latitude: (currentPosition.latitude + 0.5).toFixed(2),
    longitude: (currentPosition.longitude + 1.5).toFixed(2),
  };
}
const { latitude, longitude } = getMapView();
const viewArea = [latitude, longitude];

var map = L.map("map").setView([latitude, longitude], 7);
// let startMarker = L.layerGroup();
const LOCATE_OPTIONS = {
  enableHighAccuracy: true,
  showCompass: true,
  maxZoom: 1200,
  position: "topright",
  // layer: startMarker,
  drawCircle: true,
  showPopup: true,
  markerClass: L.marker,
};

L.control.locate(LOCATE_OPTIONS).addTo(map);
// L.Control.geocoder().addTo(map);
map.locate();



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


// let marker = L.marker([0, 0]).addTo(map);

function customizeMarker(lat, lng){
marker = L.marker([lat, lng]).addTo(map)
marker.bindPopup(`
            <div style='text-align:center'>
                    <b>city</b>
                    <br>
                    <i>country</>
            </div>
            `).openPopup();
}


map.on('click', function(e){
    var {lat, lng} = e.latlng;
  //  customizeMarker(lat, lng);

    });
// https://gis.stackexchange.com/a/210102
map.on('locationfound', e=> {
    // customizeMarker(e.latlng.lat, e.latlng.lng)
    // console.log(map);
})

// geocoder




