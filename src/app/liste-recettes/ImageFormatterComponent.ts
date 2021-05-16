import { Component } from "@angular/core";

@Component({
  selector: 'app-image-formatter-cell',
  template: `<img style="border-radius: 40px; border: solid 1px;" width="200" height="300" src=\"{{ params.value }}\">` })

export class ImageFormatterComponent {
  params: any;
  agInit(params: any): void{
    this.params = params;
  }
}
