import { Injectable } from '@angular/core';
import { UserRegistration } from 'src/app/domain_model/user-registration';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  public userRegistration = new UserRegistration('');
  public userRegistrations: any;

 public constructor() { }

 public getUserRegistrationAll() {
  console.log('---------getUserRegistrationAll(..):');
  this.userRegistrations = [
    {
      userRegistrationId: 1000,
      userAddressId: 20001,
      userRegistrationName: 'TestUser',
      userMail: 'test@test.com',
      userRegistrationCrDate: '2019/11/13',
      userRegistrationLDate: '2019/11/20',
      userRegistrationfullName: 'Test User Full Name',
    },

    {
      userRegistrationId: 1001,
      userAddressId: 20002,
      userRegistrationName: 'TestUser2',
      userMail: 'test@test.com',
      userRegistrationCrDate: '2019/11/13',
      userRegistrationLDate: '2019/11/20',
      userRegistrationfullName: 'Test User 2 Full Name',
    },

  ];
  return this.userRegistrations;

}

}
