import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllProfiles() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/profiles', { headers });
  }

  getProfile(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/profiles/' + id, { headers });
  }

  saveProfile(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let ProfileId = data.ProfileId;
    let Name = data.Name;
    let Description = data.Description;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ ProfileId, Name, Description, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/profiles", body, options);
  }

  updateProfile(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let ProfileId = data.ProfileId;
    let Name = data.Name;
    let Description = data.Description;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ ProfileId, Name, Description, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.baseUrl + "/profiles/" + ProfileId, body, options);
  }

  deleteProfile(profileId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete(this.baseUrl + '/profiles/'+ profileId, { headers });
  }
}

