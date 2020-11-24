import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set (key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  get (key: string) {
    return localStorage.getItem(key);
  }

  setObject (key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getObject (key: string) {
    return localStorage.getItem(key);
  }

  getParsedObject (key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  remove (key: string) {
    localStorage.removeItem(key);
  }
}
