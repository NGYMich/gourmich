import {Component, OnInit, ViewChild} from '@angular/core';
import {Recette} from "../model/recette";
import {RecetteService} from "../services/RecetteService";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogueRecetteComponent} from "../liste-recettes/dialogue-recette/dialogue-recette.component";
import {timeout} from "rxjs/operators";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TestPageComponent implements OnInit {
  displayedColumns: string[] = ['categorie', 'auteur', 'nom', 'temps_preparation', 'temps_cuisson', 'temps_total', 'note'];
  newData;
  dataSource;
  expandedElement: Recette | null;
  hasDataLoaded = false;
  interval: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private recetteService: RecetteService) {
  }

  ngOnInit() {
    this.getListeRecettes();
    /*    this.interval = setInterval(() => {
          this.getListeRecettes();
          console.log('called getListeRecettes()');
        }, 60*1000); // every minute*/
  }


  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  applyFilter(event
                :
                Event
  ) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  minToHours(minutes : number  ) {
    var newMinutes, newHours, newTime;
    if (minutes < 60) {
      return minutes + "min";
    } else {
      newHours = Math.trunc(minutes / 60);
      newMinutes = minutes - newHours * 60;
    }
    return newMinutes != 0 ? newHours + 'h' + newMinutes : newHours + 'h' + newMinutes + '0';
  }

  getListeRecettes() {
    this.recetteService.getRecettes().subscribe(data => {
      // console.log(data);
      // @ts-ignore
      this.hasDataLoaded = true;
      this.newData = data;
      this.newData.forEach(recette => {
        // tslint:disable-next-line:max-line-length
        recette.temps_total = (recette.temps_cuisson === null && recette.temps_preparation === null) ? this.minToHours(Number(recette.temps_preparation) + Number(recette.temps_cuisson)) : null;
        recette.temps_cuisson = this.minToHours(Number(recette.temps_cuisson));
        recette.temps_preparation = this.minToHours(Number(recette.temps_preparation));
      });
      this.dataSource = new MatTableDataSource(this.newData);
      //this.dataSource.sort = this.sort;
    })
  }

}

