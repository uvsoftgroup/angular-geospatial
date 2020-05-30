import { Component, OnInit } from '@angular/core';
import { toStringHDMS } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import 'ol/ol.css';
import Style from 'ol/style/Style';
import { Fill, Stroke, Text, Circle } from 'ol/style';
import Overlay from 'ol/Overlay';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { HttpClient } from '@angular/common/http';
import {
  defaults as defaultControls, ScaleLine, LayerSwitcher,
  MousePosition, EditingToolbar, PanZoomBar, Navigation,
  KeyboardDefaults, OverviewMap, SelectFeature, Control
} from 'ol/control';

declare const $: any;
// Declare ol variable globally
declare const ol: any;

@Component({
  selector: 'app-geo-map-portal',
  templateUrl: './geo-map-portal.component.html',
  styleUrls: ['./geo-map-portal.component.scss']
})
export class GeoMapPortalComponent implements OnInit {

  // declare a map as a class member variable of type any
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  marker: Overlay;
  latitude = 23.825515115835344;
  longitude = 90.37126734852791;
  coordGPSSystem: any = 'EPSG:4326';
  coordOSMSystem: any = 'EPSG:3857';
  baseurl: any;
  public constructor() {
    this.baseurl = 'http://localhost:7777/geoserver/uvsoftgroupgeospatial/wms'; // geoserver_map
    console.log('--------------this.baseurl:' + this.baseurl);
  }

  public ngOnInit() {
    console.log('--------------ngOnInit()');
    const coord = [90.37126734852791, 23.825515115835344];
    const out = toStringHDMS(coord);
    console.log('--------------out:' + out);
    // this.osmTileMap();
    this.osmMapDynamicDataView();
  }

