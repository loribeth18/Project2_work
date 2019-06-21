function buildMetadata(city) {
  //alert(sample);
   
  var url = `/cityPop2/${city}`; 
  d3.json(url).then((data) =>{
    //console.log(data);
    var PANEL = d3.select("#city-sample");

    PANEL.html("");

    Object.entries(data[0]).forEach(([key,value]) =>{ //don't worry about it
      PANEL.append("h6").text(`${key}: ${value}`);
    })
    
  });
}
  

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/cityCrime2/${city}`; 
  d3.json(url).then((data) =>{
    // @TODO: Build a Bubble Chart using the sample data
    const city = data.city;
    const crimetype = data.type;
    //const 2010 = data.2010;

    var bardata = [{
      type: 'line',
      //name: year,
      x: ['2010','2011','2012','2013','2014','2015','2016'],
      y: 'City-data.com crime index (higher means more crime, U.S. average = 280...'
      //labels: year,
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
     //buildCharts(firstCity.city);
     buildMetadata(firstCity.city);
  });
}

function optionChanged(newCity) {
  // Fetch new data each time a new sample is selected
  buildCharts(newCity);
  buildMetadata(newCity);
  alert("You chose " + newCity + "! Wow!")
}

// Initialize the dashboard
init();
