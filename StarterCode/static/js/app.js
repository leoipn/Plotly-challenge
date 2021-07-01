function unpack(rows, index) {
    return rows.map(function(row) {
        console.log(row.id);
        return row[index];
    });
  }
  
d3.json("samples.json").then((data) => {
    //console.log(data.samples);
    var samples = data.samples;
    var ids = samples.map(sample => sample.id);
    
    d3.select("#selDataset")
    .selectAll("option")
    .data(samples)
    .enter()
    .append("option")
    .html(x => `${x.id}`);
    //console.log(unpack(data.samples,1));

    var sample_values = data.samples.sample_values;
    var otu_ids = data.samples.otu_ids;
    
    var data = [{
        type: 'bar',
        x: sample_values,
        y: otu_ids,
        orientation: 'h'
      }];
    
      Plotly.newPlot('bar', data);

    // //  Create the Traces
    // var trace1 = {
    //   x: data.organ,
    //   y: data.survival.map(val => Math.sqrt(val)),
    //   type: "box",
    //   name: "Cancer Survival",
    //   boxpoints: "all"
    // };
  
    // // Create the data array for the plot
    // var data = [trace1];
  
    // // Define the plot layout
    // var layout = {
    //   title: "Square Root of Cancer Survival by Organ",
    //   xaxis: { title: "Organ" },
    //   yaxis: { title: "Square Root of Survival" }
    // };
  
    // // Plot the chart to a div tag with id "plot"
    // Plotly.newPlot("plot", data, layout);
  });
 