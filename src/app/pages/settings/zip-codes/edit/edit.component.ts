import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/services.index';
import { CountryService } from '../../../../services/settings/country.service';
import { DepartmentService } from '../../../../services/settings/department.service';
import { CityService } from '../../../../services/settings/city.service';
import { ZipCodeService } from '../../../../services/settings/zip-code.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ZipCodesEditComponent implements OnInit {
  forma:FormGroup;
  userProfile: any;
  countryList: any [] = [];
  departmentList: any [] = [];
  cityList: any [] = [];
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _localStorage: LocalStorageService, private _countryService: CountryService, private _departmentService: DepartmentService, private _cityService: CityService, private _zipCodeService: ZipCodeService) { 
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.formInit();
    this.getAllCountries();
    this.getAllDepartments();
    this.getAllCities();

    this._activatedRoute.params.subscribe((params)=>{
      let zipCodeId = params['id'];
      this._zipCodeService.getZipCode(zipCodeId).subscribe((result)=>{
        let data = result.json().data;
        let zipCodeEdit = {
          ZipCodeId: data.id,
          CountryId: data.countryId,
          DepartmentId: data.departmentId,
          CityId: data.cityId,
          Name: data.value
        };

        this.forma.setValue(zipCodeEdit);
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

  getAllDepartments(){
    this.departmentList = [];
    this._departmentService.getAllDepartments().subscribe((result)=>{
      this.departmentList = result.json().data;
    },
    error => {
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar esta opción', 'warning');
        this._router.navigate(['/login']);
      }
      if(error.json() || error.json().type == "error"){
        let errorMessage = "En estos momentos el sistema no se encuentra disponible. Por favor intente más tarde.";
        if(error.json().message != undefined){
          errorMessage = error.json().message;
        }
        swal('Señor Usuario', errorMessage, 'error');
      }
    });
  }

  getAllCities(){
    this.cityList = [];
    this._cityService.getAllCities().subscribe((result)=>{
      this.cityList = result.json().data;
    },
    error => {
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar esta opción', 'warning');
        this._router.navigate(['/login']);
      }
      if(error.json() || error.json().type == "error"){
        let errorMessage = "En estos momentos el sistema no se encuentra disponible. Por favor intente más tarde.";
        if(error.json().message != undefined){
          errorMessage = error.json().message;
        }
        swal('Señor Usuario', errorMessage, 'error');
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

  onSelectDepartment() {
    let selectedDepartment = this.forma.value.DepartmentId;
    this.cityList = [];

    this._cityService.filterByDepartment(selectedDepartment).subscribe((result)=>{
      this.cityList = result.json().data;
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
      'ZipCodeId': new FormControl(0, Validators.required),
      'CityId': new FormControl(0, Validators.required),
      'DepartmentId': new FormControl(0, Validators.required),
      'CountryId': new FormControl(0, Validators.required),
      'Name': new FormControl('', Validators.required)
    });
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._zipCodeService.updateZipCode(this.forma.value)
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
    this._router.navigate(['/zip-codes','list']);
  }
}
