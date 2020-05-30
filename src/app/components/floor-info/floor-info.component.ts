import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FloorInfo } from 'src/app/domain_model/floor-info';

@Component({
  selector: 'app-floor-info',
  templateUrl: './floor-info.component.html',
  styleUrls: ['./floor-info.component.scss']
})
export class FloorInfoComponent implements OnInit {

  floorRegistrationForm: FormGroup;
  public floorInfo = new FloorInfo('');
  public floorRegistration: FloorInfo[] = [];
  public showDetails = false;
  public floorTypeInfos: any[];

  public constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  public selectedItem: any = {
    flId: '',
    flBuId: '',
    userRefNrId: '',
    flCode: '',
    flName: '',
    flUseType: '',
  };


 public ngOnInit() {
  this.floorRegistrationForm = this.formBuilder.group({
    flId: ['', Validators.required],
    flBuId: [''],
    userRefNrId: [''],
    flCode: [''],
    flName: [''],
    flUseType: [''],
    flNumberOfFloorUnit: [''],
    flTotalFloorArea: [''],
    flTotalFloorHeight: [''],
    flCenterLongitude: [''],
    flCenterLatitude: [''],
    flLayoutPicture: [''],
    flUtilityPicture: [''],
    flRemark: [''],
  });
    this.floorTypeInfos = [
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

  this.getFloorRegistrationAll();
}
  public getFloorRegistrationAll() {
    console.log('---------getFloorRegistrationAll(..):');
  this.showDetails = true;
  }

public addOrSaveFloorRegistration() {
  console.log('---------addOrSaveFloorRegistration(..):');
  this.showDetails = true;
}

public getFloorRegistrationById(id: number) {
  console.log('---------getFloorRegistrationById(.):');
  return this.floorInfo;
}

public floorRegistrationGenerator() {
  console.log('---------floorRoleGenerator():');
  this.showDetails = true;
}

public floorRegistrationDelete() {
  console.log('---------floorRegistrationDelete():"');
  this.showDetails = true;
}

public saveEditDeleteCancel() {
  console.log('--------saveEditDeleteCancel()');
  this.showDetails = false;
}

public mapLoadingCoordinatePoints(){
  this.showDetails = false;
}
public onSelectionChanged(event: any) {
  this.selectedItem = event;
  console.log('selection changed' + this.selectedItem.plId);
}

}
