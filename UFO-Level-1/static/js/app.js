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

const runEnter = () => {

  // Prevent the page from refreshing on submit
  d3.event.preventDefault();

  //  console.log("Enter");

  // Select the input element and get the raw HTML node
  // Get the value property of the input element
  let inputElement = d3.select("#datetime"), 
      inputValue = inputElement.property("value");
      console.log(inputValue);
  // Setup filter criteria
  let filteredData = tableData.filter(ufoRecord => ufoRecord.datetime === inputValue);
  console.log(filteredData);

  //var tbody1 = d3.select("tbody");
  //tbody1.remove();

  var trall = d3.selectAll("tbody>tr");
  trall.remove();

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