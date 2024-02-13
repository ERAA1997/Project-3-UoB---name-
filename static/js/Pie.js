
url = "https://raw.githubusercontent.com/ERAA1997/Project-3-UoB--Glasgow-Housing-Association-Properties/main/merged_data.geojson"


function init() {
    let selection = d3.select("#selDataset");

    d3.json(url).then((data) => {
        
        let feats = data.features.map(feature => feature);
        postCode = feats[0].properties.name
        //console.log(feats[0].properties.HA_Properties);

        let names = data.features.map(feature => feature.properties.name);
        //console.log(names);

        var data = [{
            values: [feats[0].properties.HA_Properties, feats[0].properties.Other_Properties],
            labels: ['HA_Properties', 'Other_Properties'],
            type: 'pie'
          }];
          
          var layout = {
            title: postCode + "postcode breakdown",
            height: 700,
            width: 700
          };
          
          Plotly.newPlot('Pie', data, layout);

        names.forEach(element => {
            selection.append("option").attr("value", element).text(element);
        });

        let firstPostcode = names[0];
        
    });
};

d3.selectAll("selDataset").on("change", changePostCode);

function changePostCode() {

    let selPostCode = d3.select("#selDataset").property("value");

    let text_title = selPostCode + " postcode breakdown";

    d3.json(url).then((data) => {

        let feats = data.features.map(feature => feature);
        for (i in feats) {
            if (feats[i].properties.name === selPostCode) {
                console.log(feats[i].properties.HA_Properties);
                var newval = [feats[i].properties.HA_Properties, feats[i].properties.Other_Properties];
            }
        }

        Plotly.relayout('Pie', "title", text_title);
        Plotly.restyle('Pie', "values", [newval]);
         
    });

};

init();