import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllCountries() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/countries', { headers });
  }

  getCountry(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/countries/' + id, { headers });
  }

  saveCountry(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CountryId = data.CountryId;
    let Name = data.Name;
    let Code = data.Code;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ CountryId, Name, Code, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/countries", body, options);
  }

  updateCountry(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CountryId = data.CountryId;
    let Name = data.Name;
    let Code = data.Code;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ CountryId, Name, Code, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/countries/Update", body, options);
  }

  deleteCountry(countryId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CountryId = countryId;

    let body = JSON.stringify({ CountryId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/countries/Delete', body, { headers });
  }
}
