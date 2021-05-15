import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecetteService} from '../services/RecetteService';
import {Recette} from '../model/recette';
import {DialogueRecetteComponent} from './dialogue-recette/dialogue-recette.component';
import {MatDialog} from '@angular/material/dialog';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';
import {DialogueRecetteMobileComponent} from './dialogue-recette-mobile/dialogue-recette-mobile.component';
import {isNumeric} from 'rxjs/internal-compatibility';
import {FirstDataRenderedEvent} from 'ag-grid-community';


@Component({
  selector: 'app-liste-recettes',
  templateUrl: './liste-recettes.component.html',
  styleUrls: ['./liste-recettes.component.css'],
})
export class ListeRecettesComponent implements OnInit, OnDestroy {
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  columnDefs = [];
  mobileColumnDefs = [
    {field: 'nom', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 100}
  ];
  desktopColumnDefs = [
    {field: 'categorie', headerName: 'Catégorie', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 200},
    {field: 'auteur', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 200},
    {field: 'nom', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 470},
    {
      field: 'nb_personnes',
      headerName: 'Personnes',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter', width: 150,
    },
    {field: 'difficulte', headerName: 'Difficulté', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 150},
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
      filter: 'agTextColumnFilter', width: 200
    },
    {
      field: 'temps_cuisson',
      headerName: 'Temps de cuisson',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter', width: 175
    },
    {field: 'temps_total', headerName: 'Temps total', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 150},
    {
      field: 'note',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter', width: 200,
      valueFormatter: params => params.value === '?' ? '' : params.value + '/10'
    },
  ];
  gridOptions = {
    rowSelection: 'single',
    pagination: true,
    paginationPageSize: 16,
    domLayout: 'autoHeight'
  };

  searchValue;
  newData;
  rowData: any;
  isMobile: boolean;
  private gridApi;
  private gridColumnApi;

  constructor(private recetteService: RecetteService, public dialog: MatDialog, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.getListeRecettes();
    this.isMobile = this.deviceService.isMobile();
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      // this.autoSizeAll(false);
    });
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe();
  }

  getListeRecettes(): void {
    this.recetteService.getRecettes().subscribe(data => {
      this.newData = data;
      this.newData.forEach(recette => {
        recette.temps_total = isNumeric(recette.temps_preparation) ? this.minToHours(Number(recette.temps_preparation) + Number(recette.temps_cuisson)) : recette.temps_total;
        recette.temps_cuisson = isNumeric(recette.temps_cuisson) ? this.minToHours(Number(recette.temps_cuisson)) : recette.temps_cuisson;
        recette.temps_preparation = isNumeric(recette.temps_preparation) ? this.minToHours(Number(recette.temps_preparation)) : recette.temps_preparation;
      });
      this.rowData = this.newData;
      // this.dataSource.sort = this.sort;
    });
  }

  minToHours(minutes: number): string {
    let newMinutes;
    let newHours;
    if (minutes < 60) {
      return minutes === 0 ? minutes + ' min' : minutes + ' min';
    } else {
      newHours = Math.trunc(minutes / 60);
      newMinutes = minutes - newHours * 60;
    }
    return newMinutes !== 0 ? newHours + 'h' + newMinutes : newHours + 'h' + newMinutes + '0';
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setMobileOrDesktopColumns();
    // setTimeout(() => this.autoSizeAll(false), 0);

    // this.autoSizeAll(false);

  }

  autoSizeAll(skipHeader): void {
    // const allColumnIds = this?.gridColumnApi?.getAllColumns().map((column) => column.colId);
    // this.gridColumnApi.autoSizeAllColumns(allColumnIds); // adjust to data
    // this.gridApi.sizeColumnsToFit(); // all column same size
    // console.log('autosizeall');
     // const allColumnIds = this.gridColumnApi.getAllColumns().map((column) => column.colId);
     // this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);

  }

  ouvrirRecette(): void {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data)[0];

    if (this.isMobile) {
      const dialogRef = this.dialog.open(DialogueRecetteMobileComponent, {
        width: '100%',
        height: '80%',
        data: {recette: selectedData},
        autoFocus: false,
        panelClass: ['animate__animated', 'animate__zoomIn__fast', 'my-panel']
      });
    } else {
      const dialogRef = this.dialog.open(DialogueRecetteComponent, {
        width: '100%',
        height: '80%',
        data: {recette: selectedData},
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
}
