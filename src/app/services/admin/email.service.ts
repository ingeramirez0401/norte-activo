import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LocalStorageService, ConfigService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseUrl: string = '';
  userProfile: any;
  tokenData: any;
  constructor(private _http: Http, private _localStorage: LocalStorageService, private _configService: ConfigService) { 
    this.baseUrl = this._configService.getApiURI();
  }

  sendEmail(email: any) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    let options = new RequestOptions({ headers: headers });
    let Message = email.message;
    let Asunto = email.subject;
    let Recipients = email.recipients;
    let body = JSON.stringify({ Message, Asunto, Recipients }); 
    return this._http.post(this.baseUrl + "/email/Send", body, options);
  }
}
