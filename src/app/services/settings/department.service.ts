import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllDepartments() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/departments', { headers });
  }

  getDepartment(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/departments/' + id, { headers });
  }

  filterByCountry(id: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let DepartmentId = 0;
    let CountryId = id;
    let Name = "";
    let Code = "";

    let body = JSON.stringify({ DepartmentId, CountryId, Name, Code });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/departments/GetFilter", body, options);
  }

  saveDepartment(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let DepartmentId = data.DepartmentId;
    let CountryId = data.CountryId;
    let Name = data.Name;
    let Code = data.Code;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ DepartmentId, CountryId, Name, Code, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/departments", body, options);
  }

  updateDepartment(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let DepartmentId = data.DepartmentId;
    let CountryId = data.CountryId;
    let Name = data.Name;
    let Code = data.Code;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ DepartmentId, CountryId, Name, Code, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/departments/Update",body, options);
  }

  deleteDepartment(departmentId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let DepartmentId = departmentId;
    let body = JSON.stringify({ DepartmentId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/departments/Delete', body, { headers });
  }
}
