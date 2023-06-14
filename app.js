console.log("Hello Back to School!");

//1. Create a variable to store the vizContainer
//2. Create a variable to store the dashboard options
//3. Create a variable to store the URL - if it doesn't load, might need to specify height and width

//1.

let viz;
const containerDiv = document.getElementById("vizContainer");
const url =
  "https://public.tableau.com/views/EmbeddingDashboard_16867362917170/EmbeddingDashboard?:language=en-US&:display_count=n&:origin=viz_share_link";
const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};
const exportpdfbutton = document.getElementById("exportPDF");
const exportPPButton = document.getElementById("exportPP");

document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

function exportPDFfunction() {
  viz.showExportPDFDialog();
}
function exportToPowerPoint() {
  viz.showExportPowerPointDialog();
}

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  //Need to get active sheet, but this could be a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();

  //Inspect the sheets you need to filter
  console.log(sheets);
  //Index of the sheet you want to filter
  const sheetToFilter = sheets[0];
  //do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("Viz Filtered"));

  //Repeated for second sheet
  const sheetToFilter1 = sheets[1];
  //do the actual filtering
  sheetToFilter1
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("Viz Filtered"));
}

document.addEventListener("DOMContentLoaded", initViz);
exportpdfbutton.addEventListener("click", exportPDFfunction);
exportPPButton.addEventListener("click", exportToPowerPoint);
FilterButton.addEventListener("click", applyFilter);
