/**
 * Builds the gauge chart
 * @param {*} indicator the value to show in the gauge
 */
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