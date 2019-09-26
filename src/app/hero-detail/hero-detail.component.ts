import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Power} from '../power'
import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import {PowerService} from '../power.service';
import {Heropower} from '../heropower';
import {Costume} from '../costume';
import {CustomeService} from '../custome.service';
import {City} from '../city';
import {CityService} from '../city.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  power: Power[]=[]
  costume: Costume[]=[]
  city : City
  allpowers: Power[]
  allcostumes: Costume[]
  allcities: City[]
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private powerService: PowerService,
    private costService: CustomeService,
    private cityService: CityService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getAllpowers();
    this.getCity();
    this.getAllcostumes();
    this.getAllcities();
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
        this.getPower();
        this.getCostume();

      });
      
  }

  getPower(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getPower(id)
      .subscribe(power => {
        this.power = power
        console.log(this.power)
        this.getAllpowers();
      });
      
  }


  getCostume(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.costService.getCostume(id)
      .subscribe(costume => {
        this.costume = costume
        console.log(this.costume)
        this.getAllcostumes();
      });
      
  }

  getCity(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.cityService.getCity(id)
    .subscribe(city=>{
      this.city=city
      console.log(this.city)
    })
  }


  getAllpowers(): void {
    this.powerService.getHeroes()
    .subscribe(allpowers =>{ 
      this.allpowers = allpowers;
      this.power.map(p=>{
        this.allpowers=this.allpowers.filter(powerObj=>{
          return p.id!==powerObj.id
        })
      })
    }
      );
  }

  getAllcities(){
    this.cityService.getCities()
    .subscribe(allcities=>this.allcities=allcities)
  }

  getAllcostumes(): void {
    this.costService.getCostumes()
    .subscribe(allcostumes => {
      this.allcostumes = allcostumes;
        this.costume.map(p=>{
          this.allcostumes=this.allcostumes.filter(costObj=>{
            return p.id!==costObj.id;
          })
        })
      });
  }


  goBack(): void {
    this.location.back();
  }

  addPowertoHero(power:Power):void {
    
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

addCostumetoHero(costume:Costume):void {

    let ob:Heropower ={
          pid: costume.id,//cid
          hid: this.hero.id
          
        } 
        console.log("cost id is ",ob.pid,"hero id is",ob.hid);
        this.costService.addCostumeToHero(ob)
        .subscribe( costume => {
          this.getCostume();
         });
            
      }

addCitytoHero(city:City):void {

        let ob:Heropower ={
              pid: city.id,//cid
              hid: this.hero.id
              
            } 
            console.log("cost id is ",ob.pid,"hero id is",ob.hid);
             this.cityService.addCityToHero(ob)
             .subscribe( city => {
              this.getCity();
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
}

deleteCost(costume:Costume):void{
  let ob : Heropower={
    pid: costume.id,//cid
    hid:this.hero.id
  }
      console.log("hero id to del is:",ob.hid,"costume id is ",ob.pid);
      this.costService.deleteCost(ob)
      .subscribe(costume =>{
        this.getCostume();
      });
    }

    deleteCity(city:City):void{
      let ob:Heropower={
        pid: city.id,
        hid: this.hero.id
      }
      console.log("h is",ob.hid,"city is",ob.pid);
      this.cityService.deleteCity(ob)
      .subscribe(city=>{
        this.getCity();
      })
    
    }

} 