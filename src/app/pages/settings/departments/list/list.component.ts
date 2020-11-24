import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, DepartmentService } from 'src/app/services/services.index';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class DepartmentsListComponent implements OnInit {
  table: any;
  departmentList: any [] = [];
  userProfile: any;
  constructor(private _router: Router, private _localStorage: LocalStorageService, private _departmentService: DepartmentService) {
    this.userProfile = this._localStorage.getParsedObject("calles-data");
    this.loadAllDepartments();
  }

  ngOnInit() {
  }

  loadAllDepartments(){
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.departmentList = [];

    if(this.table != undefined){
      this.table.destroy();
      this.table = undefined;
    }

    this._departmentService.getAllDepartments().subscribe((result)=>{
      $('body').loading('stop');
      this.departmentList = result.json().data;
      if(this.departmentList){
        if(this.table == undefined){
          setTimeout(() => {
            this.table = $('#myTable').DataTable({
              "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
              },
              dom: 'Bfrtip',
              buttons: [
                  'excel', 'pdf', 'print'
              ]
            });
          }, 500);
        }
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

  goToUpdateDepartment(data: any){
    this._router.navigate(['/departments','update',data.id]);
  }

  deleteDepartment(data: any){
    swal({
      title: "Atención!",
      text: "¿Desea borrar este registro?",
      buttons: ["No", "Si"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._departmentService.deleteDepartment(data.id).subscribe((resp)=>{
          if(resp.json()){
            if(resp.json().success == false){
              swal('Atención!', resp.json().message, 'warning');
            }else{
              swal('Atención!', resp.json().message, 'success');
              this.loadAllDepartments();
            }
          }
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
    });
  }

}
