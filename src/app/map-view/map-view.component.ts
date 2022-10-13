import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
declare function mapStateCode1(a,b,c): any;
import { Router } from '@angular/router';
import { loadModules } from 'esri-loader';

//import { ChartViewComponent } from '../chart-view/chart-view.component';


const headers = new HttpHeaders({ 'Content-Type': 'text/plain'});

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
    //this.loadScript('./assets/scripts/map-view.js'); 
    
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/MapImageLayer',
      'esri/views/draw/Draw',
      "esri/Graphic",
      "esri/geometry/geometryEngine",
      "esri/layers/TileLayer",
      "esri/widgets/BasemapGallery",
      "esri/widgets/Measurement",
      "esri/widgets/Print",
      "esri/widgets/Expand",
      "esri/widgets/LayerList",
      "esri/widgets/CoordinateConversion",
      "esri/widgets/CoordinateConversion/support/Format",
      "esri/widgets/CoordinateConversion/support/Conversion",
      "esri/geometry/Point",
      "esri/geometry/support/webMercatorUtils",
      "esri/geometry/SpatialReference",
      "esri/widgets/ScaleBar",
      "esri/widgets/Home",
      "esri/widgets/Search",
      "esri/widgets/Locate",
      "esri/widgets/Bookmarks",
    ])
    .then(([EsriMap,EsriMapView, EsriMapImageLayer, EsriDraw, EsriGraphic, EsriGeometryEngine, EsriTileLayer,
      EsriBasemapGallery, EsriMeasurement, EsriPrint, EsriExpand, EsriLayerList, EsriCoordinateConversion, EsriFormat,
      EsriConversion, EsriPoint, EsriwebMercatorUtils, EsriSpatialReference, EsriScaleBar, EsriHome, EsriSearch,
      EsriLocate, EsriBookmarks]) => {
      //xToAdd = null; yToAdd = null;
      //esriConfig.portalUrl = "https://pelmorex.maps.arcgis.com/";
      const layer = new EsriMapImageLayer({
        url: "http://arcgis.medva-prod/arcgis/rest/services/Insight/VectorWM_AgriWater_RR/MapServer"
      });

      const tileLayer = new EsriTileLayer({
        url: "http://apollo.medva-prod/erdas-iws/esri/rest/services/Shchanya_Shchanya_2013_ITM.jp2/MapServer"
      });

      var webmap = new EsriMap({
        basemap: "dark-gray-vector",
        layers: [ tileLayer, layer]
      });

      var view = new EsriMapView({
        container: "viewDiv2",
        map: webmap,
        center: [35.246297, 32.848713],
        zoom: 15,
        popup: {
        defaultPopupTemplateEnabled: true,
        dockEnabled: false,
        dockOptions: {
        buttonEnabled: false,
        breakpoint: false}
        }
      });

      var viewda = null;
      viewda = view;
      addBaseMapOnMap();
      addPrintToolOnMap()
      addLayerlistOnMap();
      addCoordinatConversionOnMap();
      addScalebarOnMap();
      addHomeOnMap();
      addSearchOnMap();
      addMyLocationOnMap();
      addBookmarksOnMap();


      function addBaseMapOnMap(){
        var basemapGallery = new EsriBasemapGallery({
          view: viewda,
          source: {
            portal: {
              url: "https://www.arcgis.com",
              useVectorBasemaps: false  // Load vector tile basemaps
            }
          }
        });

        var bgExpand = new EsriExpand({
          expandTooltip: "Base Map",
          view: viewda,
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
        viewda.ui.add(bgExpand, "top-left");
      }

     //=====
      //***********************MEASUREMENT TOOLS STARTS************************************
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
      
      // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
      var measurement;
      function distanceMeasurement() {
          measurement = new EsriMeasurement({
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
      }

      // Call the appropriate AreaMeasurement2D or AreaMeasurement3D
      function areaMeasurement() {
          measurement = new EsriMeasurement({
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

      }

      // Clears all measurements
      function clearMeasurements() {
        var distanceButton = document.getElementById('distance');
        var areaButton = document.getElementById('area');
        distanceButton.classList.remove("active");
        areaButton.classList.remove("active");
        measurement.clear();
      }
      //***********************MEASUREMENT TOOLS ENDS************************************
     

      function addPrintToolOnMap(){
        var print = new EsriPrint({
          view: viewda,
          printServiceUrl: "http://arcgis.medva-dev/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
          container: document.createElement("div")
        });

          var bgExpandPrint = new EsriExpand({
            expandTooltip: "Print Map",
            view: viewda,
            content: print
        });
          viewda.ui.add(bgExpandPrint, "top-right");
      }

      function addLayerlistOnMap(){
          var layerList = new EsriLayerList({
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
          
          var bgExpandLayer = new EsriExpand({
            expandTooltip: "Layer List",
            view: viewda,
            content: layerList,
          });
          viewda.ui.add(bgExpandLayer, {
            position: "top-left"
          });
      }

      function addCoordinatConversionOnMap(){
          var ccWidget = new EsriCoordinateConversion({
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
        const stateplane = new EsriFormat({
          name: "Local System",
          conversionInfo: {
            spatialReference: new EsriSpatialReference({ wkid: 2039 }),
            reverseConvert: function (string, format) {
              const parts = string.split(",");
              return new EsriPoint({
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
          
          new EsriConversion({
            format: stateplane
          }));       
      }

      function addScalebarOnMap(){
          var scaleBar = new EsriScaleBar({
            view: viewda,
            unit: "dual"
        });
        
        viewda.ui.add(scaleBar, {
            position: "bottom-right"
        });
      }

      function addHomeOnMap(){
          var homeWidget = new EsriHome({
            view: viewda
        });
        
        viewda.ui.add(homeWidget, { position: "top-left" });
      }

      var searchWidget;
      function addSearchOnMap(){
        searchWidget = new EsriSearch({
          view: viewda,
          sources: []
        });
        // Add the search widget to the top right corner of the view
        viewda.ui.add(searchWidget, {
          position: "top-right"
        });
      }

      function addMyLocationOnMap(){
        const locate = new EsriLocate({
          view: viewda,
          useHeadingEnabled: false,
          goToOverride: function(view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
          }
        });
        viewda.ui.add(locate, "top-left");
      }

      function addBookmarksOnMap(){
          const bookmarks = new EsriBookmarks({
            view: viewda,
            // allows bookmarks to be added, edited, or deleted
            editingEnabled: true,
            visibleElements: {
              time: false // don't show the time (h:m:s) next to the date
            }
          });
      
          const bkExpand = new EsriExpand({
            view: viewda,
            content: bookmarks,
            expanded: false
          })
      
          // Add the widget to the top-right corner of the view
          viewda.ui.add(bkExpand, "top-right");
      }
//************ */
    })
    .catch(err =>{});
 
  }
}
//   public loadScript(url) {
//     //console.log('preparing to load...')
//     let node = document.createElement('script');
//     node.src = url;
//     node.type = 'text/javascript';
//     document.getElementsByTagName('head')[0].appendChild(node);
//  }
