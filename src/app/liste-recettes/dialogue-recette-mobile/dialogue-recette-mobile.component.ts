import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogue-recette-mobile',
  templateUrl: './dialogue-recette-mobile.component.html',
  styleUrls: ['./dialogue-recette-mobile.component.css']
})
export class DialogueRecetteMobileComponent implements OnInit {
  public imgWidth: any;
  public imgHeight: any;
  widthDivider = 2;
  heightDivider = 3;
  constructor(@Inject(MAT_DIALOG_DATA) public recette: any) { }

  ngOnInit(): void {
    this.setImgSize();
    this.recette = this.recette.recette;
    console.log(this.recette);
  }



  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.setImgSize();
    console.log('window width: ' + this.imgWidth);
  }

  private setImgSize(): void {
    this.imgWidth = window.innerWidth / this.widthDivider;
    this.imgHeight = window.innerHeight / this.heightDivider;
    console.log('initial width: ' + window.innerWidth + ' | initial height : ' + window.innerHeight);
  }
}
