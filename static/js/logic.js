var glasgowCoordinates = [55.86559, -4.26029];


var map = L.map('map').setView(glasgowCoordinates, 11);

// Adjusted tile URL pattern
var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


L.tileLayer(tileUrl, {
    attribution: '© OpenStreetMap contributors',
}).addTo(map);


let url = 'https://raw.githubusercontent.com/ERAA1997/Project-3-UoB--Glasgow-Housing-Association-Properties/main/merged_data.geojson'
// Fetch GeoJSON data
d3.json(url).then(function(data) {
    
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
            var formattedPercentage = (feature.properties.HA_Percentage).toFixed(2) + '%';
            layer.bindPopup("<b>Area:" + feature.properties.name + "</b><br> Percentage Owned by Housing Agency:" + formattedPercentage);
        }
    }).addTo(map);
});

// Legend
var legend = L.control({ position: 'topright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [5, 10, 15, 20, 25, 30, 35, 40, 45],
        labels = [],
        from, to;

    // loop through and generate a label with a colour for each interval
    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

// Add legend to map
legend.addTo(map);

// Function to get color based on HA_Percentage
function getColor(d) {
    return d > 45 ? '#b10026' :
           d > 40 ? '#e31a1c' :
           d > 35 ? '#fc4e2a' :
           d > 30 ? '#fd8d3c' :
           d > 25 ? '#feb24c' :
           d > 20 ? '#fed976' :
           d > 15 ? '#ffeda0' :
           d > 10 ? '#fffeda' :
           d > 5 ? '#ffffb2' :
                   '#ffffff';
}