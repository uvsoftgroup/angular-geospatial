import { Component, OnInit, Input } from '@angular/core';
import 'ol/ol.css';
import { defaults as defaultInteractions, Draw, Modify, Snap, Select } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import {
  defaults as defaultControls, ScaleLine, LayerSwitcher,
  MousePosition, EditingToolbar, PanZoomBar, Navigation,
  KeyboardDefaults, OverviewMap, SelectFeature, Control
} from 'ol/control';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { HttpClient } from '@angular/common/http';

declare const $: any;
// Declare ol variable globally
declare const ol: any;

@Component({
  selector: 'app-geoserver-application-portal',
  templateUrl: './geoserver-application-portal.component.html',
  styleUrls: ['./geoserver-application-portal.component.scss']
})
export class GeoserverApplicationPortalComponent implements OnInit {
  @Input() showMePartiallyMap: boolean;
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  geometryTypes: any[];
  selectedValue: any;
  selectedValueForMap: any;
  baseurl: any;

  public constructor(private http: HttpClient) {
    this.baseurl = 'http://localhost:7777/geoserver/uvsoftgroupgeospatial/wms'; // geoserver_map
    console.log('--------------this.baseurl:' + this.baseurl);
  }

  public ngOnInit() {
    console.log('--------------ngOnInit()');
    this.drawModifyVectorFeature();
  }
  public drawModifyVectorFeature() {
    console.log('--------------osmMapDynamicDataView()');

    let mousePositionControl, baseMap, viewMapCenter, controlsMap, mapScale, centerLocation,
      viewResolution, viewProjection, url, overviewMap, layerSwitcher;
    let uvsoftgroupgeospatialLayerAddress, uvsoftgroupgeospatialLayerPlot,
      uvsoftgroupgeospatialLayerBuilding, uvsoftgroupgeospatialLayerFloor, wmsAddressLayer,
      wmsPlotLayer, wmsBuildingLayer, wmsFloorLayer, uvsoftgroupgeospatialLayerMainRoad,
      uvsoftgroupgeospatialLayerRoad, wmsMainRoadLayer, wmsRoadLayer
      ;

    // Mouse Position Control from click event into Map
    mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(8),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    wmsRoadLayer = new TileLayer({
      source: uvsoftgroupgeospatialLayerRoad
    });

    centerLocation = ol.proj.fromLonLat([90.3717065602541, 23.82585617006994]);

    baseMap = new ol.layer.Tile({ source: new ol.source.OSM() });
    viewMapCenter = new ol.View({
      center: centerLocation,
      zoom: 13
    });

    mapScale = new ScaleLine({ units: 'metric' });
    overviewMap = new OverviewMap();

    viewProjection = viewMapCenter.getProjection();
    viewResolution = viewMapCenter.getResolution();

    console.log('-----Projection:' + viewProjection + ' and Resolution:' + viewResolution);

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

    /*
     uvsoftgroupgeospatialLayerAddress = new TileWMS({
       url: this.baseurl,
       params: { 'layers': 'uvsoftgroupgeospatial:geometry_gis_data_info', 'TILED': true },
       serverType: 'geoserver',
       transition: 0
     });

     wmsAddressLayer = new TileLayer({
       source: uvsoftgroupgeospatialLayerAddress
     });
     this.map.addLayer(wmsAddressLayer);

     uvsoftgroupgeospatialLayerPlot = new TileWMS({
       url: this.baseurl,
       params: { 'layers': 'uvsoftgroupgeospatial:geometry_gis_data_info', 'TILED': true },
       serverType: 'geoserver',
       transition: 0
     });

     wmsPlotLayer = new TileLayer({
       source: uvsoftgroupgeospatialLayerPlot
     });

     this.map.addLayer(wmsPlotLayer);
     */
    uvsoftgroupgeospatialLayerBuilding = new TileWMS({
      url: this.baseurl,
      params: { 'layers': 'uvsoftgroupgeospatial:geometry_gis_data_info', 'TILED': true },
      serverType: 'geoserver',
      transition: 0
    });
    wmsBuildingLayer = new TileLayer({
      source: uvsoftgroupgeospatialLayerBuilding
    });
    this.map.addLayer(wmsBuildingLayer);

    /*
     uvsoftgroupgeospatialLayerFloor = new TileWMS({
       url: this.baseurl,
       params: { 'layers': 'uvsoftgroupgeospatial:geometry_gis_data_info', 'TILED': true },
       serverType: 'geoserver',
       transition: 0
     });
     wmsFloorLayer = new TileLayer({
       source: uvsoftgroupgeospatialLayerFloor
     });
     this.map.addLayer(wmsFloorLayer);
     */

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
    this.map.addLayer(wmsRoadLayer);

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

    var vector_layer = new VectorLayer('Basic Vector Layer');
    this.map.addLayer(vector_layer);

    this.map.addControl(new ol.Control.LayerSwitcher());
    this.map.addControl(new ol.Control.MousePosition());
    this.map.addControl(new ol.Control.Navigation());
    this.map.addControl(new ol.Control.PanZoomBar());
    this.map.addControl(new ol.Control.MousePosition({}));
    this.map.addControl(new ol.Control.ScaleLine({}));
    this.map.addControl(new ol.Control.EditingToolbar(vector_layer));
    this.map.addControl(new ol.Control.KeyboardDefaults({}));
    this.map.addControl(new ol.Control.OverviewMap({
      maximized: true
    }));
    this.map.addControl(new ol.Control.SelectFeature({}));

    this.map.on('singleclick', function (evt) {
      document.getElementById('info').innerHTML = '';
      url = wmsRoadLayer.getFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });
      if (url) {
        fetch(url)
          .then(function (response) { return response.text(); })
          .then(function (html) {
            document.getElementById('info').innerHTML = html;
          });
      }
    });
    /*
   this.map.on('pointermove', function(evt) {
     if (evt.dragging) {
       return;
     }
     let pixel = this.map.getEventPixel(evt.originalEvent);
     let hit = this.map.forEachLayerAtPixel(pixel, function() {
       return true;
     });
     this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
   });
  */

  }


}
