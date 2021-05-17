import {Component, Input, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {ImageFormatterComponent} from '../../ImageFormatterComponent';
import {RecetteService} from '../../../services/RecetteService';
import {MatDialog} from '@angular/material/dialog';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isNumeric} from 'rxjs/internal-compatibility';
import {DialogueRecetteMobileComponent} from '../../dialogue-recette-mobile/dialogue-recette-mobile.component';
import {DialogueRecetteComponent} from '../../dialogue-recette/dialogue-recette.component';

@Component({
  selector: 'app-liste-recettes-vignette-grid',
  templateUrl: './liste-recettes-vignette-grid.component.html',
  styleUrls: ['./liste-recettes-vignette-grid.component.css']
})
export class ListeRecettesVignetteGridComponent implements OnInit {

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  columnDefs = [];
  mobileColumnDefs = [
    {field: 'nom', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 600},
    {
      field: 'categorie',
      headerName: 'Catégorie',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 120,
    },
    {field: 'auteur', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 150},
  ];
  desktopColumnDefs = [
    {
      headerName: 'Image',
      field: 'lien_image',
      width: 240,
      sortable: false,
      resizable: true,
      cellRendererFramework: ImageFormatterComponent,
      getQuickFilterText: () => ''
    },
    {
      field: 'categorie',
      headerName: 'Catégorie',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 120,
      cellStyle: {'white-space': 'normal; line-height: 1.6; font-size: 18px;'}
    },
    {
      field: 'sous_categorie',
      headerName: 'Sous catégorie',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 200,
      hide: true,
      cellStyle: {'vertical-align': 'middle'}
    },
    {field: 'auteur', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 130,
      cellStyle: {'white-space': 'normal; line-height: 1.6; font-size: 18px;'}
    },
    {field: 'nom', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 300, sort: 'asc',
      cellStyle: {'white-space': 'normal; line-height: 1.6; font-size: 18px;'}
    },
    {
      field: 'nb_personnes',
      headerName: 'Personnes',
      sortable: true,
      resizable: true,
      width: 100,
      hide: true,
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'cout_recette',
      headerName: 'Coût par personne ',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 165,
      hide: true,
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'difficulte',
      headerName: 'Difficulté',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 110,
      cellStyle: {'white-space': 'normal; line-height: 1.6; font-size: 18px;'}
    },
    {
      field: 'liste_ingredients', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 100, hide: true,
      getQuickFilterText: params => {
        let allIngredients = '';
        for (const ingredient of params.value) {
          allIngredients = allIngredients + ingredient.nom;
        }
        return allIngredients;
      }
    },
    {
      field: 'temps_preparation',
      headerName: 'Temps de préparation',
      sortable: true,
      resizable: true,
      width: 170,
      hide: true,
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'temps_cuisson',
      headerName: 'Temps de cuisson',
      sortable: true,
      resizable: true,
      width: 145,
      hide: true,
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'temps_total',
      headerName: 'Temps total',
      sortable: true,
      resizable: true,
      width: 110,
      hide: true,
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'note',
      sortable: true,
      resizable: true,
      width: 85,
      hide: true,
      valueFormatter: params => params.value === '?' ? '' : params.value + '/20'
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 950,
      cellStyle: {'white-space': 'normal; line-height: 1.6; font-size: 18px;'}
    }
  ];
  gridOptions = {
    rowSelection: 'single',
    pagination: true,
    paginationPageSize: 20,
    domLayout: 'autoHeight',
    rowHeight: 304
  };

  filtre;
  @Input() rowData: any;
  @Input() isMobile: boolean;
  private gridApi;
  private gridColumnApi;

  constructor(private recetteService: RecetteService, public dialog: MatDialog, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      // this.autoSizeAll(false);
    });
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setMobileOrDesktopColumns();
  }

  autoSizeAll(skipHeader): void {
    // this.gridApi.sizeColumnsToFit(); // all column same size
    // const allColumnIds = this.gridColumnApi.getAllColumns().map((column) => column.colId);
    // this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  autoColumnSizesWithButton(skipHeader): void {
    const allColumnIds = this.gridColumnApi.getAllColumns().map((column) => column.colId);
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  ouvrirRecette(event): void {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedRecette = selectedNodes.map(node => node.data)[0];
    if (this.isMobile) {
      const dialogRef = this.dialog.open(DialogueRecetteMobileComponent, {
        width: '100%',
        height: '80%',
        data: {recette: selectedRecette},
        autoFocus: false,
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    } else {
      const dialogRef = this.dialog.open(DialogueRecetteComponent, {
        width: '100%',
        height: '80%',
        data: {recette: selectedRecette},
        autoFocus: false,
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    }
  }

  setMobileOrDesktopColumns(): void {
    if (this.isMobile) {
      console.log('detected mobile');
      this.columnDefs = this.mobileColumnDefs;
    } else {
      this.columnDefs = this.desktopColumnDefs;
    }
  }

  resetFilter(): void {
    this.filtre = '';
  }
}
