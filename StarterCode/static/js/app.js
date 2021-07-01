function unpack(rows, index) {
    return rows.map(function(row) {
        //console.log(row.id);
        return row[index];
    });
  }

function fillDropDown(samples){
    d3.select("#selDataset")
    .selectAll("option")
    .data(samples)
    .enter()
    .append("option")
    .html(x => `${x.id}`);
}

d3.json("samples.json").then((data) => {

    var samples = data.samples;
    var firsElement = samples[0].id;

    var firstSample = samples.filter(x => x.id === firsElement)[0];
    var sample_values = firstSample.sample_values;
    var sliced_sample_values = sample_values.slice(0,10);
    //console.log(sample_values);
    var otu_ids = firstSample.otu_ids;
    var sliced_otu_ids= otu_ids.map(x => 'OTU '+x).slice(0,10);
    //console.log(otu_ids);
    
    var otu_labels = firstSample.otu_labels;
    var sliced_otu_labels = otu_labels.slice(0,10);
    //console.log(otu_labels);
    
    fillDropDown(samples);
    barChart(sliced_sample_values, sliced_otu_ids, sliced_otu_labels);
    bubbleChart(otu_ids, sample_values, otu_labels);
  });
 
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
          color: otu_ids,
          opacity: [1, 0.8, 0.6, 0.4],
          size: sample_values
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: 'Marker Size and Color',
        showlegend: false,
        height: 600,
        width: 800
      };
      
      Plotly.newPlot('bubble', data, layout);
}