import {Component, Input, OnInit} from '@angular/core';
import {DialogueRecetteMobileComponent} from '../../dialogue-recette-mobile/dialogue-recette-mobile.component';
import {DialogueRecetteComponent} from '../../dialogue-recette/dialogue-recette.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-liste-recettes-image-grid',
  templateUrl: './liste-recettes-image-grid.component.html',
  styleUrls: ['./liste-recettes-image-grid.component.css']
})
export class ListeRecettesImageGridComponent implements OnInit {
  @Input() newData;
  @Input() rowData: any;
  @Input() isMobile: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    }
  }

}
