import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PowerComponent} from './power/power.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import {PowerDetailsComponent} from './power-details/power-details.component';
import {CostumeComponent} from './costume/costume.component';
import {CityComponent} from './city/city.component';
 const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'power', component: PowerComponent },
  { path: 'powerdetails/:id', component: PowerDetailsComponent },
  { path: 'costume', component: CostumeComponent },
  { path: 'city', component: CityComponent },
  
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}