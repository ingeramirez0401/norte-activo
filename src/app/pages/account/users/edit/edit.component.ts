import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService, CountryService, DepartmentService, ZipCodeService } from 'src/app/services/services.index';
import { CityService } from '../../../../services/settings/city.service';
import { GenreService } from '../../../../services/settings/genre.service';
import { ProfileService } from '../../../../services/account/profile.service';
import { StateService } from '../../../../services/settings/state.service';
import { UserPersonService } from '../../../../services/account/user-person.service';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UsersEditComponent implements OnInit {
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
    private _activatedRoute: ActivatedRoute,
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
      this.getAllDepartments();
      this.getAllCities();
      this.getAllZipCodes();

      this._activatedRoute.params.subscribe((params)=>{
        let userId = params['id'];
        this._userService.getUser(userId).subscribe((result)=>{
          let data = result.json().data;
          let userEdit = {
            Id: data.id,
            Name1: data.name1,
            Name2: data.name2,
            LastName: data.lastName,
            IdentificationNumber: data.identificationNumber,
            GenreId: data.genreId,
            DateOfBirth: data.dateOfBirth,
            CountryId: data.countryId,
            DepartmentId: data.departmentId,
            CityId: data.cityId,
            ZipCodeId: data.zipCodeId,
            Email: data.email,
            Phone1: data.phone1,
            Phone2: data.phone2,
            ProfileId: data.profileId,
            StateId: data.stateId,
            UserName: data.userName,
            Password: ''
          };

          if(userEdit.DateOfBirth != null) {
            let date = userEdit.DateOfBirth.split('T');
            userEdit.DateOfBirth = date[0];
          }
  
          this.forma.setValue(userEdit);

          this.onSelectCountry();
          this.onSelectDepartment();
          this.onSelectCity();
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

  getAllDepartments() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.departmentList = [];
    this._departmentService.getAllDepartments().subscribe((result) => {
      $('body').loading('stop');
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

  getAllCities() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.cityList = [];
    this._cityService.getAllCities().subscribe((result) => {
      $('body').loading('stop');
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

  getAllZipCodes() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.zipCodeList = [];
    this._zipCodeService.getAllZipCodes().subscribe((result) => {
      $('body').loading('stop');
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
      'Password': new FormControl('')
    });
  }

  saveChanges() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._userService.updateUser(this.forma.value)
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
