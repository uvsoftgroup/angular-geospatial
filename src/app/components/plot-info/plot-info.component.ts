import { Component, OnInit } from '@angular/core';
import { PlotInfo } from 'src/app/domain_model/plot-info';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-plot-info',
  templateUrl: './plot-info.component.html',
  styleUrls: ['./plot-info.component.scss']
})
export class PlotInfoComponent implements OnInit {
  public plotInfo = new PlotInfo('');
  public plotsRegistration: PlotInfo[] = [];
  public showDetails = false;
  public plotTypeInfos: any[];

  public constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  plotRegistrationForm = this.formBuilder.group({
    plId: ['', Validators.required],
    plAddressId: [''],
    userRefNrId: [''],
    plCode: [''],
    plName: [''],
    plType: [''],
    plNumber: [''],
    plMonzaNumber: [''],
    plCSNumber: [''],
    plMSNumber: [''],
    plRemark: [''],
    plTotalArea: [''],
    plTotalBuildingCoverArea: [''],
    plNumberOfBuilding: [''],
    plHeightFromMSL: [''],
    plCenterLongitude: [''],
    plCenterLatitude: [''],
    plLayoutPicture: [''],
    utilityLocationMap: [''],
  });

  public selectedItem: any = {
    plId: '',
    plAddressId: '',
    userRefNrId: '',
    plCode: '',
    plName: '',
    plType: '',
  };


 public ngOnInit() {
    this.plotTypeInfos = [
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

  this.getPlotRegistrationAll();
}
public getPlotRegistrationAll() {
  console.log('---------getPlotRegistrationAll(..):');
 return this.plotsRegistration ;
}

public addOrSavePlotRegistration() {
  console.log('---------addOrSavePlotRegistration(..):');
  this.showDetails = true;
}

public getPlotRegistrationById(id: number) {
  console.log('---------getPlotRegistrationById(.):');
  return this.plotInfo;
}

public plotRegistrationGenerator() {
  console.log('---------plotRoleGenerator():');
  this.showDetails = true;
}

public plotRegistrationDelete() {
  console.log('---------plotRegistrationDelete():"');
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
