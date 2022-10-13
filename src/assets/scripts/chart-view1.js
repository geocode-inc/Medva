//map-view.js
//Added by: Gurleen Kaur 

//Modified by: 
//Date:
var conusaLayer;
function basinMonitorLoad(){
    $("#links").hide();
    $("#loader").hide();
    require([
        "esri/views/MapView",
        "esri/views/layers/LayerView",
        "esri/Map",
        "esri/WebMap",
        "esri/config",
        "esri/layers/Layer",
        "esri/layers/FeatureLayer",
        "esri/PopupTemplate",
        "esri/popup/content/CustomContent",
        "dojo/domReady!",
        "dojo/on",
       
    ], function(
      MapView, LayerView, Map, WebMap,  esriConfig,Layer, FeatureLayer, PopupTemplate, CustomContent, domReady, on, 
    ) {
      esriConfig.portalUrl = "https://pelmorex.maps.arcgis.com/";
      

    conusaLayer = new FeatureLayer({
        url: "https://services5.arcgis.com/cKn7xQCZ4NxAHJ4u/arcgis/rest/services/PointGrid10KM_CONUSA/FeatureServer/0"
    });
    var webmap = new WebMap({
        basemap: "dark-gray-vector",
        layers: [conusaLayer]
    });

    var view = new MapView({
      
        container: "viewDiv2",
        map: webmap,
        extent: {
          // autocasts as new Extent()
          xmin: -145.5268,
          ymin: 14.9458,
          xmax: -59.8861,
          ymax: 59.7126,
          
        },
         zoom: 10,
         popup: {
          defaultPopupTemplateEnabled: false,
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: true,
            breakpoint: false
          }
        }
       
    });

   
    view.when(() => {

        // Create the Search widget
       

        // This custom content element contains the Search widget
        const contentWidget = new CustomContent({
          outFields: ["*"],
          creator: (event) => {
            var chartContainer = document.createElement("div");
            chartContainer.id = "Chart-container";
            chartContainer.style = "width:400px; height: 300px";

            const offset = new Date().getTimezoneOffset();
              var today = new Date().getTime() - (offset*60*1000);
              today = new Date(today).toISOString().slice(0, 10);
              var back_date  = new Date(today);
              var days = 5;
              back_date.setDate(back_date.getDate() - days);
              back_date = back_date.toISOString().slice(0,10);
              $("#loader").show();
          
              var senddata = { POI_ID: '8ab93f4e-7973-464f-a7b1-ce89e1da4b20',
              StartDate: today,
              EndDate: back_date,
              POI_NAME: 'Mill',
              inLat: event.graphic.geometry.latitude,
              inLong: event.graphic.geometry.longitude,
              DestDataset_JSON: 'C:\GIS_TEST\WeatherSource\data.json',
              DAYS_BACK: '5',
              token: '725ce9d30d459bd779046fdad4fb9713623d5cd6' }
          
            var settings = {
              "url": "https://prod-fmeserver-pelmorex.fmecloud.com/fmedatastreaming/test/WeatherByDateLoop_HTML_SP_for_test.fmw",
              "method": "GET",
              "timeout": 3000,
              "data": senddata
            };
            var category = [];
            var datasetActual = [];
            var datasetClimatological = [];
            $.ajax(settings).done(function (response) {
              response.forEach(element => {
                  category.push({'label': element.timestamp}) ;
                  datasetActual.push({'value': element["Accumulated Actual Precipitation"]});
                  datasetClimatological.push({'value': element["Accumulated Climatological Precipitation"]});
                  }
                  )
                  createChartpopup(category, today, back_date, datasetActual, datasetClimatological);
              });
      
      
              function createChartpopup(category, today, back_date, datasetActual, datasetClimatological){
                  var caption = `Precip SUM for from ${back_date} to ${today}`;
                  var yaxisname = "Precip Sum";
                  var plottooltext = "$seriesName : <b>$dataValue</b>"
                  const dataSource = {
                      chart: {
                        caption: caption,
                        yaxisname: yaxisname,
                        showhovereffect: "1",
                        drawcrossline: "1",
                        plottooltext: plottooltext,
                        theme: "fusion"
                      },
                      categories: [
                        {
                          category: category
                        }
                      ],
                      dataset: [
                        {
                          seriesname: "Accumulated Actual Precipitation",
                          data: datasetActual
                        },
                        {
                          seriesname: "Accumulated Climatological Precipitation",
                          data: datasetClimatological
                        }
                      ]
                    };
                    
                    FusionCharts.ready(function() {
                      myChart = new FusionCharts({
                        type: "msline",
                        renderAt: "Chart-container",
                        width: "100%",
                        height: "100%",
                        dataFormat: "json",
                        dataSource
                      }).render();
                    });
                    //$("#Chart-container").show();
                    $("#loader").hide();
              }
      
              // Format the returned values and display this in the popup content
              //return "chartContainer";

            return chartContainer;
          }
        });


        // Create the PopupTemplate and reference the two custom content elements
        const template = new PopupTemplate({
          outFields: ["*"],
          title: "Chart:",
          content: [contentWidget]
        });

        conusaLayer.popupTemplate = template;
      });
    
    viewda = null;
    viewda = view;

    // Create the custom content for the CustomContent popup element
    //Creates some custom content
    // This custom content element contains the chart
//     const contentWidget = new CustomContent({
//     outFields: ["*"],
//     creator: () => {
//       return createChart;
//     }
//   });


    //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
    addBaseMap();
    addSearch();
    //add all other common widgets
     addLayerlist();
     addCoordinatConversion();
     addScalebar();
     addHome();
     addMyLocation();

     
// Event handler that fires each time a feature is clicked.
    // viewda.on("click",  getCoordinates);

    
     
    
    
    });
    
}

