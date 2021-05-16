import {Component, Input, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {RecetteService} from '../../../services/RecetteService';
import {MatDialog} from '@angular/material/dialog';
import {DeviceDetectorService} from 'ngx-device-detector';
import {isNumeric} from 'rxjs/internal-compatibility';
import {DialogueRecetteMobileComponent} from '../../dialogue-recette-mobile/dialogue-recette-mobile.component';
import {DialogueRecetteComponent} from '../../dialogue-recette/dialogue-recette.component';

@Component({
  selector: 'app-liste-recettes-detailed-grid',
  templateUrl: './liste-recettes-detailed-grid.component.html',
  styleUrls: ['./liste-recettes-detailed-grid.component.css']
})
export class ListeRecettesDetailedGridComponent implements OnInit {
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
      width: 120
    },
    {field: 'auteur', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 150},
  ];
  desktopColumnDefs = [
    {
      field: 'categorie',
      headerName: 'Catégorie',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 200
    },
    {
      field: 'sous_categorie',
      headerName: 'Sous catégorie',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 200
    },
    {field: 'auteur', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 200},
    {field: 'nom', sortable: true, resizable: true, filter: 'agTextColumnFilter', width: 490, sort: 'asc'},
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
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'difficulte',
      headerName: 'Difficulté',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      width: 110
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
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'temps_cuisson',
      headerName: 'Temps de cuisson',
      sortable: true,
      resizable: true,
      width: 145,
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'temps_total',
      headerName: 'Temps total',
      sortable: true,
      resizable: true,
      width: 110,
      cellStyle: {textAlign: 'center'}
    },
    {
      field: 'note',
      sortable: true,
      resizable: true,
      width: 85,
      valueFormatter: params => params.value === '?' ? '' : params.value + '/20'
    },
  ];
  gridOptions = {
    rowSelection: 'single',
    pagination: true,
    paginationPageSize: 30,
    domLayout: 'autoHeight'
  };

  searchValue;
  @Input() newData: any;
  @Input() rowData: any;
  @Input() isMobile: boolean;
  private gridApi;
  private gridColumnApi;

  constructor(private recetteService: RecetteService, public dialog: MatDialog, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    // this.getListeRecettes();
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
        if (recette.temps_cuisson !== '' && recette.temps_preparation !== '') {
          recette.temps_total = isNumeric(Number(recette.temps_preparation) + Number(recette.temps_cuisson)) ? this.minToHours(Number(recette.temps_preparation) + Number(recette.temps_cuisson)) : recette.temps_total;
        }
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
}
