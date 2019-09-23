import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Power} from '../power'
import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import {PowerService} from '../power.service';
import {Heropower} from '../heropower';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  power: Power
  allpowers: Power[]
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private powerService: PowerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getAllpowers();
    this.getPower();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero[0]
        console.log(hero)
      });
      
  }

  getPower(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getPower(id)
      .subscribe(power => {
        this.power = power
        console.log(this.power)
      });
      
  }


  getAllpowers(): void {
    this.powerService.getHeroes()
    .subscribe(allpowers => this.allpowers = allpowers);
  }

  goBack(): void {
    this.location.back();
  }

  addPowertoHero(power:Power):void {
    
//    const id = +this.route.snapshot.paramMap.get('id');
    let ob:Heropower ={
     pid: power.id,
     hid:this.hero.id
    }
    console.log("power id is ",ob.pid,"hero id is",ob.hid);
    this.heroService.addPowerToHero(ob)
    .subscribe( power => {
      console.log("power & hero is" , power)
      this.getPower();
     // this.getAllpowers();
    });
        
  }


delete(power: Power): void {
  let obj : Heropower={
    pid: power.id,
    hid:this.hero.id
  }
      console.log("hero id to del is:",obj.hid,"power id is ",obj.pid);
      this.heroService.deletePower(power)
      .subscribe(power =>{
        this.getPower();
      });
 // this.hero = this.hero.filter(h => h !== hero);
  //this.heroService.deleteHero(hero).subscribe();
}

} 