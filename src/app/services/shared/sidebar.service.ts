import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services.index';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {
userProfile: any;
menu: any [] = [];
  constructor(private _localStorage: LocalStorageService) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
  }
}
