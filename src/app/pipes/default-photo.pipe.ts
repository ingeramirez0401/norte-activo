import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultPhoto'
})
export class DefaultPhotoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let menPhoto = "assets/images/users/men.png";

    if( !value ){
      return menPhoto;
    }


    return ( value.length > 0 ) ? value : menPhoto;
  }

}
