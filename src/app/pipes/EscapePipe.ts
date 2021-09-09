import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name:'escape'
})
export class EscapePipe implements PipeTransform{
  transform(value: string, ...args: any[]): any {
    return value.replace(/\\/g, '');
  }

}
