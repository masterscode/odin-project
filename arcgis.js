// esriConfig.apiKey = "AAPK3c53bb79d06b45cda435c5145b583e40u4bVLkFF8To-wqRfbXkfZrMuoFmUYDX7uFxyvs73ki2ZFKgUxHGOrke12a8kW59Z";
let apiKey = "AAPK3c53bb79d06b45cda435c5145b583e40u4bVLkFF8To-wqRfbXkfZrMuoFmUYDX7uFxyvs73ki2ZFKgUxHGOrke12a8kW59Z";

var searchControl = L.esri.Geocoding.geosearch({
    position: 'topright',
    placeholder: 'Enter an address or place e.g. 1 York St',
    useMapBounds: false,
    providers: [L.esri.Geocoding.arcgisOnlineProvider({
      apikey: apiKey, // replace with your api key - https://developers.arcgis.com
      nearby: {
        lat: -33.8688,
        lng: 151.2093
      }
    })]
  }).addTo(map);

  var results = L.layerGroup().addTo(map);