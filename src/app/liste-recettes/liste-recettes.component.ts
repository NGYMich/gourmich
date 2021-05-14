import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RecetteService} from '../services/RecetteService';
import {Recette} from '../model/recette';
import {DialogueRecetteComponent} from './dialogue-recette/dialogue-recette.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-liste-recettes',
  templateUrl: './liste-recettes.component.html',
  styleUrls: ['./liste-recettes.component.css'],
})
export class ListeRecettesComponent implements OnInit {
  columnDefs = [
    {field: 'categorie', sortable: true, resizable: true, filter: 'agTextColumnFilter'},
    {field: 'auteur', sortable: true, resizable: true, filter: 'agTextColumnFilter'},
    {field: 'nom', sortable: true, resizable: true, filter: 'agTextColumnFilter'},
    {field: 'temps_preparation', sortable: true, resizable: true, filter: 'agTextColumnFilter'},
    {field: 'temps_cuisson', sortable: true, resizable: true, filter: 'agTextColumnFilter'},
    {field: 'temps_total', sortable: true, resizable: true, filter: 'agTextColumnFilter'},
    {field: 'note', sortable: true, resizable: true, filter: 'agTextColumnFilter'},
  ];
  gridOptions = {
    rowSelection: 'single',

  };
  searchValue;
  newData;
  rowData: any;
  expandedElement: Recette | null;
  interval: any;
  private gridApi;
  private gridColumnApi;

  constructor(private recetteService: RecetteService, public dialog: MatDialog) {
    window.onresize = (e) =>
    {
      this.autoSizeAll();
    };
  }

  ngOnInit() {
    this.getListeRecettes();
  }

  getListeRecettes() {
    this.recetteService.getRecettes().subscribe(data => {
      // console.log(data);
      // @ts-ignore
      this.newData = data;
      this.newData.forEach(recette => {
        recette.temps_total = this.minToHours(Number(recette.temps_preparation) + Number(recette.temps_cuisson));
        recette.temps_cuisson = this.minToHours(Number(recette.temps_cuisson));
        recette.temps_preparation = this.minToHours(Number(recette.temps_preparation));
      });
      this.rowData = this.newData;
      // this.dataSource.sort = this.sort;
    });
  }

  minToHours(minutes: number) {
    let newMinutes, newHours;
    if (minutes < 60) {
      return minutes + 'min';
    } else {
      newHours = Math.trunc(minutes / 60);
      newMinutes = minutes - newHours * 60;
    }
    return newMinutes !== 0 ? newHours + 'h' + newMinutes : newHours + 'h' + newMinutes + '0';
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  autoSizeAll() {
    const allColumnIds = this.gridColumnApi.getAllColumns().map((column) => column.colId);
    // this.gridColumnApi.autoSizeAllColumns(allColumnIds); // adjust to data
    this.gridApi.sizeColumnsToFit(); // all column same size
  }

  ouvrirRecette(): void {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data)[0];
    console.log('selectedData: ', selectedData);
    const dialogRef = this.dialog.open(DialogueRecetteComponent, {
      width: '100%',
      height: '80%',
      data: {recette: selectedData},
      autoFocus: false
    });



  }
}
