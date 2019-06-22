function buildMetadata(city) {
  //alert(sample);
   
  var url = `/cityPop2/${city}`; 
  d3.json(url).then((data) =>{
    //console.log(data);
    var PANEL = d3.select("#city-sample");

    PANEL.html("");

    Object.entries(data[0]).forEach(([key,value]) =>{
      PANEL.append("h6").text(`${key}: ${value}`);
    })
    
  });
}
  

function buildCharts(city) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/cityCrime2/${city}`; 
  d3.json(url).then((data) =>{

    // @TODO: Build a Chart using the sample data
    // const city = data.city;
    // const crimetype = data.type;
    const year = ["2010","2011","2012","2013","2014","2015","2016"]
    const yearValues = [data["2010"],data["2011"],data["2012"],data["2013"],data["2014"],data["2015"],data["2016"]]

    var bardata = [{
      //name: city,
      x: year,
      y: [642, 596, 581, 455, 385, 349,369],
      //data.map(row => row.["2016"]),
      //text: data.map(row => row.type),
      type: 'bar',
      //hovertext: otu_labels.slice(0,10),
      //hoverinfo: "hovertext",
    }];

      var barlayout = {
      margin: {t:0,1:0}
      };
    
    Plotly.plot('bar', bardata, barlayout);
  });

 }

function init() {
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/cityPop").then((dataPop) => {
    dataPop.forEach((pop) => {
      selector
        .append("option")
        .text(pop.city)
        .property("value", pop.city);
    });

    // Use the first sample from the list to build the initial plots
     const firstCity = dataPop[0];
     buildCharts(firstCity.city);
     buildMetadata(firstCity.city);
  });
}

function optionChanged(newCity) {
  // Fetch new data each time a new sample is selected
  buildCharts(newCity);
  buildMetadata(newCity);
  //alert("You chose " + newCity + "! Wow!")
}

// Initialize the dashboard
init();
