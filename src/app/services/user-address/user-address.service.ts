import { Injectable } from '@angular/core';
import { AddressInfo } from 'src/app/domain_model/address-info';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {
  public addressInfo = new AddressInfo('');
  public addressInfos: any[];
  private seperator = '/';
  private baseUrl = '/api';

  public constructor(private http: HttpClient) {
    console.log('------------baseUrl:' + this.baseUrl);
    this.baseUrl = this.baseUrl + this.seperator + 'getAddressAll';
  }

  public getAddressAll() {
    console.log('---------getAddressAll():');
    this.addressInfos = [
      {
        adId: 1000,
        userRefNrId: 20001,
        geometryGisData: {}
      },
      {
        adId: 1000,
        userRefNrId: 20001,
        geometryGisData: {}
      },
      {
        adId: 1000,
        userRefNrId: 20001,
        geometryGisData: {}
      }
    ];
    return this.addressInfos;
  }

  public addOrSaveUserAddress(addressInfo: AddressInfo) {
    console.log('---------addOrSaveUserAddress(.):');
    // todo: REST API call
  }

  public getUserAddressById(adId: number) {
    console.log('---------getUserAddressById(.):');
    // todo: REST API call
  }

  public userAddressDelete(adId: number) {
    console.log('---------userRoleDelete(.):');
    // todo: REST API call
  }


}
