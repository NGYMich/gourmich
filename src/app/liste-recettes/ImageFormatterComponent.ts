import { Component } from '@angular/core';

@Component({
  selector: 'app-image-formatter-cell',
  template: `<img *ngIf="params.value" style="border-radius: 40px; border: solid 1px;" width="200" height="300" src=\"{{ params.value }}\">  <img *ngIf="!params.value" style="border-radius: 40px; border: solid 1px;" width="200" height="300" src="https://forums.autodesk.com/autodesk/attachments/autodesk/124/166553/1/Personal_Tri_Part_-_01_2018-Apr-27_02-32-37PM-000_CustomizedView28598958894_png_alpha.png">

  `
})

export class ImageFormatterComponent {
  params: any;
  agInit(params: any): void{
    this.params = params;
  }
}
