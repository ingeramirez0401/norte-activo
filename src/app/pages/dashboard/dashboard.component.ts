import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/shared/local-storage.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ['#mapid { height: 480px; z-index: 0 }']
})
export class DashboardComponent implements OnInit {
  userProfile: any;
  title: string = '';
  mymap: any;

  data: any;
  constructor(private _router: Router, private _localStorage: LocalStorageService) {
    this.userProfile = this._localStorage.getParsedObject('calles-data');
    this.title = ((this.userProfile.genreId == 1) ? 'Sr ' : 'Sra ') + this.userProfile.name1 + ' ' + this.userProfile.lastName;
  }

  ngOnInit() {
  }
}
