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
//********************************************/
// Populate data in DATE select dropdown list
//********************************************/
// Select d3 input element
const tdateselect = d3.select("#selectdate");

// Gather all data in an array 
var justdates = [""];
tableData.forEach(uforeport => justdates.push(uforeport.datetime));

// Make the list unique so values don't repeat
const justdatesunique = Array.from(new Set(justdates));


// Build the drop down list
justdatesunique.forEach(datevalue =>{
  var option = tdateselect.append("option");
  option.text(datevalue);
  option.attr("value",datevalue);
});


//********************************************/
// Populate data in CITY select dropdown list
//********************************************/
// Select d3 input element
const tcityselect = d3.select("#selectcity");

// Gather all data in an array 
var justcities = [];
tableData.forEach(uforeport => justcities.push(uforeport.city));

// Make the list unique so values don't repeat
const justcitiesunique = Array.from(new Set(justcities));
justcitiesunique.push("");
justcitiesunique.sort();

// Build the drop down list
justcitiesunique.forEach(cityvalue =>{
  var option = tcityselect.append("option");
  option.text(cityvalue);
  option.attr("value",cityvalue);
});

//********************************************/
// Populate data in STATE select dropdown list
//********************************************/
// Select d3 input element
const tstateselect = d3.select("#selectstate");

// Gather all data in an array 
var juststates = [];
tableData.forEach(uforeport => juststates.push(uforeport.state));

// Make the list unique so values don't repeat
const juststatesunique = Array.from(new Set(juststates));
juststatesunique.push("");
juststatesunique.sort();

// Build the drop down list
juststatesunique.forEach(statevalue =>{
  var option = tstateselect.append("option");
  option.text(statevalue);
  option.attr("value",statevalue);
});

//********************************************/
// Populate data in COUNTRY select dropdown list
//********************************************/
// Select d3 input element
const tcountryselect = d3.select("#selectcountry");

// Gather all data in an array 
var justcountries = [];
tableData.forEach(uforeport => justcountries.push(uforeport.country));

// Make the list unique so values don't repeat
const justcountriesunique = Array.from(new Set(justcountries));
justcountriesunique.push("");
justcountriesunique.sort();

// Build the drop down list
justcountriesunique.forEach(countryvalue =>{
  var option = tcountryselect.append("option");
  option.text(countryvalue);
  option.attr("value",countryvalue);
});

//********************************************/
// Populate data in SHAPE select dropdown list
//********************************************/
// Select d3 input element
const tshapeselect = d3.select("#selectshape");

// Gather all data in an array 
var justshapes = [];
tableData.forEach(uforeport => justshapes.push(uforeport.shape));

// Make the list unique so values don't repeat
const justshapesunique = Array.from(new Set(justshapes));
justshapesunique.push("");
justshapesunique.sort();

// Build the drop down list
justshapesunique.forEach(shapevalue =>{
  var option = tshapeselect.append("option");
  option.text(shapevalue);
  option.attr("value",shapevalue);
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
  let selectedinputElement = d3.select("#selectdate"), 
      selectedinputValue = selectedinputElement.property("value");
      if (selectedinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.datetime === selectedinputValue);
      }

  // Select the city input element and get the raw HTML node
  // Get the value property of the input element
  let selectedCityElement = d3.select("#selectcity"), 
      selectedcityinputValue = selectedCityElement.property("value");
      if (selectedcityinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.city === selectedcityinputValue);
      }

  // Select the state input element and get the raw HTML node
  // Get the value property of the input element
  let selectedStateElement = d3.select("#selectstate"), 
       selectedstateinputValue = selectedStateElement.property("value");
       if (selectedstateinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.state === selectedstateinputValue);
      }

  // Select the country input element and get the raw HTML node
  // Get the value property of the input element
  let selectedCountryElement = d3.select("#selectcountry"), 
       selectedcountryinputValue = selectedCountryElement.property("value");
       if (selectedcountryinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.country === selectedcountryinputValue);
      }

  // Select the shape input element and get the raw HTML node
  // Get the value property of the input element
  let selectedShapeElement = d3.select("#selectshape"), 
       selectedshapeinputValue = selectedShapeElement.property("value");
       if (selectedshapeinputValue) {
        var filteredData = filteredData.filter(ufoRecord => ufoRecord.shape === selectedshapeinputValue);
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