import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService, LocalStorageService, UploadFileService } from 'src/app/services/services.index';
import { NewService } from '../../../services/news/new.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
declare var tinymce:any;
declare var tinyMCE: any;
declare var swal: any;
@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
  @ViewChild('fileNews') file1: ElementRef;
  @ViewChild('attachNews') file2: ElementRef;

  forma:FormGroup;
  newData: any;
  editor: any;
  userProfile: any;

  categoryList: any[] = [];

  newFile: File;
  newImageLoaded: boolean = false;
  newsImageList: any [] = [];
  newsFilesList: any [] = [];


  NewId: any;
  constructor(private _localStorage: LocalStorageService, 
              private _newService: NewService, 
              private _uploadService: UploadFileService, 
              private _router: Router, 
              private _activatedRoute: ActivatedRoute,
              private _categoryService: CategoryService) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.getAllCategories();
    this.formInit();
    this._activatedRoute.params.subscribe((params)=>{
      this.NewId = params['id'];
      this.getNewData();
    });
  }

  getAllCategories(){
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.categoryList = [];
    this._categoryService.getAllCategories().subscribe((result)=>{
      $('body').loading('stop');
      if(result && result.json().data) {
        this.categoryList = result.json().data;
      }
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

  getNewData() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._newService.getNewInfo(this.NewId).subscribe((result)=> {
      $('body').loading('stop');
      if(result.json()){
        let data = result.json().data;
        $('#datepicker-autoclose').bootstrapMaterialDatePicker({
          weekStart: 0, format: 'MM/DD/YYYY HH:mm', shortTime : true
        });
        let newUpdate = {
          NewId: data.newId,
          CategoryId: data.categoryId,
          ShortTitle: data.shortTitle,
          Title: data.title,
          Route: data.route,
          Content: atob(data.content),
          Date: this.formatDate(data.originalDate),
          CoverImage: data.coverImage,
          UserPersonId: data.userId,
          Featured: (data.featured === true)?'Si':'No',
          Active: (data.active === true)?'Si':'No'
        };
        this.newsImageList = data.photos;
        this.newsFilesList = data.files;
        this.forma.setValue(newUpdate);
        setTimeout(()=>{
          tinyMCE.activeEditor.setContent(newUpdate.Content);
        },1000);
      }
    });
  }

  formatDate(fecha: string){
    let stringDate = '';
    let split = fecha.split('T');
    if(split) {
      let splitDate = split[0].split('-');
      let year = splitDate[0];
      let month = splitDate[1];
      let day = splitDate[2];

      stringDate = month + '/' + day + '/' + year + ' ' + split[1];
    }
    return stringDate;
  }

  ngOnInit() {
    setTimeout(() => {
      if ($("#mymce").length > 0) {
        tinymce.init({
            selector: "textarea#mymce",
            theme: "modern",
            height: 300,
            language : 'es',
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table contextmenu directionality emoticons template paste textcolor"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
        });
      }
    }, 1000);
  }

  ngOnDestroy() {
    tinyMCE.editors[0].remove();
  }

  onTypeTitle() {
    let title = this.forma.value.Title;
    let newTitle = title.split(' ').join('-');
    this.forma.controls['Route'].setValue(newTitle.toLowerCase());
  }

  formInit() {
    this.forma = new FormGroup({
      'NewId': new FormControl(0, Validators.required),
      'Title': new FormControl('', Validators.required),
      'ShortTitle': new FormControl('', Validators.required),
      'CategoryId': new FormControl(0, Validators.required),
      'Date': new FormControl(''),
      'Route': new FormControl('', Validators.required),
      'CoverImage': new FormControl(''),
      'Content': new FormControl(''),
      'UserPersonId': new FormControl(this.userProfile.id),
      'Featured': new FormControl('No'),
      'Active': new FormControl('Si')
    })
  }

  saveChanges() {
    let pickerDate = $('#datepicker-autoclose')[0].value;
    let pickerValue = pickerDate.split('/');
    this.forma.controls['Content'].setValue(tinyMCE.editors[0].getContent());
    let data = this.forma.value;
    data.Content = btoa(data.Content);
    //data.Fecha = new Date(pickerValue[1]+'/'+pickerValue[0]+'/'+pickerValue[2]);
    data.Date = this.convertDateToSave(pickerDate);
    data.Active = (data.Active == "Si")?true:false;
    data.Featured = (data.Featured == "Si")?true:false;
    //Data lista para enviar
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._newService.updateData(data)
    .subscribe(result => {
      $('body').loading('stop');
      if(result.json().success == true){
        swal('Señor Usuario', result.json().message, 'success');
      }else{
        swal('Señor Usuario', result.json().message, 'warning');
      }
    },
    error => {
      $('body').loading('stop');
      swal('Señor Usuario', 'Se ha presentado un error en el sistema. Por favor comuniquese con el administrador', 'error');
    });
  }
  
  convertDateToSave(date: string) {
    let dateArray = date.split(' ');
    let dateArrayA = dateArray[0].split('/');
    return dateArrayA[2] + '-' + dateArrayA[0] + '-' + dateArrayA[1] + ' ' + dateArray[1];
  }

  goToNewList() {
    this._router.navigate(['/news','list']);
  }

  deleteImageFromNew(data: any) {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    //Eliminar la imagen seleccionada
    this._newService.deleteImage(data.newId, data.urlImagen).subscribe((resp)=>{
      $('body').loading('stop');
      if(resp.json()){
        if(resp.json().success == false){
          swal('Señor Usuario', resp.json().message, 'warning');
        }else{
          this.newsImageList = resp.json().data;
        }
      }
    },
    error => {
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar ésta acción.', 'error');
        this._router.navigate(['login']);
      }
      if(error.json() || error.json().type == "error"){
        let errorMessage = "Ocurrió un error al ejecutar ésta acción. Por favor verifique";
        if(error.json().message != undefined){
          errorMessage = error.json().message;
        }
        swal('Señor Usuario', errorMessage, 'error');
      }
    });
  }

  setDestacada(data: any){
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    //Seleccionar la imagen como principal
    this._newService.destacarImage(data.newId, data.urlImagen).subscribe((resp)=>{
      $('body').loading('stop');
      if(resp.json()){
        if(resp.json().success == false){
          swal('Señor Usuario', resp.json().message, 'warning');
        }else{
          swal('Señor Usuario', resp.json().message, 'success');
        }
      }
    },
    error => {
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar ésta acción.', 'error');
        this._router.navigate(['login']);
      }
      if(error.json() || error.json().type == "error"){
        let errorMessage = "Ocurrió un error al ejecutar ésta acción. Por favor verifique";
        if(error.json().message != undefined){
          errorMessage = error.json().message;
        }
        swal('Señor Usuario', errorMessage, 'error');
      }
    });
  }

  loadPhotoNew(event){
    this.readPhotoURL(event.target);
  }

  readPhotoURL(input) {
    let reader = new FileReader();
    if (input.files && input.files[0]) {
      this.newFile = input.files[0];
      reader.readAsDataURL(this.newFile);
      reader.onload = (e:any) => {
        //$('#picturePreview').attr('src', e.target.result).fadeIn('slow');
        this.newImageLoaded = true;
        this.uploadImageNew();
      };
    }
  }

  uploadImageNew(){
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._uploadService.uploadNewImage(this.newFile, 'noticias', this.forma.value.NewId).subscribe((resp)=>{
      this.resetFileUpload();
      $('body').loading('stop');
      if(resp.json()){
        if(resp.json().success == false){
          swal('Señor Usuario', resp.json().message, 'warning');
        }else{
          this.newsImageList = resp.json().data;
        }
      }
    },
    error => {
      this.resetFileUpload();
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar ésta acción.', 'error');
        this._router.navigate(['login']);
      }
      if(error.json() || error.json().type == "error"){
        let errorMessage = "Ocurrió un error al ejecutar ésta acción. Por favor verifique";
        if(error.json().message != undefined){
          errorMessage = error.json().message;
        }
        swal('Señor Usuario', errorMessage, 'error');
      }
    });
  }

  loadFileNew(event){
    this.readURLFile(event.target);
  }

  readURLFile(input) {
    let reader = new FileReader();
    if (input.files && input.files[0]) {
      this.newFile = input.files[0];
      reader.readAsDataURL(this.newFile);
      reader.onload = (e:any) => {
        //$('#picturePreview').attr('src', e.target.result).fadeIn('slow');
        this.newImageLoaded = true;
        this.uploadFileNew();
      };
    }
  }

  uploadFileNew(){
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._uploadService.uploadNewFile(this.newFile, 'noticias', this.forma.value.NewId).subscribe((resp)=>{
      this.resetFile2Upload();
      $('body').loading('stop');
      if(resp.json()){
        if(resp.json().success == false){
          swal('Señor Usuario', resp.json().message, 'warning');
        }else{
          this.newsFilesList = resp.json().data;
        }
      }
    },
    error => {
      this.resetFile2Upload();
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar ésta acción.', 'error');
        this._router.navigate(['login']);
      }
      if(error.json() || error.json().type == "error"){
        let errorMessage = "Ocurrió un error al ejecutar ésta acción. Por favor verifique";
        if(error.json().message != undefined){
          errorMessage = error.json().message;
        }
        swal('Señor Usuario', errorMessage, 'error');
      }
    });
  }

  deleteFileFromNew(data: any) {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    //Eliminar la imagen seleccionada
    this._newService.deleteFile(data.newId, data.urlImagen).subscribe((resp)=>{
      $('body').loading('stop');
      if(resp.json()){
        if(resp.json().success == false){
          swal('Señor Usuario', resp.json().message, 'warning');
        }else{
          this.newsFilesList = resp.json().data;
        }
      }
    },
    error => {
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar ésta acción.', 'error');
        this._router.navigate(['login']);
      }
      if(error.json() || error.json().type == "error"){
        let errorMessage = "Ocurrió un error al ejecutar ésta acción. Por favor verifique";
        if(error.json().message != undefined){
          errorMessage = error.json().message;
        }
        swal('Señor Usuario', errorMessage, 'error');
      }
    });
  }

  resetFileUpload(){
    this.file1.nativeElement.value = null;
  }

  resetFile2Upload(){
    this.file2.nativeElement.value = null;
  }

}

//Interfaces
interface FileReaderEventTarget extends EventTarget {
  result:string
  }

  interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
  }
