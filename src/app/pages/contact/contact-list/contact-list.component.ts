import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/services.index';

declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  table: any;
  contactList: any [] = []
  constructor(private _router: Router, private _contactService: ContactService) {
    this.loadAllContacts();
  }

  ngOnInit() {
  }

  loadAllContacts(){
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this.contactList = [];
    this._contactService.getAllContacts().subscribe((result)=>{
      $('body').loading('stop');
      this.contactList = result.json().data;
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

  viewContact(data: any){
    console.log(data);
    this._router.navigate(['/contacts', 'view', data.id]);
  }

  deleteContact(data: any){
    swal({
      title: "Atención",
      text: "¿Está seguro que desea eliminar éste registro?",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        $('body').loading({
          theme: 'light',
          message: 'POR FAVOR ESPERE...'
        });
        this._contactService.deleteData(data.id).subscribe((resp)=>{
          $('body').loading('stop');
          if(resp.json()){
            if(resp.json().success == false){
              swal('Señor Usuario', resp.json().message, 'warning');
            }else{
              this.loadAllContacts();
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
