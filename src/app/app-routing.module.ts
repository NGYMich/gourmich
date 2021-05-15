import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ListeRecettesComponent} from './liste-recettes/liste-recettes.component';
import {LivreRecettesPageComponent} from './livre-recettes-page/livre-recettes-page.component';
import {AjoutModificationRecettePageComponent} from './ajout-modification-recette-page/ajout-modification-recette-page.component';
import {RecetteAleatoirePageComponent} from './recette-aleatoire-page/recette-aleatoire-page.component';
import {TestPageComponent} from './test-page/test-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data: {animation: 0}},
  { path: 'liste-recettes', component: ListeRecettesComponent, data: {animation: 1} },
  { path: 'livre-recettes', component: LivreRecettesPageComponent, data: {animation: 2} },
  { path: 'ajout-modification-recette', component: AjoutModificationRecettePageComponent, data: {animation: 3} },
  { path: 'recette-aleatoire', component: RecetteAleatoirePageComponent, data: {animation: 4} },
  { path: 'about', component: AboutComponent, data: {animation: 5} },
  { path: 'test', component: TestPageComponent, data: {animation: 6} }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