  public osmMapDynamicDataView() {
    console.log('--------------osmMapDynamicDataView()');

    let baseMap, viewMapCenter, controlsMap, mapScale, centerLocation,
    viewResolution, viewProjection, url, overviewMap,  layerSwitcher;
    let uvsoftgroupgeospatialLayerAddress,  uvsoftgroupgeospatialLayerPlot,
      uvsoftgroupgeospatialLayerBuilding, uvsoftgroupgeospatialLayerFloor, wmsAddressLayer,
      wmsPlotLayer, wmsBuildingLayer, wmsFloorLayer, uvsoftgroupgeospatialLayerMainRoad,
      uvsoftgroupgeospatialLayerRoad, wmsMainRoadLayer, wmsRoadLayer
      ;

    // Mouse Position Control from click event into Map
    const mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(8),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    centerLocation = ol.proj.fromLonLat([90.3717065602541, 23.82585617006994]);

    baseMap = new ol.layer.Tile({ source: new ol.source.OSM() });
    viewMapCenter = new ol.View({
      center: centerLocation,
      zoom: 13
    });

   mapScale = new ScaleLine({units: 'metric'});
   overviewMap = new OverviewMap();

   viewProjection = viewMapCenter.getProjection();
   viewResolution = viewMapCenter.getResolution();

   console.log('-----Projection:' + viewProjection + ' and Resolution:'  + viewResolution);

    controlsMap = new ol.control.defaults({
      attributionOptions: {
        collapsible: false
      }
    }).extend([mousePositionControl, mapScale, overviewMap]);

    // General and Standard Map loading
    this.map = new ol.Map({
      target: 'map',
      controls: controlsMap,
      // OpenStreet Map Loading
      layers: [baseMap],
      // Map view, center location and zoom level
      view: viewMapCenter
    });

    /**
      * Defining the Polygon Layer style
      *
      */
    const styleAddress = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'black', width: 3 }),
        fill: new ol.style.Fill({ color: 'rgba(0, 0,0,0.2 )' })

      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5, fill: new ol.style.Fill({ color: 'red' })
        }),

        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinate = feature.getGeometry().getCoordinates()[0];
          return new ol.geom.MultiPoint(coordinate);
        }
      })
    ];


    /**
     * Defining the Polygon Layer for Plot style
     *
     */
    const stylePlot = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'black', width: 3 }),
        fill: new ol.style.Fill({ color: 'rgba(199,0,0,0.1 )' })
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5, fill: new ol.style.Fill({ color: 'red' })
        }),

        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinate = feature.getGeometry().getCoordinates()[0];
          return new ol.geom.MultiPoint(coordinate);
        }
      })
    ];


    /**
     * Defining the Polygon Layer for Building style
     *
     */
    const styleBuilding = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'black', width: 3 }),
        fill: new ol.style.Fill({ color: 'rgba(0,0,255,0.2)' })
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5, fill: new ol.style.Fill({ color: 'red' })
        }),

        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinate = feature.getGeometry().getCoordinates()[0];
          return new ol.geom.MultiPoint(coordinate);
        }
      })
    ];

    /**
     * Defining the Polygon Layer for Floor style
     *
     */
    const styleFloor = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'black', width: 3 }),
        fill: new ol.style.Fill({ color: 'rgb(84, 151, 16,0.2)' })
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5, fill: new ol.style.Fill({ color: 'red' })
        }),

        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinate = feature.getGeometry().getCoordinates()[0];
          return new ol.geom.MultiPoint(coordinate);
        }
      })
    ];


    /**
      * Defining the Polygon Layer for Unit style
      *
      */
    const styleUnit = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'black', width: 3 }),
        fill: new ol.style.Fill({ color: 'rgb(151, 16, 16,0.3)'})
      }),
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5, fill: new ol.style.Fill({ color: 'red' })
        }),

        geometry: function (feature) {
          // return the coordinates of the first ring of the polygon
          const coordinate = feature.getGeometry().getCoordinates()[0];
          console.log('--------------coordinates:' + coordinate);
          return new ol.geom.MultiPoint(coordinate);
        }
      })
    ];


    /**
     * Registered Address info from REST APIs call
     *
     */
    // Polygon Geometry Coordinate Points
    let i, rv, featurePolygonAddress, coordinatesAddress, vectorSourceAddress, vectorLayerAddress;
    for (i = 1; i <= 10; i++) {
      rv = Math.random();
      console.log('--------------randomValuePerIteration:' + rv);
      coordinatesAddress = [[
        [90.36596433 - 0.001 * rv, 23.82865066 - 0.001 * rv],
        [90.36605754 - 0.001 * rv, 23.82865741 - 0.001 * rv],
        [90.36607095 - 0.001 * rv, 23.82852185 - 0.001 * rv],
        [90.36597506 - 0.001 * rv, 23.828551265 - 0.001 * rv],
        [90.36596433 - 0.001 * rv, 23.82865066 - 0.001 * rv]
      ]];
      // Form the polygon feature geometry with respective properties.
      featurePolygonAddress = new ol.Feature({
        geometry: new ol.geom.Polygon(coordinatesAddress),
        addressInfo: { adId: 100000, userRefNrId: 200001 }
      });
      // Transform Coordinates Points
      featurePolygonAddress.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      // generate vector source with polygon feature
      vectorSourceAddress = new ol.source.Vector({
        features: [featurePolygonAddress]
      });
      // define a vector layer with the vector source
      vectorLayerAddress = new ol.layer.Vector({
        source: vectorSourceAddress,
        style: styleAddress
      });
      // finally add the vector layer into the map
      this.map.addLayer(vectorLayerAddress);
    }


    /**
    * Registered Plot info from REST APIs call
    *
    */
    // Polygon Geometry Coordinate Points
    let featurePolygonPlot, coordinatesPlot, vectorSourcePlot, vectorLayerPlot;
    for (i = 1; i <= 10; i++) {
      rv = Math.random();
      coordinatesPlot = [[
        [90.36596061 + 0.001 * rv, 23.82773943 + 0.001 * rv],
        [90.36804580 + 0.001 * rv, 23.82807700 + 0.001 * rv],
        [90.36810608 + 0.001 * rv, 23.82774713 + 0.001 * rv],
        [90.36604212 + 0.001 * rv, 23.82742578 + 0.001 * rv],
        [90.36596061 + 0.001 * rv, 23.82773943 + 0.001 * rv]
      ]];
      // Form the polygon feature geometry with respective properties.
      featurePolygonPlot = new ol.Feature({
        geometry: new ol.geom.Polygon(coordinatesPlot),
        plotInfo: {
          plId: 100000, plAddressId: '200001', userRefNrId: 300000, plCode: 'DHK-1001',
          plName: 'DHKPA 1001', plType: 'Commercial', plNumber: 'DHK700', plMonzaNumber: 'DHKM1001',
          plCSNumber: 'DHKCS2001', plMSNumber: 'DHKMS3001', plRemark: 'Govt. COM Usages', plTotalArea: 500,
          plTotalBuildingCoverArea: 250, plNumberOfBuilding: 1, plHeightFromMSL: 1.75
        }
      });
      // Transform Coordinates Points
      featurePolygonPlot.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      // generate vector source with polygon feature
      vectorSourcePlot = new ol.source.Vector({
        features: [featurePolygonPlot]
      });

      // define a vector layer with the vector source
      vectorLayerPlot = new ol.layer.Vector({
        source: vectorSourcePlot,
        style: stylePlot
      });
      // finally add the vector layer into the map
      this.map.addLayer(vectorLayerPlot);
    }

    /**
    * Registred Building info from REST APIs call
    *
    */
    // Polygon Geometry Coordinate Points
    let featurePolygonBuilding, coordinatesBuilding, vectorSourceBuilding, vectorLayerBuilding;
    for (i = 1; i <= 10; i++) {
      rv = Math.random();
      coordinatesBuilding = [[
        [90.36628065 + 0.001 * rv, 23.82759163 + 0.001 * rv],
        [90.36649858 + 0.001 * rv, 23.82763242 + 0.001 * rv],
        [90.36651601 + 0.001 * rv, 23.82749901 + 0.001 * rv],
        [90.36629575 + 0.001 * rv, 23.82746497 + 0.001 * rv],
        [90.36628065 + 0.001 * rv, 23.82759163 + 0.001 * rv]
      ]];
      // Form the polygon feature geometry with respective properties.
      featurePolygonBuilding = new ol.Feature({
        geometry: new ol.geom.Polygon(coordinatesBuilding),
        buildingInfo: {
          buId: 200000, buAddressId: 300001, buPlId: 30000001, userRefNrId: 400000, buCode: 'DHK-1001',
          buName: 'DHKPA 1001', buUseType: 'Commercial', buNumberOfFloor: 7, buTotalHeight: 1001,
          buNumberOfFloorUnit: 20, buTotalGroundArea: 30, buTotalFloorArea: 50, buSetBackFront: 30,
          buSetBackBack: 30, buSetBackRight: 20, buSetBackLeft: 15,
          buCenterLongitude: 90.50, buCenterLatitude: 23.36456, buRemark: 'Govt. COM Usages'
        }
      });
      // Transform Coordinates Points
      featurePolygonBuilding.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      // generate vector source with polygon feature
      vectorSourceBuilding = new ol.source.Vector({
        features: [featurePolygonBuilding]
      });

      // define a vector layer with the vector source
      vectorLayerBuilding = new ol.layer.Vector({
        source: vectorSourceBuilding,
        style: styleBuilding
      });
      // finally add the vector layer into the map
      this.map.addLayer(vectorLayerBuilding);
    }

    /**
    * Polygon geometry for User Address, Plot, Building, Floor and Unit Registration
    *
    */
    // Polygon Geometry Coordinate Points
    let featurePolygonFloor, coordinatesFloor, vectorSourceFloor, vectorLayerFloor;
    for (i = 1; i <= 10; i++) {
      rv = Math.random();
      coordinatesFloor = [[
        [90.36640086 + 0.001 * rv, 23.82761702 + 0.001 * rv],
        [90.36649858 + 0.001 * rv, 23.82763242 + 0.001 * rv],
        [90.36651601 + 0.001 * rv, 23.82749901 + 0.001 * rv],
        [90.36641059 + 0.001 * rv, 23.82748422 + 0.001 * rv],
        [90.36640086 + 0.001 * rv, 23.82761702 + 0.001 * rv]
      ]];
      // Form the polygon feature geometry with respective properties.
      featurePolygonFloor = new ol.Feature({
        geometry: new ol.geom.Polygon(coordinatesFloor),
        floorInfo: {
          flId: 500000, flBuId: 500001, userRefNrId: 500000, flCode: 'DHK-5001',
          flName: 'DHKPA-5001', flUseType: 'Commercial', flNumberOfFloorUnit: 7, flTotalFloorArea: 15,
          flTotalFloorHeight: 20, flCenterLongitude: 90.567, flCenterLatitude: 23.56 ,
          flLayoutPicture: 'image', flUtilityPicture: 'image', plRemark: 'Govt. COM Usages'
        }
      });
      // Transform Coordinates Points
      featurePolygonFloor.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      // generate vector source with polygon feature
      vectorSourceFloor = new ol.source.Vector({
        features: [featurePolygonFloor]
      });

      // define a vector layer with the vector source
      vectorLayerFloor = new ol.layer.Vector({
        source: vectorSourceFloor,
        style: styleFloor
      });
      // finally add the vector layer into the map
      this.map.addLayer(vectorLayerFloor);
    }
    /**
        * Polygon geometry for User Address, Plot, Building, Floor and Unit Registration
        *
        */
    // Polygon Geometry Coordinate Points
    let featurePolygonUnit, coordinatesUnit, vectorSourceUnit, vectorLayerUnit;
    for (i = 1; i <= 10; i++) {
      rv = Math.random();
      coordinatesUnit = [[
        [90.36640086 + 0.001 * rv, 23.82761702 + 0.001 * rv],
        [90.36649858 + 0.001 * rv, 23.82763242 + 0.001 * rv],
        [90.36650428 + 0.001 * rv, 23.82758403 + 0.001 * rv],
        [90.36645331 + 0.001 * rv, 23.82757606 + 0.001 * rv],
        [90.36645264 + 0.001 * rv, 23.82759753 + 0.001 * rv],
        [90.36640235 + 0.001 * rv, 23.82759262 + 0.001 * rv],
        [90.36640086 + 0.001 * rv, 23.82761702 + 0.001 * rv]
      ]];
      // Form the polygon feature geometry with respective properties.
      featurePolygonUnit = new ol.Feature({
        geometry: new ol.geom.Polygon(coordinatesUnit),
        unitInfo: {
          unId: 600000, unflId: 600001, userRefNrId: 600000, unCode: 'DHK-1001',
          unName: 'DHKPA 1001', unUseType: 'Commercial', unNumberOfFloorUnit: 12, unTotalUnitArea: 30,
          unTotalHeight: 20, unCenterLongitude: 90.567,  unCenterLatitude: 23.500,
          unLayoutPicture: 'image', unUtilityPicture: 'image', plRemark: 'Govt. COM Usages'
        }
      });
      // Transform Coordinates Points
      featurePolygonUnit.getGeometry().transform('EPSG:4326', 'EPSG:3857');
      // generate vector source with polygon feature
      vectorSourceUnit = new ol.source.Vector({
        features: [featurePolygonUnit]
      });

      // define a vector layer with the vector source
      vectorLayerUnit = new ol.layer.Vector({
        source: vectorSourceUnit,
        style: styleUnit
      });
      // finally add the vector layer into the map
      this.map.addLayer(vectorLayerUnit);
    }

    /*
    Main Road network in Bangladesh from GeoFabrick/OSM datasets
    Dataset stored into PostGIS database and GeoServer configured and
    generate respective WMS  services.
    */
    uvsoftgroupgeospatialLayerMainRoad = new TileWMS({
      url: this.baseurl,
      params: { 'layers': 'uvsoftgroupgeospatial:primary_roads', 'TILED': true },
      serverType: 'geoserver',
      transition: 0
    });
    wmsMainRoadLayer = new TileLayer({
      source: uvsoftgroupgeospatialLayerMainRoad
    });
    this.map.addLayer(wmsMainRoadLayer);

     /*
    Complete Road network in Bangladesh from GeoFabrick/OSM datasets
    Dataset stored into PostGIS database and GeoServer configured and
    generate respective WMS  services.
    */
    uvsoftgroupgeospatialLayerRoad = new TileWMS({
      url: this.baseurl,
      params: { 'layers': 'uvsoftgroupgeospatial:roads', 'TILED': true },
      serverType: 'geoserver',
      transition: 0
    });
    wmsRoadLayer = new TileLayer({
      source: uvsoftgroupgeospatialLayerRoad
    });
    //this.map.addLayer(wmsRoadLayer);
  }


}
