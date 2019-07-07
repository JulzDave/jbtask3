import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    return value.split("").shift().toUpperCase().concat(value.split("").splice(1, value.length)).split
    (",").join('');
  }

}
