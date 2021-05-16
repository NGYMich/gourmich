import {Component, OnInit, ViewChild} from '@angular/core';
import {RecetteService} from '../services/RecetteService';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
  NgxGalleryAction,
  NgxGalleryComponent
} from 'ngx-gallery-9';
import {MatDialog} from "@angular/material/dialog";
import {DialogueRecetteComponent} from "../liste-recettes/dialogue-recette/dialogue-recette.component";


@Component({
  selector: 'app-livre-recettes-page',
  templateUrl: './livre-recettes-page.component.html',
  styleUrls: ['./livre-recettes-page.component.css']
})
export class LivreRecettesPageComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  selectedRecette;

  @ViewChild('onlyPreviewGallery') onlyPreviewGallery: NgxGalleryComponent;

  tabLienImages = [];
  tabNgxGalleryImages = [];
  tabNgxGalleryActions = [];
  recettes;
  hasDataLoaded = false;

  constructor(private recetteService: RecetteService,  public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.recetteService.getRecettes().subscribe(data => {
      this.recettes = data;
      console.log(this.recettes);
      this.tabLienImages = this.recettes.map(({lien_image}) => lien_image);
      for (const tabLienImage of this.tabLienImages) {
        this.tabNgxGalleryImages.push({
          small: tabLienImage,
          medium: tabLienImage,
          big: tabLienImage
        });
      }
      this.galleryImages = this.tabNgxGalleryImages;
      this.hasDataLoaded = true;
    });

    this.galleryOptions = [
      {
        imageSize: 'contain',
        fullWidth: true,
        breakpoint: 5000,
        width: '100%',
        height: '820px',
        thumbnailsMoveSize: 4,
        actions: this.tabNgxGalleryActions
      },
    ];
  }

  openPreview(index: number): void {
    this.onlyPreviewGallery.openPreview(index);
  }

/*    this.selectedRecette = this.recettes[index];
    const dialogRef = this.dialog.open(DialogueRecetteComponent, {
      width: '100%',
      height: '80%',
      data: {recette: this.selectedRecette},
      autoFocus: false,
      panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
    });
  }*/

}
