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
          color: [41,342],//otu_ids,
          sizeref: 1.2,
          //opacity: [1, 0.8, 0.6, 0.4],
          size: sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        showlegend: false,
        xaxis: {
            title: {
              text: 'OTU ID',
            }
          }
      };
      
      Plotly.newPlot('bubble', data, layout, {scrollZoom: true});
}

function optionChanged(x){
    showDashboard(x);
}

showDashboard('940');