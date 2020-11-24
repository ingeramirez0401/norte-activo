import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllStates() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/states', { headers });
  }

  getState(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/states/' + id, { headers });
  }

  saveState(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let StateId = data.StateId;
    let Name = data.Name;
    let Description = data.Description;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ StateId, Name, Description, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/states", body, options);
  }

  updateState(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let StateId = data.StateId;
    let Name = data.Name;
    let Description = data.Description;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ StateId, Name, Description, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/states/Update", body, options);
  }

  deleteState(stateId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let StateId = stateId;
    let body = JSON.stringify({ StateId });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/states/Delete', body, { headers });
  }
}
