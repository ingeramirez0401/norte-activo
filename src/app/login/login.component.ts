import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SidebarService } from '../services/shared/sidebar.service';
import { UserService } from '../services/admin/user.service';
import { LocalStorageService } from '../services/shared/local-storage.service';
import { NotificationService } from '../services/shared/notification.service';

declare var $: any;
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  userProfile: any;
  constructor( private _sidebarService: SidebarService, private _userService: UserService, private _router: Router, private _localStorage: LocalStorageService, private _notificationService: NotificationService ) {
    this.formInit();
  }

  ngOnInit() {
    init_plugins();
  }

  formInit() {
    this.forma = new FormGroup({
      'UserName': new FormControl('', Validators.required),
      'Password': new FormControl('', Validators.required)
    })
  }

  login(){
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._userService.login(this.forma.value.UserName, this.forma.value.Password)
    .subscribe(result => {
      $('body').loading('stop');
      if (result.json().success === true) {
        this._userService.loggedIn = true;
        let data = result.json().data;
        this._localStorage.remove('calles-data');
        this._localStorage.setObject('calles-data', data);
        this._userService.userData = this._localStorage.getParsedObject('calles-data');
        if (this._userService.userData) {
          this._router.navigate(['/']);
        }
      } else {
        swal('Atención!', result.json().message, 'warning');
      }
    },
    error => {
      $('body').loading('stop');
      swal('Atención!', 'En estos momentos el sistema no se encuentra disponible. Por favor intente más tarde.', 'error');
    });
  }

}
