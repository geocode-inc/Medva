//map-view.js
//Added by: Gurleen Kaur 

//Modified by: 
//Date: 

var viewda;
function addBaseMap(){
  require([
  
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    
  "dojo/domReady!"]
  ,function(BasemapGallery, Expand, domReady){
    
  
    var basemapGallery = new BasemapGallery({
      view: viewda,
      source: {
        portal: {
          url: "https://www.arcgis.com",
          useVectorBasemaps: false  // Load vector tile basemaps
        }
      }
    });
  //view.ui.add(basemapGallery, "top-right");
  
  var bgExpand = new Expand({
    
    expandTooltip: "Base Map",
    view: viewda,
    expandTooltip: "Base Map",
        content: basemapGallery
      });
  
      // close the expand whenever a basemap is selected
      basemapGallery.watch("activeBasemap", function() {
        var mobileSize =
        viewda.heightBreakpoint === "xsmall" ||
        viewda.widthBreakpoint === "xsmall";
  
        if (mobileSize) {
          bgExpand.collapse();
        }
      });

      // Set-up event handlers for buttons and click events
      var distanceButton = document.getElementById('distance');
      var areaButton = document.getElementById('area');
      var clearButton = document.getElementById('clear');

      distanceButton.addEventListener("click", () => {
       distanceMeasurement();
      });
      areaButton.addEventListener("click", () => {
       areaMeasurement();
      });
      clearButton.addEventListener("click", () => {
       clearMeasurements();
      });
  
      // Add the expand instance to the ui

    
      //viewda.ui.add(bgExpand, "top-right");
      viewda.ui.add(bgExpand, "top-left");
     
      // Set the views for the widgets        
      
      });
 
}

function addPrint()
{


  require([
    "esri/widgets/Print",
    "esri/widgets/Expand",
    "dojo/domReady!"]
  ,function(Print, Expand){
    
    
    var print = new Print({
      view: viewda,
      // specify your own print service
      printServiceUrl:
      "http://arcgis.medva-dev/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
        //"https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
      container: document.createElement("div")
    });
  //}
      var bgExpandPrint = new Expand({
        expandTooltip: "Print Map",
        view: viewda,
      expandTooltip: "Print Map",
      content: print
    });
      viewda.ui.add(bgExpandPrint, "top-right");

      
      });
      removeLoader();
}


function addLayerlist(){
  //console.log('fdsfsd')
  require([
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
  "dojo/domReady!"]
  ,function(LayerList, Expand){
    var layerList = new LayerList({
      view: viewda,
      listItemCreatedFunction: function(event) {
        const item = event.item;
        if (item.layer.type != "group") {
          // don't show legend twice
          item.panel = {
            content: "legend",
            open: false
          };
        }
      }
    });
    // Adds widget below other elements in the top left corner of the view
    
    var bgExpandLayer = new Expand({
      expandTooltip: "Layer List",
      view: viewda,
      expandTooltip: "Layer List",
      content: layerList,
    });
    viewda.ui.add(bgExpandLayer, {
      //position: "top-right" 
      position: "top-left"
    });

      
      });
 
}

function addCoordinatConversion(){
  require([
    "esri/widgets/CoordinateConversion",
    "esri/widgets/CoordinateConversion/support/Format",
    "esri/widgets/CoordinateConversion/support/Conversion",
    "esri/geometry/Point",
    "esri/geometry/support/webMercatorUtils",
    "esri/geometry/SpatialReference"]
  ,function(CoordinateConversion, Format,
    Conversion,
    Point,
    webMercatorUtils,
    SpatialReference){
    var ccWidget = new CoordinateConversion({
      view: viewda
  });
  
  viewda.ui.add(ccWidget, "bottom-right");
 // Regular expression to find a number
 const numberSearchPattern = /-?\d+[\.]?\d*/;
  /**
         * Create a new Format called XYZ, which looks like: "<Latitude>, <Longitude>, <Z>"
         *
         * We need to define a convert function, a reverse convert function,
         * and some formatting information.
         */
  const stateplane = new Format({
    name: "Local System",
    conversionInfo: {
      spatialReference: new SpatialReference({ wkid: 2039 }),
      reverseConvert: function (string, format) {
        const parts = string.split(",");
        return new Point({
          x: parseFloat(parts[0]),
          y: parseFloat(parts[1]),
          spatialReference: { wkid: 2039 }
        });
      }
    },
    coordinateSegments: [
      {
        alias: "X",
        description: "easting",
        searchPattern: numberSearchPattern
      },
      {
        alias: "Y",
        description: "northing",
        searchPattern: numberSearchPattern
      }
    ],
    defaultPattern: "X, Y"
  });

  // Add our new format to the widget's dropdown
  ccWidget.formats.add(stateplane);

  // Add the two custom formats to the top of the widget's display
  ccWidget.conversions.splice(
    0,
    0,
    
    new Conversion({
      format: stateplane
    })
  );

      });

      
}


function addScalebar(){
  require([
    "esri/widgets/ScaleBar"]
  ,function(ScaleBar){
    var scaleBar = new ScaleBar({
      view: viewda,
      unit: "dual"
  });
  
  viewda.ui.add(scaleBar, {
      position: "bottom-right"
  });
});
 
}

