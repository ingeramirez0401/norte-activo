import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/services.index';
import { GenreService } from '../../../../services/settings/genre.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class GenresCreateComponent implements OnInit {
  forma:FormGroup;
  userProfile: any;
  constructor(private _router: Router, private _localStorage: LocalStorageService, private _genreService: GenreService) { 
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.formInit();
  }

  ngOnInit() {
  }

  formInit() {
    this.forma = new FormGroup({
      'GenreId': new FormControl(0),
      'Name': new FormControl('', Validators.required),
      'Description': new FormControl('')
    })
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._genreService.saveGenre(this.forma.value)
    .subscribe(result => {
      $('body').loading('stop');
      if(result.json().success == true){
        this.goToList();
      }else{
        swal('Atención!', result.json().message, 'warning');
      }
    },
    error => {
      $('body').loading('stop');
      swal('Atención!', 'En estos momentos el sistema no se encuentra disponible. Por favor intente más tarde.', 'error');
    });
  }

  goToList() {
    this._router.navigate(['/genres','list']);
  }

}
