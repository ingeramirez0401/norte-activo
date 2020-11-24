import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewService } from '../../../services/news/new.service';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  table: any;
  newList: any [] = []
  constructor(private _router: Router, private _newService: NewService) {
    this.loadAllNews();
  }

  ngOnInit() {
  }

  loadAllNews(){
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.newList = [];
    this._newService.getAllNews().subscribe((result)=>{
      $('body').loading('stop');
      this.newList = result.json().data;
      if(this.table == undefined){
        setTimeout(() => {
          this.table = $('#myTable').DataTable({
            "language": {
              "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
          }
          });
        }, 500);
      }
    },
    error => {
      $('body').loading('stop');
      if(error.status == 401){
        swal('Señor Usuario', 'No tiene permisos para ejecutar ésta acción.', 'warning');
        this._router.navigate(['/login']);
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

  goToViewNew(data: any){
    //this._router.navigate(['/news','view',data.noticiasId]);
  }

  goToUpdateView(data: any){
    this._router.navigate(['/news','update',data.newId]);
  }

  disableNew(data: any) {
    swal({
      title: "Atención",
      text: "¿Está seguro que desea inactivar ésta noticia?",
      buttons: ["Cancelar", "Inactivar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        $('body').loading({
          theme: 'light',
          message: 'POR FAVOR ESPERE...'
        });
        this._newService.disableData(data.newId).subscribe((resp)=>{
          $('body').loading('stop');
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadAllNews();
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
    });
  }

  deleteNew(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar ésta noticia?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        $('body').loading({
          theme: 'light',
          message: 'POR FAVOR ESPERE...'
        });
        this._newService.deleteData(data.newId).subscribe((resp)=>{
          $('body').loading('stop');
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadAllNews();
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
    });
  }

}
