import {Component, OnInit, ViewChild} from '@angular/core';
import {RecetteService} from '../services/RecetteService';
import {NgxGalleryArrowsComponent, NgxGalleryComponent, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery-9';
import {MatDialog} from '@angular/material/dialog';
import {DialogueRecetteComponent} from '../liste-recettes/dialogue-recette/dialogue-recette.component';
import {DeviceDetectorService} from "ngx-device-detector";
import {DialogueRecetteMobileComponent} from "../liste-recettes/dialogue-recette-mobile/dialogue-recette-mobile.component";


@Component({
  selector: 'app-livre-recettes-page',
  templateUrl: './livre-recettes-page.component.html',
  styleUrls: ['./livre-recettes-page.component.css']
})
export class LivreRecettesPageComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild(NgxGalleryComponent) gallery: NgxGalleryComponent;
  @ViewChild(NgxGalleryArrowsComponent) arrows: NgxGalleryArrowsComponent;

  selectedRecette;
  tabLienImages = [];
  tabNgxGalleryImages = [];
  recettes;
  hasDataLoaded = false;
  isMobile: boolean;


  constructor(private recetteService: RecetteService, public dialog: MatDialog, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
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
        height: '830px',
        thumbnailsMoveSize: 4,
      },
      {
        previewCustom: (index) => {
          this.selectedRecette = this.recettes[index];
          if (this.isMobile) {
            const dialogRef = this.dialog.open(DialogueRecetteMobileComponent, {
              width: '100%',
              height: '80%',
              data: {recette: this.selectedRecette},
              autoFocus: false,
              panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
            });
          } else {
            const dialogRef = this.dialog.open(DialogueRecetteComponent, {
              width: '100%',
              height: '80%',
              data: {recette: this.selectedRecette},
              autoFocus: false,
              panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
            });
          }
          // this.dialog.closeAll();
          // this.gallery.image.showNext();
          // this.arrows.onNextClick
        },
        imageArrowsAutoHide: true,
      },
    ];
  }


}
