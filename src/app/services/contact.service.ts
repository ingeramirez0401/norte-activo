import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions } from '@angular/http';
import { ConfigService, LocalStorageService } from './services.index';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllContacts() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/contacts', { headers });
  }

  getContactInfo(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/contacts/' + id, { headers });
  }

  saveData(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let ContactId = data.ContactId;
    let Name = data.Name;
    let LastName = data.LastName;
    let Email = data.Email;
    let Telefono = data.Telefono;
    let Message = data.Message;

    let body = JSON.stringify({ ContactId, Name, LastName, Email, Telefono, Message });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/contacts", body, options);
  }

  deleteData(contactId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let ContactId = contactId;
    let body = JSON.stringify({ ContactId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/contacts/Delete', body, { headers });
  }

}