function addHome(){
  require([
    "esri/widgets/Home"]
  ,function(Home){
    var homeWidget = new Home({
      view: viewda
  });
  
  viewda.ui.add(homeWidget, { position: "top-left" });
});
}
var searchWidget;
function addSearch(){
  require([
    "esri/widgets/Search"]
  ,function(Search){
//Search widget
searchWidget = new Search({
  view: viewda,
  sources: []
});
    // Add the search widget to the top right corner of the view
    viewda.ui.add(searchWidget, {
      position: "top-right"
    });
});
}

function addMyLocation(){
  require([
    
    "esri/widgets/Locate"

  ],function(
  
    Locate

) {
  const locate = new Locate({
    view: viewda,
    useHeadingEnabled: false,
    goToOverride: function(view, options) {
      options.target.scale = 1500;
      return view.goTo(options.target);
    }
  });
  viewda.ui.add(locate, "top-left");
});

}


function addLoader() {
  //removemyloading();
  var LoaderImageName = '../../assets/images/loader/Preloader' + Math.floor((Math.random() * 50) + 1) + '.gif';
  $('#startloading').css('display', 'block');
  $('#imageLoader').css('display', 'block');
  $('#imageLoader').attr('src', LoaderImageName);

}

function removeLoader() {
  $('#startloading').css('display', 'none');
  $('#imageLoader').css('display', 'none');
}

function BoxFadeOut() {
  $("#fademsgboxsmall").fadeOut();
  $("#Mess1").text(" ");
  $("#Mess2").text(" ");
  $("#Mess3").text(" ");
  $("#Mess").text(" ");
  $('#fade').remove();
  $('#fademsgboxsmall').fadeOut();
}

function BoxFadeIn(id) {
$('body').append('<div id="fade"</div>');
$('#fade').css({ 'filter': 'alpha(opacity=80)' }).fadeIn();
if(id!=null && id!="" )
{
    if(id=="ConfirmBox")
    {
        $('#BtnOk').css({ 'display': 'none' });
        $('#BtnNo').css({ 'display': 'table-cell' });
        $('#BtnYes').css({ 'display': 'table-cell' });
        $('#BtnYesReAssign').css({ 'display': 'table-cell' });
    }else{
        $('#BtnOk').css({ 'display': 'table-row' });
        $('#BtnNo').css({ 'display': 'none' });
        $('#BtnYes').css({ 'display': 'none' });
        $('#BtnYesReAssign').css({ 'display': 'none' });
        $("#Mess1").text(id);
        $("#Mess2").text(" ");
        $("#Mess3").text(" ");
        $("#Mess").text(" ");
    }
}
else
{
    $('#BtnOk').css({ 'display': 'table-row' });
    $('#BtnNo').css({ 'display': 'none' });
    $('#BtnYes').css({ 'display': 'none' });
    $('#BtnYesReAssign').css({ 'display': 'none' });
    $("#Mess1").text(" ");
    $("#Mess2").text(" ");
    $("#Mess3").text(" ");
    $("#Mess").text(" ");
}
$("#fademsgboxsmall").fadeIn();
}

// Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
var measurement;
function distanceMeasurement() {
  require([
    "esri/widgets/Measurement",]
  ,function(Measurement){
    measurement = new Measurement({
      view: viewda
  });
  //const type = activeView.type;
  var distanceButton = document.getElementById('distance');
  var areaButton = document.getElementById('area');
  measurement.activeTool = "distance";//type.toUpperCase() === "2D" ? "distance" : "direct-line";
  distanceButton.classList.add("active");
  areaButton.classList.remove("active");
   // Add the appropriate measurement UI to the bottom-right when activated
   viewda.ui.add(measurement, "bottom-right");
   measurement.view = viewda;
});
}

// Call the appropriate AreaMeasurement2D or AreaMeasurement3D
function areaMeasurement() {
  require([
    "esri/widgets/Measurement",]
  ,function(Measurement){
    measurement = new Measurement({
      view: viewda
  });
  var distanceButton = document.getElementById('distance');
  var areaButton = document.getElementById('area');
  measurement.view = viewda;
  measurement.activeTool = "area";
  distanceButton.classList.remove("active");
  areaButton.classList.add("active");
   // Add the appropriate measurement UI to the bottom-right when activated
  viewda.ui.add(measurement, "bottom-right");
   measurement.view = viewda;
});
}

// Clears all measurements
function clearMeasurements() {
  var distanceButton = document.getElementById('distance');
  var areaButton = document.getElementById('area');
  distanceButton.classList.remove("active");
  areaButton.classList.remove("active");
  this.measurement.clear();
}

function addBookmarks(){
  require([
    "esri/widgets/Bookmarks", "esri/widgets/Expand"]
  ,function(Bookmarks, Expand){
    const bookmarks = new Bookmarks({
      view: viewda,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
      visibleElements: {
        time: false // don't show the time (h:m:s) next to the date
      }
    });

    const bkExpand = new Expand({
      view: viewda,
      content: bookmarks,
      expanded: false
    })

    // Add the widget to the top-right corner of the view
    viewda.ui.add(bkExpand, "top-right");
});
 
}

 
