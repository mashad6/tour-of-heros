import { Component, OnInit } from '@angular/core';
import {Power} from '../power';
import {PowerService} from '../power.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css']
})
export class PowerComponent implements OnInit {
 
  heroes: Power[];

  constructor(private powerService: PowerService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.powerService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.powerService.addHero({ name } as Power)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.getHeroes();
      });
  }

  delete(hero: Power): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.powerService.deleteHero(hero).subscribe();
  }

}