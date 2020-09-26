d3.json("samples.json").then((imp) => {
    var data = imp;
    console.log(data);
    var samples = data.samples;
    var metadata = data.metadata;
    var demo = d3.select("#sample-metadata")
    console.log(samples);
    console.log(metadata);

    var selecter = d3.select("select");
    samples.forEach(element => {
        // console.log(element.id);
        var item = selecter.append("option")
        .text(element.id)
        .attr("value", element.id)
        .attr("onchange", "copy();")
    });

    var selected = d3.select("#selDataset")
    function build_bar() {
        var val = selecter.property("value");
        console.log(val);

        metadata.forEach(meta => {
            // console.log(meta.id)
            
            if(meta.id === Number(val)) {
                demo.html("");
                console.log(meta);
                Object.entries(meta).forEach(([k,v]) => {
                    var demo_info = demo.append("p").text(`${k}: ${v}`);
                })
            }
        }) 

        samples.forEach(sample => {
            if (sample.id === val){
                var values = sample.sample_values.map(x => x)
                var labels = sample.otu_ids.map(x => `OTU ${x}`)
                var ids = sample.otu_ids.map(x => x)
                var hovers = sample.otu_labels.map(x => x)
                // console.log(values);
                // console.log(labels);
                // console.log(hovers);

                var bar_trace = {
                    x: values.reverse(),
                    y: labels,
                    text: hovers,
                    type: "bar",
                    orientation: 'h'
                  };
                  
                  var bar_data = [bar_trace];
                  
                  var bar_layout = {
                    title: "Bar Chart",
                    xaxis: { title: "OTU Values"},
                    yaxis: { title: "OTU IDS"}
                  };
                  
                  Plotly.newPlot("bar", bar_data, bar_layout);

                  var bubble_trace = {
                    x: ids,
                    y: values,
                    text: hovers,
                    mode: 'markers',
                    marker: {
                       color: ids,
                      size: values
                    }
                  };
                  
                  var bubble_data = [bubble_trace];
                  
                  var bubble_layout = {
                    xaxis: { title: "OTU IDS"},
                    showlegend: false,
                  };
                  
                  Plotly.newPlot('bubble', bubble_data, bubble_layout);
            }
        })
    }

    selected.on("change", build_bar)
    // d3.select("select").selectAll("options")
    // .data(samples.id)
    // .append("options")
    // .text(function(d)
    // { 
    //     return d
    // })
})

