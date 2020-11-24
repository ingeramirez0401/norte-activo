import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserPersonService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllUsers() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/users', { headers });
  }

  getUser(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/users/' + id, { headers });
  }

  saveUser(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let Id = data.Id;
    let Name1 = data.Name1;
    let Name2 = data.Name2;
    let LastName = data.LastName;
    let IdentificationNumber = data.IdentificationNumber;
    let GenreId = data.GenreId;
    let DateOfBirth = data.DateOfBirth;
    let CountryId = data.CountryId;
    let DepartmentId = data.DepartmentId;
    let CityId = data.CityId;
    let ZipCodeId = data.ZipCodeId;
    let Email = data.Email;
    let Phone1 = data.Phone1;
    let Phone2 = data.Phone2;
    let ProfileId = data.ProfileId;
    let StateId = data.StateId;
    let UserName = data.UserName;
    let Password = data.Password;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ Id, Name1, Name2, LastName, IdentificationNumber, GenreId, DateOfBirth, CountryId, DepartmentId, CityId, ZipCodeId, Email, Phone1, Phone2, ProfileId, StateId, UserName, Password, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/users", body, options);
  }

  updateUser(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let Id = data.Id;
    let Name1 = data.Name1;
    let Name2 = data.Name2;
    let LastName = data.LastName;
    let IdentificationNumber = data.IdentificationNumber;
    let GenreId = data.GenreId;
    let DateOfBirth = data.DateOfBirth;
    let CountryId = data.CountryId;
    let DepartmentId = data.DepartmentId;
    let CityId = data.CityId;
    let ZipCodeId = data.ZipCodeId;
    let Email = data.Email;
    let Phone1 = data.Phone1;
    let Phone2 = data.Phone2;
    let ProfileId = data.ProfileId;
    let StateId = data.StateId;
    let UserName = data.UserName;
    let Password = data.Password;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ Id, Name1, Name2, LastName, IdentificationNumber, GenreId, DateOfBirth, CountryId, DepartmentId, CityId, ZipCodeId, Email, Phone1, Phone2, ProfileId, StateId, UserName, Password, LastUserId });


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/users/Update", body, options);
  }

  deleteUser(userId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let Id = userId;

    let body = JSON.stringify({ Id });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/users/Delete', body, { headers });
  }
}
