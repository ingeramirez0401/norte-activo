import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SidebarService, UserService } from '../../services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  userProfile: any;
  constructor( private _localStorage: LocalStorageService, public _sidebarService: SidebarService, public _userService: UserService ) { }

  ngOnInit() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
  }

}
