import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  name : string = 'appareil'
  status : string = 'statut'
  id : number = 0

  constructor(private appareilService : AppareilService, private activedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activedRoute.snapshot.params['id']; // getting the value given in url at :id
    this.name = this.appareilService.getAppareilById(+this.id).name       
    this.status = this.appareilService.getAppareilById(+this.id).status                                            

  }

  onAllumer(){
    this.appareilService.switchOnById(+this.id)
    this.status = 'allumé'
    console.log(" => allumé ")
  }

  onEteindre(){
    this.appareilService.switchOffById(+this.id)
    this.status = 'éteint'
    console.log(" => éteint ")
  }
}
