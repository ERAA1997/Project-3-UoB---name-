
url = "https://raw.githubusercontent.com/ERAA1997/Project-3-UoB--Glasgow-Housing-Association-Properties/main/glasgow-postcodes.json"


// function barchart(sample) {
//     d3.json(url).then((data) => {
//         let entireData = data.features;
//         let barX = entireData.filter(sampleObj => sampleObj.id === sample);
//         let emptyArray = barX[0];

//         let yaxis = emptyArray.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()

//         let trace1 = {
//             x: emptyArray.sample_values.slice(0, 10).reverse(),
//             y: yaxis,
//             type: 'bar',
//             orientation: 'h',
//         };

//         let data1 = [trace1];

//         Plotly.newPlot('bar', data1);
//     });
// }
function changePostCode() {

    var selPostCode = d3.select("#selDataset").property("value");

    d3.json(url).then((data) => {

        var postcode = data.map();

        for (i in postcode) {

            if (postcode[i].name === selPostCode) {
        

        let HP = data.features.properties.HA_Properties;
        let OP = data.features.properties.Other_Properties;
        console.log(HP);
        var data = [{
            labels: ['HA_Properties', 'Other_Properties'],
            values: [HP, OP],
            type: 'pie',
            textinfo: 'percent'
        }];

 
      
    Plotly.newPlot('myDiv', data, layout);
            }
        }
    });
};


function init() {
    let selection = d3.select("#selDataset");

    d3.json(url).then((data) => {
        let names = data.features.map(feature => feature.properties.name);
        console.log(names);

        var data = [{
            values: [548,5004],
            labels: ['HA_Properties', 'Other_Properties'],
            type: 'pie'
          }];
          
          var layout = {
            height: 700,
            width: 700
          };
          
          Plotly.newPlot('Pie', data, layout);

        names.forEach(element => {
            selection.append("option").attr("value", element).text(element);
        });

        let firstPostcode = names[0];
        barchart(firstPostcode);
    });
}

init();