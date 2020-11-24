import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/services.index';
import { CountryService } from '../../../../services/settings/country.service';
import { DepartmentService } from '../../../../services/settings/department.service';
import { CityService } from '../../../../services/settings/city.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CitiesCreateComponent implements OnInit {
  forma:FormGroup;
  userProfile: any;
  countryList: any [] = [];
  departmentList: any [] = [];
  constructor(private _router: Router, private _localStorage: LocalStorageService, private _countryService: CountryService, private _departmentService: DepartmentService, private _cityService: CityService) { 
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.formInit();
    this.getAllCountries();
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

  onSelectCountry() {
    let selectedCountry = this.forma.value.CountryId;
    this.departmentList = [];

    this._departmentService.filterByCountry(selectedCountry).subscribe((result)=>{
      this.departmentList = result.json().data;
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
      'CityId': new FormControl(0, Validators.required),
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
    this._cityService.saveCity(this.forma.value)
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
    this._router.navigate(['/cities','list']);
  }

}
