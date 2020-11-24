import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService, LocalStorageService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllCategories() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/categories', { headers });
  }

  getCategory(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/categories/' + id, { headers });
  }

  saveCategory(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CategoryId = data.CategoryId;
    let Name = data.Name;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ CategoryId, Name, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/categories", body, options);
  }

  updateCategory(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CategoryId = data.CategoryId;
    let Name = data.Name;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ CategoryId, Name, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/categories/Update", body, options);
  }

  deleteCategory(categoryId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let CategoryId = categoryId;
    let body = JSON.stringify({ CategoryId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/categories/Delete', body, { headers });
  }
}
