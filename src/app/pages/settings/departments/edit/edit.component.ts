import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/services.index';
import { CountryService } from '../../../../services/settings/country.service';
import { DepartmentService } from '../../../../services/settings/department.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class DepartmentsEditComponent implements OnInit {
  forma:FormGroup;
  userProfile: any;
  countryList: any [] = [];
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _localStorage: LocalStorageService, private _countryService: CountryService, private _departmentService: DepartmentService) { 
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.formInit();
    this.getAllCountries();

    this._activatedRoute.params.subscribe((params)=>{
      let departmentId = params['id'];
      this._departmentService.getDepartment(departmentId).subscribe((result)=>{
        let data = result.json().data;
        let departmentEdit = {
          DepartmentId: data.id,
          CountryId: data.countryId,
          Name: data.name,
          Code: data.code
        };

        this.forma.setValue(departmentEdit);
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

  getAllCountries() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.countryList = [];
    this._countryService.getAllCountries().subscribe((result) => {
      $('body').loading('stop');
      this.countryList = result.json().data;
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
  }

  formInit() {
    this.forma = new FormGroup({
      'DepartmentId': new FormControl(0, Validators.required),
      'CountryId': new FormControl(0, Validators.required),
      'Name': new FormControl('', Validators.required),
      'Code': new FormControl('', Validators.required)
    });
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._departmentService.updateDepartment(this.forma.value)
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
    this._router.navigate(['/departments','list']);
  }
}
