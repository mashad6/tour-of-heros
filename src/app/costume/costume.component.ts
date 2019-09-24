import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {CustomeService} from '../custome.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-costume',
  templateUrl: './costume.component.html',
  styleUrls: ['./costume.component.css']
})
export class CostumeComponent implements OnInit {
  cost: Hero[];

  constructor(private costService: CustomeService) { }

  ngOnInit() {
    this.getCostumes();
  }
 
  getCostumes(): void {
    this.costService.getCostumes()
    .subscribe(cost => this.cost = cost);
  }


}