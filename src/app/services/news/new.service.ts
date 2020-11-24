import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class NewService {
  baseUrl: string = '';
  public loggedIn = false;
  userProfile: any;
  tokenData: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.loggedIn = !!this._localStorage.get('calles-data');
    this.baseUrl = this._configService.getApiURI();
  }

  getAllNews() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/news', { headers });
  }

  getNewInfo(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/news/' + id, { headers });
  }

  saveData(newData: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let NewId = newData.NewId;
    let ShortTitle = newData.ShortTitle;
    let Title = newData.Title;
    let Route = newData.Route;
    let Date = newData.Date;
    let Content = newData.Content;
    let CoverImage = newData.CoverImage;
    let UserPersonId = newData.UserPersonId;
    let Featured = newData.Featured;
    let Active = newData.Active;
    let CategoryId = newData.CategoryId;


    let body = JSON.stringify({ NewId, ShortTitle, Title, Route, Date, Content, CoverImage, Featured, Active, UserPersonId, CategoryId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/news", body, options);
  }

  updateData(newData: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let NewId = newData.NewId;
    let ShortTitle = newData.ShortTitle;
    let Title = newData.Title;
    let Route = newData.Route;
    let Date = newData.Date;
    let Content = newData.Content;
    let CoverImage = newData.CoverImage;
    let UserPersonId = newData.UserPersonId;
    let Featured = newData.Featured;
    let Active = newData.Active;
    let CategoryId = newData.CategoryId;

    let body = JSON.stringify({ NewId, ShortTitle, Title, Route, Date, Content, CoverImage, Featured, Active, UserPersonId, CategoryId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/news/Update", body, options);
  }

  disableData(newId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let NewId = newId;
    let body = JSON.stringify({ NewId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/news/Disable', body, { headers });
  }

  deleteData(newId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let NewId = newId;
    let body = JSON.stringify({ NewId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/news/Delete', body, { headers });
  }

  deleteImage(newId: number, urlImg: string){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let id = newId;
    let urlImagen = urlImg;

    let body = JSON.stringify({id, urlImagen});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/news/deleteImage', body, { headers });
  }

  deleteFile(newId: number, urlImg: string){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let id = newId;
    let urlImagen = urlImg;

    let body = JSON.stringify({id, urlImagen});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/news/deleteFile', body, { headers });
  }

  destacarImage(newId: number, urlImg: string){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let id = newId;
    let urlImagen = urlImg;

    let body = JSON.stringify({id, urlImagen});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/news/destacarImage', body, { headers });
  }
}
