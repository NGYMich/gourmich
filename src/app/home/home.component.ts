import {Component, HostListener, OnInit} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isNumeric} from 'rxjs/internal-compatibility';
import {DialogueRecetteMobileComponent} from '../liste-recettes/dialogue-recette-mobile/dialogue-recette-mobile.component';
import {DialogueRecetteComponent} from '../liste-recettes/dialogue-recette/dialogue-recette.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Recette} from '../model/recette';
import {RecetteService} from '../services/RecetteService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isMobile: boolean;
  rowData;
  homeRecettesDisplayed: any;
  nbImagesAffichees = 5;

  setNbImagesAffichees(): void {
    if (this.isMobile) {
      this.nbImagesAffichees = 4;
    } else if (window.innerWidth >= 1600) {
      this.nbImagesAffichees = 5;
    } else if (window.innerWidth < 1600 && window.innerWidth >= 1061) {
      this.nbImagesAffichees = 4;
    } else {
      this.nbImagesAffichees = 3;
    }
    // this.getListeRecettes();
    console.log(this.nbImagesAffichees);
    console.log('setted!');
  }
  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile() ? true : false;

    this.onResize();
    console.log('window width: ' + window.innerWidth);
    console.log(this.nbImagesAffichees);

    this.getListeRecettes();
  }

  constructor(public dialog: MatDialog, private deviceService: DeviceDetectorService, private recetteService: RecetteService) {

  }

  getListeRecettes(): void {
    this.recetteService.getRecettes().subscribe(data => {
      this.homeRecettesDisplayed = new Array();

      const randomIntArray = [];
      while (randomIntArray.length < this.nbImagesAffichees){
        const r = Math.floor(Math.random() * data.length);
        if (randomIntArray.indexOf(r) === -1) { randomIntArray.push(r); }
      }
      for (const i of randomIntArray) {
        this.homeRecettesDisplayed.push(data[i]);
      }
      this.rowData = this.homeRecettesDisplayed.slice(0, this.nbImagesAffichees);
    });
  }

  ouvrirRecette(recette): void {
    if (this.isMobile) {
      const dialogRef = this.dialog.open(DialogueRecetteMobileComponent, {
        width: '100%',
        height: '80%',
        data: {recette},
        autoFocus: false,
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    } else {
      const dialogRef = this.dialog.open(DialogueRecetteComponent, {
        width: '100%',
        height: '80%',
        data: {recette},
        autoFocus: false,
        backdropClass: 'dialog-class',
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    }
  }

  getRandomArbitrary(min, max): number {
    return Math.random() * (max - min) + min;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?): void {
    console.log('window width: ' + window.innerWidth);
    this.setNbImagesAffichees();
    // this.homeRecettesDisplayed = this.homeRecettesDisplayed.slice(0, this.nbImagesAffichees);
  }

}
