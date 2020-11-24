import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang: any = 'es';
  flag: any = 'flag-icon-es';
  langs: any [] = [
    {
        lang: 'es',
        flag: 'flag-icon-es'
    },
    {
        lang: 'en',
        flag: 'flag-icon-en'
    }
];
  constructor() {
      
  }
}