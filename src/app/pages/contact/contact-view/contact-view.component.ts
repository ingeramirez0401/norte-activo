import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../services/contact.service';

declare var $: any;
@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {
  contactId: any;
  contact: any;
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private _contactService: ContactService) { 
    this._activatedRoute.params.subscribe((params)=>{
      this.contactId = params['id'];
      this.getContactData();
    });
  }

  ngOnInit() {
  }

  getContactData() {
    $('body').loading({
      theme: 'light',
      message: 'POR FAVOR ESPERE...'
    });
    this._contactService.getContactInfo(this.contactId).subscribe((result)=> {
      $('body').loading('stop');
      if(result.json()){
        this.contact = result.json().data;
      }
    });
  }

}
