import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { ConfigService, LocalStorageService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = '';
  public loggedIn = false;
  userProfile: any;
  tokenData: any;

  public userData: any;

  constructor( private _configService: ConfigService, private _localStorage: LocalStorageService, private _http: Http ) {
    this.loggedIn = !!this._localStorage.get('calles-data');
    this.baseUrl = this._configService.getApiURI();

    this.userData = this._localStorage.getParsedObject("calles-data");
  }

  login(UserName: string, Password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json, charset=utf-8');
    headers.append('Accept', 'application/json');
    let body = JSON.stringify({ UserName, Password })
    return this._http.post(this.baseUrl + '/auth/login', body, { headers });
  }

  logout() {
    this._localStorage.remove('calles-data');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
