function unpack(rows, index) {
    return rows.map(function(row) {
        //console.log(row.id);
        return row[index];
    });
  }

function fillDropDown(names){
    d3.select("#selDataset")
    .selectAll("option")
    .data(names)
    .enter()
    .append("option")
    .html(x => `${x}`);
}
function showDashboard(subjectId){
    d3.json("samples.json").then((data) => {
        
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;
        
        //var firstElement = samples[0].id;
        var oneSample = samples.filter(element => element.id === subjectId)[0];
        var oneMetadata = metadata.filter(element => element.id === parseInt(subjectId))[0];
        //console.log(names);        

        var sample_values = oneSample.sample_values;
        var sliced_sample_values = sample_values.slice(0,10);

        var otu_ids = oneSample.otu_ids;
        console.log(otu_ids);
        var sliced_otu_ids= otu_ids.map(x => 'OTU '+x).slice(0,10);
        
        var otu_labels = oneSample.otu_labels;
        var sliced_otu_labels = otu_labels.slice(0,10);
        
        fillDropDown(names);
        fillMetaData(oneMetadata);
        barChart(sliced_sample_values, sliced_otu_ids, sliced_otu_labels);
        gaugeChart(oneMetadata.wfreq);
        bubbleChart(otu_ids, sample_values, otu_labels);
    });
}

function fillMetaData(oneMetadata){
    var div = d3.select("#sample-metadata")
    div.html("");
    div.append("p").text(`ID: ${oneMetadata.id}`);
    div.append("p").text(`ETHNICITY: ${oneMetadata.ethnicity}`);
    div.append("p").text(`GENDER: ${oneMetadata.gender}`);
    div.append("p").text(`AGE: ${oneMetadata.age}`);
    div.append("p").text(`LOCATION: ${oneMetadata.location}`);
    div.append("p").text(`BBTYPE: ${oneMetadata.bbtype}`);
    div.append("p").text(`WFREQ: ${oneMetadata.wfreq}`);
}

function barChart(sample_values, otu_ids, otu_labels){
    var data = [{
        type: 'bar',
        x: sample_values.reverse(),
        y: otu_ids.reverse(),
        orientation: 'h',
        text:otu_labels.reverse()
      }];
    
      Plotly.newPlot('bar', data);

}

function bubbleChart(otu_ids, sample_values, otu_labels){
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text:otu_labels,
        mode: 'markers',
        marker: {
          //color: [41,342],//otu_ids,
          sizeref: 1.2,
          //opacity: [1, 0.8, 0.6, 0.4],
          size: sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        showlegend: false,
        colorway : ['#f3cec9', '#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844'],
        xaxis: {
            title: {
              text: 'OTU ID',
            }
          }
      };
      
      Plotly.newPlot('bubble', data, layout, {scrollZoom: true});
}

function gaugeChart(indicator){

    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: indicator,
          title: { text: "Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { 
                range: [null, 9],
                tick0: "0",
                dtick: "1"
             },
            steps: [
              { range: [0, 1], color: "#f4f8f8" },
              { range: [1, 2], color: "#e9f2f2" },
              { range: [2, 3], color: "#d4e6e5" },
              { range: [3, 4], color: "#bed9d8" },
              { range: [4, 5], color: "#a8cccd" },
              { range: [5, 6], color: "#92bfc0" },
              { range: [6, 7], color: "#7bb4b3" },
              { range: [7, 8], color: "#64a6a6" },
              { range: [8, 9], color: "#4b9a9a" }
            ],
          }
        }
      ];
      
      var layout = { 
          width: 600, 
          height: 450, 
          margin: { t: 0, b: 0 }, 
          title: {
            text:'Plot Title',
            font: {
              family: 'Courier New, monospace',
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          }
        };
      Plotly.newPlot('gauge', data, layout);
}

function optionChanged(x){
    showDashboard(x);
}

showDashboard('940');