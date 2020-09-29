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

  // Establish filtereData as an exact copy of the full data set
  // The logic below will determine if the user has entered filter criteria
  // in each of the input fields, if so the appropriate filter will be applied to
  // filteredData, if not filteredData remains as is and is evaluated for the next input
  // field until all fields are evaluated. Then the table is rebuilt for desplay with 
  // exactly what the user requested.  If no filter criteria is entered the full data set 
  // is displayed.

  // Make a copy of the tableData data set to filteredData.
  var filteredData = tableData.map(item => item );

  // Select the date input element and get the raw HTML node
  // Get the value property of the input element
  let inputElement = d3.select("#datetime"), 
      inputValue = inputElement.property("value");
      if (inputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.datetime === inputValue);
      }

  // Select the city input element and get the raw HTML node
  // Get the value property of the input element
  let inputCityElement = d3.select("#city"), 
       cityinputValue = inputCityElement.property("value");
       if (cityinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.city === cityinputValue);
      }

  // Select the state input element and get the raw HTML node
  // Get the value property of the input element
  let inputStateElement = d3.select("#state"), 
       stateinputValue = inputStateElement.property("value");
       if (stateinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.state === stateinputValue);
      }

  // Select the country input element and get the raw HTML node
  // Get the value property of the input element
  let inputCountryElement = d3.select("#country"), 
       countryinputValue = inputCountryElement.property("value");
       if (countryinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.country === countryinputValue);
      }

  // Select the shape input element and get the raw HTML node
  // Get the value property of the input element
  let inputShapeElement = d3.select("#shape"), 
       shapeinputValue = inputShapeElement.property("value");
       if (shapeinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.shape === shapeinputValue);
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