import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BuildingInfo } from 'src/app/domain_model/building-info';

@Component({
  selector: 'app-building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.scss']
})
export class BuildingInfoComponent implements OnInit {

  public buildingInfo = new BuildingInfo('');
  public buildingsRegistration: BuildingInfo[] = [];
  public showDetails = false;
  public buildingTypeInfos: any[];

  public constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  buildingRegistrationForm = this.formBuilder.group({
    buId: ['', Validators.required],
    buAddressId: [''],
    buPlId: [''],
    userRefNrId: [''],
    buCode: [''],
    buName: [''],
    buUseType: [''],
    buNumberOfFloor: [''],
    buTotalHeight: [''],
    buNumberOfFloorUnit: [''],
    buTotalGroundArea: [''],
    buTotalFloorArea: [''],
    buSetBackFront: [''],
    buSetBackBack: [''],
    buSetBackRight: [''],
    buSetBackLeft: [''],
    buCenterLongitude: [''],
    buCenterLatitude: [''],
    buLayoutPicture: [''],
    buUtilityPicture: [''],
    buRemark: [''],
  });

  public selectedItem: any = {
    buId: '',
    buAddressId: '',
    buPlId: '',
    userRefNrId: '',
    buCode: '',
    buName: '',
  };


 public ngOnInit() {
    this.buildingTypeInfos = [
    {label: '1', value: 'Residential'},
    {label: '2', value: 'Commercial'},
    {label: '3', value: 'Industrial'},
    {label: '4', value: 'Mixed Usage'},
    {label: '5', value: 'Mixed Residential-Commercial'},
    {label: '6', value: 'Mixed Commercial-Industrial'},
    {label: '7', value: 'Educational'},
    {label: '8', value: 'Recrational'},
    {label: '9', value: 'Others'}
  ];

  this.getBuildingRegistrationAll();
}
public getBuildingRegistrationAll() {
  console.log('---------getBuildingRegistrationAll(..):');
 return this.buildingsRegistration ;
}

public addOrSaveBuildingRegistration() {
  console.log('---------addOrSaveBuildingRegistration(..):');
  this.showDetails = true;
}

public getBuildingRegistrationById(id: number) {
  console.log('---------getBuildingRegistrationById(.):');
  return this.buildingInfo;
}

public buildingRegistrationGenerator() {
  console.log('---------buildingRoleGenerator():');
  this.showDetails = true;
}

public buildingRegistrationDelete() {
  console.log('---------buildingRegistrationDelete():"');
  this.showDetails = true;
}

public saveEditDeleteCancel() {
  console.log('--------saveEditDeleteCancel()');
  this.showDetails = false;
}

public mapLoadingCoordinatePoints() {
  this.showDetails = false;
}
public onSelectionChanged(event: any) {
  this.selectedItem = event;
  console.log('selection changed' + this.selectedItem.buId);
}

}

