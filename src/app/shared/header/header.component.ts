import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SidebarService, UserService } from '../../services/services.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  userProfile: any;
  constructor( private _localStorage: LocalStorageService, private _sidebarService: SidebarService, public _userService: UserService ) { }

  ngOnInit() {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
  }


}
