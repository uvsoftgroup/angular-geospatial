import { Component, OnInit } from '@angular/core';
import { UserAddressService } from 'src/app/services/user-address/user-address.service';
import { AddressInfo } from 'src/app/domain_model/address-info';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, toLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import 'ol/ol.css';
import { defaults as defaultInteractions, Draw, Modify, Snap, Select } from 'ol/interaction';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';


declare const $: any;
// Declare ol variable globally
declare const ol: any;


@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit {

  public addressInfo = new AddressInfo('');
  public addressInfos: any[];
  public showDetails = false;
  public addressTypeInfos: any[];
  public roadTypeInfos: any[];
  public geometryTypeInfos: any[];
  public showVar = true;

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
  public plotInfo: any;


  addressRegistrationForm = this.fb.group({
    adId: ['', Validators.required],
    userRefNrId: [''],
    geometryGisData: this.fb.group({
      adRefId: [''],
      adType: [''],
      adCity: [''],
      adRoad: [''],
      adRoadType: [''],
      adHouseNumber: [''],
      adPostCode: [''],
      geoType: [''],
      wktToGeometry: [''],
      adCountry: ['']
    })
  });

  public selectedItem: any = {
    adId: '',
    userRefNrId: '',
    adRefId: '',
    adType: '',
    adCity: '',
    adRoad: '',
    adRoadType: '',
    adHouseNumber: '',
    adPostCode: '',
    geoType: '',
    wktToGeometry: '',
    adCountry: '',
  };

  public constructor(
    private http: HttpClient,
    private userAddressService: UserAddressService,
    private fb: FormBuilder) {
    console.log('');
  }

  public ngOnInit() {

    this.addressTypeInfos = [
      {label: '1', value: 'Temporary'},
      {label: '2', value: 'Parmanent'},
      {label: '3', value: 'Summmer'},
      {label: '4', value: 'Winter'},
      {label: '5', value: 'Office'}
    ];

    this.roadTypeInfos = [
      {label: '6', value: 'Primary'},
      {label: '5', value: 'Secondary'},
      {label: '4', value: 'Tertiary'},
      {label: '3', value: 'Access'},
      {label: '2', value: 'Highway'},
      {label: '1', value: 'SubHighway'}
    ];

    this.geometryTypeInfos = [
      {label: '1', value: 'Polygon'},
      {label: '2', value: 'MultiPolygon'},
      {label: '3', value: 'Line'},
      {label: '4', value: 'LineString'},
      {label: '5', value: 'Point'}
    ];

    console.log('--------------ngOnInit()');
    const coord = [90.37126734852791, 23.825515115835344];
    const out = toStringHDMS(coord);
    console.log('--------------out:' + out);
    this.getAddressAll();
  }

  public  toggleChild() {
        this.showVar = !this.showVar;
    }

  public getAddressAll() {
    console.log('---------getUserRegistrationAll(..):');
    this.addressInfos = this.userAddressService.getAddressAll();
    return this.addressInfos;
  }

  public userAddressGenerator() {
    console.log('---------userRoleGenerator():');
    this.showDetails = true;
  }

  public addOrSaveUserAddress(addressInfo: AddressInfo) {
    console.log('---------addOrSaveUserAddress(..):');
    this.showDetails = true;
  }

  public getUserAddressById(id: number) {
    console.log('---------getUserAddressById(.):');
  }

  public userAddressDelete(id: number) {
    console.log('---------userRoleDelete():"');
    this.showDetails = true;
  }

  public saveEditDeleteCancel() {
    console.log('--------saveEditDeleteCancel()');
    this.showDetails = false;
  }

  public drawModifyVectorFeature() {
    console.log('--------------drawModifyVectorFeature()');

    this.showDetails = true;

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
        type: 'Polygon',
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
    addInteractions();

  }

  public onSelectionChanged(event: any) {
    this.selectedItem = event;
    console.log('selection changed' + this.selectedItem.id);
  }

}
