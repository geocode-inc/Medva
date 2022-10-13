// //map-view.js
// //Added by: Gurleen Kaur 

// //Modified by: 
// //Date:

// function basinMonitorLoad(){
//     $("#links").hide();
//     $("#loader").hide();
//     require([
//         "esri/views/MapView",
//         "esri/views/layers/LayerView",
//         "esri/Map",
//         "esri/WebMap",
//         "esri/layers/MapImageLayer",
//         "esri/layers/TileLayer",
//         "esri/config",
//         "esri/layers/Layer",
//         "dojo/domReady!",
//         "dojo/on",
       
//     ], function(
//       MapView, LayerView, Map, WebMap, MapImageLayer, TileLayer, esriConfig,Layer, domReady, on, 
//     ) {
//       xToAdd = null; yToAdd = null;
//       //esriConfig.portalUrl = "https://pelmorex.maps.arcgis.com/";
//       const layer = new MapImageLayer({
//         url: "http://arcgis.medva-dev/arcgis/rest/services/Insight/VectorWM_AgriWaterCM_EN_TEST/MapServer"
//       });

//       const tileLayer = new TileLayer({
//         url: "http://apollo.medva-prod/erdas-iws/esri/rest/services/Shchanya_Shchanya_2013_ITM.jp2/MapServer"
//       });


//       var webmap = new WebMap({
//         basemap: "dark-gray-vector",
//         // portalItem: {
//         //   // autocasts as new PortalItem()
//         //   id: "70b726074af04a7e9839d8a07f64c039"
//         // }
//         layers: [ tileLayer, layer]
//     });
    

//     //webmap.add
//     var view = new MapView({
      
//         container: "viewDiv2",
//         map: webmap,
//         // extent: {
//         //   // autocasts as new Extent()
//         //   xmin: -145.5268,
//         //   ymin: 14.9458,
//         //   xmax: -59.8861,
//         //   ymax: 59.7126,
          
//         // },
//         center: [35.246297, 32.848713],
//          zoom: 15,
//          popup: {
//           defaultPopupTemplateEnabled: true,
//           dockEnabled: false,
//           dockOptions: {
//             buttonEnabled: false,
//             breakpoint: false
//           }
//         }
       
//     });


//     viewda = null;
//     viewda = view;

//     //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
//     addBaseMap();
//     addSearch();
//     //add all other common widgets
//      addLayerlist();
//      addCoordinatConversion();
//      addBookmarks();
//      addHome();
//      addMyLocation();
//      addPrint();
//      addScalebar();
//      $("#links").show();
//     //  viewda.popup.watch("visible", (event) => {
//     //     if (event) {
//     //         $("#links").show();
//     //         $("#noinfo").show();
            
//     //     }
//     //     else{
//     //         $("#links").hide();
//     //         $("#noinfo").show();
//     //         $("#chart-container").hide();
//     //     }
//     //   });
// // Event handler that fires each time a feature is clicked.
//      viewda.on("click",  getCoordinates);

    
//     });
    
// }

// var  xToAdd, yToAdd, myChart;
// function getCoordinates(evt){
//   require([
//     "esri/Map",
//     "esri/views/MapView",
//     "esri/views/draw/Draw",
//     "esri/Graphic",
//     "esri/geometry/geometryEngine"
//   ], function (Map, MapView, Draw, Graphic, geometryEngine) {
//     viewda.graphics.removeAll();
//     //myChart.dispose();
//     updatePoint(evt.mapPoint);
    
  
//     function updatePoint(coordinates){
//         $("#chart-container").hide();
//       xToAdd = coordinates.latitude;
//       yToAdd = coordinates.longitude;
//     //Can add graphics to map here if needed
//     var point = {
//       type: "point", // autocasts as /Point
//       x: coordinates.x,
//       y: coordinates.y,
//       spatialReference: viewda.spatialReference
// };

//   var graphic = new Graphic({
//     geometry: point,
//     symbol: {
//       type: "simple-marker", // autocasts as SimpleMarkerSymbol
//       style: "circle",
//       color: [66, 135, 245],
//       size: "16px",
//       outline: { // autocasts as SimpleLineSymbol
//         color: [255, 255, 0],
//         width: 3
//       }
//     }
//   });
//   viewda.graphics.add(graphic);

// getCharts();
// }
// });

// }

// //Creating chart
// function getCharts(){
//   if(xToAdd == null || yToAdd == null){
//     alert("Please select a point on map");
//     // document.getElementById("30").checked = true;
//     // document.getElementById("60").checked = false;
//     // document.getElementById("90").checked = false;
//     // document.getElementById("120").checked = false;
//     return;
//   }
// // 
//   createChart();
// }
// function createChart(){
//   const chartData = [{
//     "label": "Venezuela",
//     "value": "290"
// }, {
//     "label": "Saudi",
//     "value": "260"
// }, {
//     "label": "Canada",
//     "value": "180"
// }, {
//     "label": "Iran",
//     "value": "140"
// }, {
//     "label": "Russia",
//     "value": "115"
// }, {
//     "label": "UAE",
//     "value": "100"
// }, {
//     "label": "US",
//     "value": "30"
// }, {
//     "label": "China",
//     "value": "30"
// }];

// //STEP 3 - Chart Configurations
// const chartConfig = {
// type: 'column2d',
// renderAt: 'chart-container',
// width: '100%',
// height: '400',
// dataFormat: 'json',
// dataSource: {
//     // Chart Configuration
//     "chart": {
//         "caption": "Countries With Most Oil Reserves [2017-18]",
//         "subCaption": "In MMbbl = One Million barrels",
//         "xAxisName": "Country",
//         "yAxisName": "Reserves (MMbbl)",
//         "numberSuffix": "K",
//         "theme": "fusion",
//         },
//     // Chart Data
//     "data": chartData
//     }
// };
// FusionCharts.ready(function(){
// var fusioncharts = new FusionCharts(chartConfig);
// fusioncharts.render();
// });
//       $("#chart-container").show();
//       $("#loader").hide();
// }

// function waterMeterLoad(){
//   require([
//     "esri/views/MapView",
//     "esri/views/layers/LayerView",
//     "esri/Map",
//     "esri/WebMap",
//     "esri/layers/MapImageLayer",
//     "esri/layers/TileLayer",
//     "esri/config",
//     "esri/layers/Layer",
//     "dojo/domReady!",
//     "dojo/on",
   
// ], function(
//   MapView, LayerView, Map, WebMap, MapImageLayer, TileLayer, esriConfig,Layer, domReady, on, 
// ) {
 
//   //esriConfig.portalUrl = "https://pelmorex.maps.arcgis.com/";
//   const layer = new MapImageLayer({
//     url: "http://arcgis.medva-prod/arcgis/rest/services/Insight/VectorWM_AgriWaterCM1/MapServer"
//   });

//   viewda.map.add(layer);


//   });
//   }

