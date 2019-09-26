import { Component, OnInit } from '@angular/core';
import {CityService} from '../city.service';
import {City} from '../city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: City[];
  constructor(private cityService: CityService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities():void{
    this.cityService.getCities()
    .subscribe(city => this.city=city)
  }
}
 