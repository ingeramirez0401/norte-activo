import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultNoticia'
})
export class DefaultNoticiaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let newPhoto = "assets/images/news/default.jpg";

    if( !value ){
      return newPhoto;
    }


    return ( value.length > 0 ) ? value : newPhoto;
  }

}
