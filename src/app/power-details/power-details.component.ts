import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Power} from '../power';
import{PowerService} from '../power.service';

@Component({
  selector: 'app-power-details',
  templateUrl: './power-details.component.html',
  styleUrls: ['./power-details.component.css']
})
export class PowerDetailsComponent implements OnInit {

    power:Power;
  constructor(
    private route: ActivatedRoute,
    private heroService: PowerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  save(): void {
    this.heroService.updateHero(this.power)
      .subscribe(() => this.goBack());
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.power = hero[0]
        console.log(hero)
      });
      
  }

  goBack(): void {
    this.location.back();
  }
}