import { Injectable } from '@angular/core';
import { LocalStorageService, ConfigService } from '../services.index';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  baseUrl: string = '';
  userProfile: any;
  constructor(private _localStorage: LocalStorageService, private _configService: ConfigService, private _http: Http) { 
    this.baseUrl = this._configService.getApiURI();
  }

  getAllGenres() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/genres', { headers });
  }

  getGenre(id: number) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get(this.baseUrl + '/genres/' + id, { headers });
  }

  saveGenre(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let GenreId = data.GenreId;
    let Name = data.Name;
    let Description = data.Description;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ GenreId, Name, Description, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/genres", body, options);
  }

  updateGenres(data: any){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let GenreId = data.GenreId;
    let Name = data.Name;
    let Description = data.Description;
    let LastUserId = this.userProfile.id;

    let body = JSON.stringify({ GenreId, Name, Description, LastUserId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.baseUrl + "/genres/Update", body, options);
  }

  deleteGenre(genreId: number){
    this.userProfile = this._localStorage.getParsedObject("calles-data");

    let GenreId = genreId;
    let body = JSON.stringify({ GenreId });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.baseUrl + '/genres/Delete', body, { headers });
  }
}
