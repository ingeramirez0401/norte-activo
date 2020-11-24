import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllZipCodes() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/zipcodes', { headers });
  }

  getZipCode(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/zipcodes/' + id, { headers });
  }

  filterByCity(id: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let ZipCodeId = 0;
    let CityId = id;
    let Name = "";

    let body = JSON.stringify({ ZipCodeId, CityId, Name });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/zipcodes/GetFilter", body, options);
  }

  saveZipCode(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let ZipCodeId = data.ZipCodeId;
    let CityId = data.CityId;
    let Name = data.Name;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ ZipCodeId, CityId, Name, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/zipcodes", body, options);
  }

  updateZipCode(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let ZipCodeId = data.ZipCodeId;
    let CityId = data.CityId;
    let Name = data.Name;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ ZipCodeId, CityId, Name, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/zipcodes/Update", body, options);
  }

  deleteZipCode(zipCodeId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let ZipCodeId = zipCodeId;
    let body = JSON.stringify({ ZipCodeId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/zipcodes/Delete', body, { headers });
  }
}
