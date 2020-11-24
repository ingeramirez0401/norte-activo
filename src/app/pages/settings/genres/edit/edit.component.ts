import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/services.index';
import { GenreService } from '../../../../services/settings/genre.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class GenresEditComponent implements OnInit {
  forma:FormGroup;
  userProfile: any;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _localStorage: LocalStorageService, private _genreService: GenreService) { 
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.formInit();
    this._activatedRoute.params.subscribe((params)=>{
      let genreId = params['id'];
      this._genreService.getGenre(genreId).subscribe((result)=>{
        let data = result.json().data;
        let genreEdit = {
          GenreId: data.id,
          Name: data.name,
          Description: data.description
        };

        this.forma.setValue(genreEdit);
      },
      error => {
        if(error.status == 401){
          swal('Atención!', 'No tiene permisos para ejecutar esta opción', 'warning');
          this._router.navigate(['/login']);
        }
        if(error.json() || error.json().type == "error"){
          let errorMessage = "En estos momentos el sistema no se encuentra disponible. Por favor intente más tarde.";
          if(error.json().message != undefined){
            errorMessage = error.json().message;
          }
          swal('Atención!', errorMessage, 'error');
        }
      });
    });
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
    this._genreService.updateGenres(this.forma.value)
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
