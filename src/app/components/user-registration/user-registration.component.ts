import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRegistration } from '../../domain_model/user-registration';
import { UserRegistrationService } from '../../services/user-registration/user-registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  public userRegistration = new UserRegistration('');
  public userRegistrations: UserRegistration[] = [];
  public showDetails = false;

  public selectedItem: any = {
    userRegistrationId: '',
    userAddressId: '',
    userRoleName: '',
    userRoleType: '',
    userRoleDate: '',
    userRoleMDate: '',
  };

  public constructor(private userRegistrationService: UserRegistrationService) { }

  public ngOnInit() {
    this.getUserRegistrationAll();
  }
  public getUserRegistrationAll() {
    console.log('---------getUserRegistrationAll(..):');
    this.userRegistrations = this.userRegistrationService.getUserRegistrationAll();
   return this.userRegistrations ;
  }

  public addOrSaveUserRegistration() {
    console.log('---------addOrSaveReportTemplate(..):');
    this.showDetails = true;
  }

  public getUserRegistrationById(id: number) {
    console.log('---------getReportTemplateById(.):');
  }

  public userRegistrationGenerator() {
    console.log('---------userRoleGenerator():');
    this.showDetails = true;
  }

  public userRegistrationDelete() {
    console.log('---------userRoleDelete():"');
    this.showDetails = true;
  }

  public saveEditDeleteCancel() {
    console.log('--------saveEditDeleteCancel()');
    this.showDetails = false;
  }

  public onSelectionChanged(event: any) {
    this.selectedItem = event;
    console.log('selection changed' + this.selectedItem.userRegistrationId);
  }
}
