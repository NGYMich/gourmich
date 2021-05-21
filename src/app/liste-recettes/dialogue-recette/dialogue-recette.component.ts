import {Component, HostListener, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-recette',
  templateUrl: './dialogue-recette.component.html',
  styleUrls: ['./dialogue-recette.component.css'],
})
export class DialogueRecetteComponent implements OnInit {
  public imgWidth: any;
  public imgHeight: any;
  widthDivider = 4.3;
  heightDivider = 1.33;
  constructor(@Inject(MAT_DIALOG_DATA) public recette: any) { }

  ngOnInit(): void {
    this.setImgSize();
    this.recette = this.recette.recette;
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
