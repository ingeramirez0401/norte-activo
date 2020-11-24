import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../services/shared/sidebar.service';
import { LocalStorageService } from '../services/shared/local-storage.service';
import { UserService } from '../services/admin/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor( private _sidebarService: SidebarService, private _localStorage: LocalStorageService, private _userProvider: UserService, private router: Router ) { }

  ngOnInit() {
    this._sidebarService.menu = [];
    this._localStorage.remove("calles-data");
    this._userProvider.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