var  xToAdd, yToAdd, myChart;
function getCoordinates(evt){
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/views/draw/Draw",
    "esri/Graphic",
    "esri/geometry/geometryEngine"
  ], function (Map, MapView, Draw, Graphic, geometryEngine) {
    viewda.graphics.removeAll();
    myChart.dispose();
    updatePoint(evt.mapPoint);
    
  
function updatePoint(coordinates){
    $("#chart-container").hide();
  xToAdd = coordinates.latitude;
  yToAdd = coordinates.longitude;
//Can add graphics to map here if needed
}
});

}

//Creating chart
function getCharts(evt){
    const offset = new Date().getTimezoneOffset();
    var today = new Date().getTime() - (offset*60*1000);
    today = new Date(today).toISOString().slice(0, 10);
    var back_date  = new Date(today);
    var days = parseInt(evt.id);
    back_date.setDate(back_date.getDate() - days);
    back_date = back_date.toISOString().slice(0,10);
    $("#loader").show();

    var senddata = { POI_ID: '8ab93f4e-7973-464f-a7b1-ce89e1da4b20',
    StartDate: today,
    EndDate: back_date,
    POI_NAME: 'Mill',
    inLat: xToAdd,
    inLong: yToAdd,
    DestDataset_JSON: 'C:\GIS_TEST\WeatherSource\data.json',
    DAYS_BACK: evt.id,
    token: '725ce9d30d459bd779046fdad4fb9713623d5cd6' }

  var settings = {
    "url": "https://prod-fmeserver-pelmorex.fmecloud.com/fmedatastreaming/test/WeatherByDateLoop_HTML_SP_for_test.fmw",
    "method": "GET",
    "timeout": 3000,
    "data": senddata
  };
  var category = [];
  var datasetActual = [];
  var datasetClimatological = [];
  $.ajax(settings).done(function (response) {
    response.forEach(element => {
        category.push({'label': element.timestamp}) ;
        datasetActual.push({'value': element["Accumulated Actual Precipitation"]});
        datasetClimatological.push({'value': element["Accumulated Climatological Precipitation"]});
        }
        )
    createChart(category, today, back_date, datasetActual, datasetClimatological);
    console.log(response);
  });
}
function createChart(category, today, back_date, datasetActual, datasetClimatological){
    var caption = `Precip SUM for from ${back_date} to ${today}`;
    var yaxisname = "Precip Sum";
    var plottooltext = "$seriesName : <b>$dataValue</b>"
    const dataSource = {
        chart: {
          caption: caption,
          yaxisname: yaxisname,
          showhovereffect: "1",
          drawcrossline: "1",
          plottooltext: plottooltext,
          theme: "fusion"
        },
        categories: [
          {
            category: category
          }
        ],
        dataset: [
          {
            seriesname: "Accumulated Actual Precipitation",
            data: datasetActual
          },
          {
            seriesname: "Accumulated Climatological Precipitation",
            data: datasetClimatological
          }
        ]
      };
      
      FusionCharts.ready(function() {
        myChart = new FusionCharts({
          type: "msline",
          renderAt: "chart-container",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource
        }).render();
      });
      $("#chart-container").show();
      $("#loader").hide();
}

