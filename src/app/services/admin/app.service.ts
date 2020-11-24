import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LocalStorageService, ConfigService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl: string = '';
  userProfile: any;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _http: Http, private _configService: ConfigService) { 
    this.baseUrl = _configService.getApiURI();
  }

  getDepartments() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/departments', { headers });
  }

  getCities() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    return this._http.get(this.baseUrl + '/cities', { headers });
  }
}
