import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService, CountryService, DepartmentService, ZipCodeService } from 'src/app/services/services.index';
import { CityService } from '../../../../services/settings/city.service';
import { GenreService } from '../../../../services/settings/genre.service';
import { ProfileService } from '../../../../services/account/profile.service';
import { StateService } from '../../../../services/settings/state.service';
import { UserPersonService } from '../../../../services/account/user-person.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class UsersCreateComponent implements OnInit {
  forma:FormGroup;
  userProfile: any;

  countryList: any [] = [];
  departmentList: any [] = [];
  cityList: any [] = [];
  genreList: any [] = [];
  zipCodeList: any [] = [];
  profileList: any [] = [];
  stateList: any [] = [];
  constructor(private _router: Router, 
    private _localStorage: LocalStorageService, 
    private _countryService: CountryService, 
    private _departmentService: DepartmentService,
    private _cityService: CityService,
    private _genreService: GenreService,
    private _zipCodeService: ZipCodeService,
    private _profileService: ProfileService,
    private _stateService: StateService,
    private _userService: UserPersonService) 
    { 
      this.userProfile = this._localStorage.getParsedObject("calles-data");
      this.formInit();
      this.getAllCountries();
      this.getAllGenres();
      this.getAllProfiles();
      this.getAllStates();
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

  getAllGenres() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.genreList = [];
    this._genreService.getAllGenres().subscribe((result) => {
      $('body').loading('stop');
      this.genreList = result.json().data;
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

  getAllProfiles() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.profileList = [];
    this._profileService.getAllProfiles().subscribe((result) => {
      $('body').loading('stop');
      this.profileList = result.json().data;
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

  getAllStates() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.stateList = [];
    this._stateService.getAllStates().subscribe((result) => {
      $('body').loading('stop');
      this.stateList = result.json().data;
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
      'Id': new FormControl(0, Validators.required),
      'Name1': new FormControl('', Validators.required),
      'Name2': new FormControl(''),
      'LastName': new FormControl('', Validators.required),
      'IdentificationNumber': new FormControl('', Validators.required),
      'GenreId': new FormControl(0, Validators.required),
      'DateOfBirth': new FormControl(''),
      'CountryId': new FormControl(0, Validators.required),
      'DepartmentId': new FormControl(0, Validators.required),
      'CityId': new FormControl(0, Validators.required),
      'ZipCodeId': new FormControl(0),
      'Email': new FormControl('', Validators.required),
      'Phone1': new FormControl('', Validators.required),
      'Phone2': new FormControl(''),
      'ProfileId': new FormControl(2, Validators.required),
      'StateId': new FormControl(1, Validators.required),
      'UserName': new FormControl('', Validators.required),
      'Password': new FormControl('', Validators.required)
    });
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._userService.saveUser(this.forma.value)
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
    this._router.navigate(['/users','list']);
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

  onSelectCity() {
    let selectedCity = this.forma.value.CityId;
    this.zipCodeList = [];

    this._zipCodeService.filterByCity(selectedCity).subscribe((result)=>{
      this.zipCodeList = result.json().data;
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

}
