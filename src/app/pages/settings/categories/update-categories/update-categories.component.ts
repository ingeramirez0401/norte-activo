import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, LocalStorageService } from 'src/app/services/services.index';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.css']
})
export class UpdateCategoriesComponent implements OnInit {
  forma:FormGroup;
  userProfile: any;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _localStorage: LocalStorageService, private _categoryService: CategoryService) { 
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.formInit();
    this._activatedRoute.params.subscribe((params)=>{
      let categoryId = params['id'];
      this._categoryService.getCategory(categoryId).subscribe((result)=>{
        let data = result.json().data;
        let categoryEdit = {
          CategoryId: data.categoryId,
          Name: data.name
        };

        this.forma.setValue(categoryEdit);
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
      'CategoryId': new FormControl(0),
      'Name': new FormControl('', Validators.required)
    })
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._categoryService.updateCategory(this.forma.value)
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
    this._router.navigate(['/categories','list']);
  }

}
