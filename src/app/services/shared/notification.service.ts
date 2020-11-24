import { Injectable } from '@angular/core';
import swal from 'sweetalert';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  generate(type: string, title: string, message: string){
    swal(title, message, type);
  }
}
