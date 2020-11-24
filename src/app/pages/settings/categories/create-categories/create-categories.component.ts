import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService, LocalStorageService } from 'src/app/services/services.index';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {
  forma:FormGroup;
  userProfile: any;
  constructor(private _router: Router, private _localStorage: LocalStorageService, private _categoryService: CategoryService) { 
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.formInit();
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
    this._categoryService.saveCategory(this.forma.value)
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
