import { Injectable } from '@angular/core';
import { ConfigService, LocalStorageService } from '../services.index';
import { Http, Headers, Request, RequestMethod } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  baseUrl: string = '';
  userProfile: any;
  tokenData: any;

  constructor(private _configService: ConfigService, private _localStorage: LocalStorageService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  uploadFile( file: File,type: string,id: any ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);
    formData.append('type', type);
    formData.append('id', id);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/users/UploadImage",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }

  uploadNewImage( file: File,type: string,id: any ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);
    formData.append('type', type);
    formData.append('id', id);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/news/UploadImage",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }

  uploadNewFile( file: File,type: string,id: any ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);
    formData.append('type', type);
    formData.append('id', id);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/news/UploadFile",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }

  uploadExcelFile( file: File ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/sms/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }

  uploadExcelEmailFile( file: File ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/email/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }

  uploadVoluntariosFile( file: File ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/voluntarios/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }

  uploadGestoresFile( file: File ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/gestores/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }

  uploadEstrategicosFile( file: File ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/estrategicos/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }

  uploadGerentesFile( file: File ) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.tokenData = JSON.parse(this.userProfile.auth_token);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.tokenData.auth_token);
    const formData = new FormData();
    formData.append(file.name, file);

    const uploadReq = new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "/gerentes/UploadExcelData",
      body: formData,
      headers: headers
    });

    return this._http.request(uploadReq);
  }
}

export interface FileReaderEventTarget extends EventTarget {
  result:string
  }
  
export interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
  }
