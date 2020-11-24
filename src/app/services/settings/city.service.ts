import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllCities() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/cities', { headers });
  }

  getCity(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/cities/' + id, { headers });
  }

  filterByDepartment(id: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CityId = 0;
    let CountryId = 0;
    let DepartmentId = id;
    let Name = "";
    let Code = "";

    let body = JSON.stringify({ CityId, DepartmentId, CountryId, Name, Code });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/cities/GetFilter", body, options);
  }

  saveCity(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CityId = data.CityId;
    let DepartmentId = data.DepartmentId;
    let CountryId = data.CountryId;
    let Name = data.Name;
    let Code = data.Code;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ CityId, DepartmentId, CountryId, Name, Code, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/cities", body, options);
  }

  updateCity(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CityId = data.CityId;
    let DepartmentId = data.DepartmentId;
    let CountryId = data.CountryId;
    let Name = data.Name;
    let Code = data.Code;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ CityId, DepartmentId, CountryId, Name, Code, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/cities/Update", body, options);
  }

  deleteCity(cityId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CityId = cityId;
    let body = JSON.stringify({ CityId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/cities/Delete', body, { headers });
  }
}
