// Creating the map

let myMap = L.map("map", {
    center: [55.858, -4.278],
    zoom: 7
});

// Adding the tile layer to myMap

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Load geoJSON

let url

// use d3 to get the data

d3.json(url).then(function(data)) {



// Define the colour scale (Orange to Blue for colourblind inclusivity)

    scale: ["#F17720", "#0474BA"]



