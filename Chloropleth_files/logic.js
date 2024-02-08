var glasgowCoordinates = [55.86559, -4.26029];


var map = L.map('map').setView(glasgowCoordinates, 13);

// Adjusted tile URL pattern
var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


L.tileLayer(tileUrl, {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


let url = 'https://raw.githubusercontent.com/ERAA1997/Project-3-UoB--Glasgow-Housing-Association-Properties/main/merged_data.geojson'
// Fetch GeoJSON data
d3.json(url).then(function(data) {
    
    // data.features.forEach(function (feature) {
    //     var coordinates = feature.geometry.coordinates[0].map(function (coord) {
    //         return [coord[1], coord[0]];
    //     });
    //     feature.geometry.coordinates[0] = coordinates;
    // });

    // Add GeoJSON layer to Leaflet map
    let geojson = L.choropleth(data, {

        // Define which property in the features to use.
        valueProperty: "HA_Percentage",
    
        // Set the color scale.
        scale: ["#ffffb2", "#b10026"],
    
        // The number of breaks in the step range
        steps: 10,
    
        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },

        // Popup information
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<b>" + feature.properties.name + "</b><br>" + feature.properties.description);
        }
    }).addTo(map);
});

// Function to determine color based on feature index
function getColor(index) {
    
    var colors = ['green', 'blue', 'red', 'orange', 'purple'];  // Example colors
    return colors[index % colors.length];
};
