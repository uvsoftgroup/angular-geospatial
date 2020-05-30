import { Component, OnInit, Input } from '@angular/core';
import 'ol/ol.css';
import { defaults as defaultInteractions, Draw, Modify, Snap, Select } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { FormGroup, FormControl } from '@angular/forms';

declare const $: any;
// Declare ol variable globally
declare const ol: any;

@Component({
  selector: 'app-draw-modify-vector-feature-form',
  templateUrl: './draw-modify-vector-feature-form.component.html',
  styleUrls: ['./draw-modify-vector-feature-form.component.scss']
})
export class DrawModifyVectorFeatureFormComponent implements OnInit {

  @Input() showMePartiallyMap: boolean;
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  geometryTypes: any[];
  selectedValue: any;
  selectedValueForMap: any;
  form: FormGroup;

  public constructor() {
    this.form = new FormGroup({
      selectedValue: new FormControl(null)
    });
  }

  public ngOnInit() {
    console.log('--------------ngOnInit()');
    this.geometryTypes = [
      { label: 'Point', value: 'Point' },
      { label: 'LineString', value: 'LineString' },
      { label: 'Polygon', value: 'Polygon' },
      { label: 'Circle', value: 'Circle' }
    ];
    this.drawModifyVectorFeature();
  }

  public drawModifyVectorFeature() {
    console.log('--------------drawModifyVectorFeature()');
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

    const rasterOSM = new TileLayer({
      source: new OSM()
    });

    const source = new VectorSource({ wrapX: false });

    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#A52A2A',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#B8860B'
          })
        })
      })
    });

    const select = new Select({
      wrapX: false
    });

    const modify = new Modify({
      features: select.getFeatures(),
      source: source
    });

    // General and Standard Map loading
    const map = new ol.Map({
      interactions: defaultInteractions().extend([select, modify]),
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),

      // OpenStreet Map Loading
      layers: [rasterOSM, vector],
      // Map view, center location and zoom level
      view: new ol.View({
        center: ol.proj.fromLonLat([90.3717065602541, 23.82585617006994]),
        zoom: 13
      })
    });

    map.addInteraction(modify);

    modify.on('modifyend', function (e) {
      console.log('-----------------modifyend:' + e.features.getArray().length);
    });

    // global variable and also removable for selection
    let draw, snap, polygonString, typeSelect;

    typeSelect = document.getElementById('type');
    console.log('--------------Geometry Selection Type:' + typeSelect);

    function addInteractions() {
      draw = new Draw({
        source: source,
        type: typeSelect.value,
        minPoints: 3
      });
      map.addInteraction(draw);

      draw.on('drawend', function (e) {
        polygonString = e.feature.getGeometry().getCoordinates();
        console.log('--------------Draw Coordinate Points:' + polygonString);
      });

      snap = new Snap({ source: source });

      map.addInteraction(snap);
    }

    /**
     * Handle change event.
     */
    typeSelect.onchange = function () {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      addInteractions();
    };
    addInteractions();
  }

}
