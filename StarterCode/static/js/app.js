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
    var sample_values = firstSample.sample_values.slice(0,10);
    //console.log(sample_values);
    var otu_ids = firstSample.otu_ids.map(x => 'OTU '+x).slice(0,10);
    //console.log(otu_ids);
    
    var otu_labels = firstSample.otu_labels.slice(0,10);
    //console.log(otu_labels);
    
    fillDropDown(samples);

    
    var data = [{
        type: 'bar',
        x: sample_values.reverse(),
        y: otu_ids.reverse(),
        orientation: 'h',
        text:otu_labels.reverse()
      }];
    
      Plotly.newPlot('bar', data);

  });
 