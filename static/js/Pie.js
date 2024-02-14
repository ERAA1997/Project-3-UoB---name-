function fetchData(url, callback) {
    d3.json(url).then((data) => callback(data));
}

function init() {
    let selection = d3.select("#selDataset");

    // Updated URL to fetch from Flask route
    fetchData("/data/geojson", (data) => {
        let feats = data.features.map(feature => feature);
        let postCode = feats[0].properties.name;

        let names = data.features.map(feature => feature.properties.name);

        var data = [{
            values: [feats[0].properties.HA_Properties, feats[0].properties.Other_Properties],
            labels: ['HA_Properties', 'Other_Properties'],
            type: 'pie'
        }];

        var layout = {
            title: postCode + " postcode breakdown",
            height: 700,
            width: 700
        };

        Plotly.newPlot('Pie', data, layout);

        names.forEach(element => {
            selection.append("option").attr("value", element).text(element);
        });
    });
}

function changePostCode(selectedPostCode) {
    let text_title = selectedPostCode + " postcode breakdown";

    // Fetch data again from Flask route
    fetchData("/data/geojson", (data) => {
        let feats = data.features.map(feature => feature);
        let newval;
        for (i in feats) {
            if (feats[i].properties.name === selectedPostCode) {
                newval = [feats[i].properties.HA_Properties, feats[i].properties.Other_Properties];
                break;
            }
        }

        Plotly.relayout('Pie', {title: text_title});
        Plotly.restyle('Pie', "values", [newval]);
    });
}

// Call init to load the data and populate the pie chart initially
init();
