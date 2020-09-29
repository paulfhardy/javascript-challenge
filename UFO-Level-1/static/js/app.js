// ***********************************************************************
// This program is called by index.html and provides the necessary 
// functionality to load, display, and filter a set of UFO sigting data
// Program developed and tested by : Paul Hardy
// Program developed and tested on : 09-29-2020
// ************************************************************************

// from data.js
var tableData = data;
console.log(tableData);

// MY CODE HERE!
const tbody = d3.select("tbody");
let button = d3.select("#filter-btn");
let form = d3.select("#form");

// Use d3 to update each cell's text with
// UFO sighting data values 
// (Date, City, State, Country, Shape, Duration, Comments)
tableData.forEach(ufoReport => {
   let row = tbody.append("tr");
   Object.values(ufoReport).forEach(value => {
     // Append a cell to the row for each value in the uforeport object
     var cell = row.append("td");
     cell.text(value);
   });
});

// runEnter = Triggered by Filter Table Button or Submit Form
const runEnter = () => {

  // Prevent the page from refreshing on submit
  d3.event.preventDefault();

  // Make a copy of the tableData data set to filteredData.
  var filteredData = tableData.map(item => item );

  // Select the date input element and get the raw HTML node
  // Get the value property of the input element
  let inputElement = d3.select("#datetime"), 
      inputValue = inputElement.property("value");
      if (inputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.datetime === inputValue);
      }

  // Clear prior tr elements at tbody level (leave thead>tr as is)
  var trall = d3.selectAll("tbody>tr");
  trall.remove();

  // Rebuild table with filtered results
  filteredData.forEach((ufoReport) => {
    let row = tbody.append("tr");
    Object.values(ufoReport).forEach(value => {
      let cell = row.append("td");
      cell.text(value);
    });
  }); 
};

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);