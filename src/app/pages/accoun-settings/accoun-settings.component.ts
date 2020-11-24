import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-accoun-settings',
  templateUrl: './accoun-settings.component.html',
  styles: []
})
export class AccounSettingsComponent implements OnInit {
  userProfile: any;
  constructor( private _settingsService: SettingsService ) { }

  ngOnInit() {
    this.setCheck();
  }

  setCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let theme = this._settingsService.settings.theme;

    for(let ref of selectores) {
      if(ref.getAttribute('data-theme') === theme){
        ref.classList.add('working');
      }
    }
  }

  changeColor(color: string, link: any){
    this.changeCheck(link);
    this._settingsService.changeSettings(color);
  }

  changeCheck(selector: any) {
    let selectores: any = document.getElementsByClassName('selector');
    
    for(let ref of selectores) {
      ref.classList.remove('working');
    }

    selector.classList.add('working');
  }

}
