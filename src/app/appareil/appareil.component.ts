import { Component, OnInit, Inject } from '@angular/core';
import { Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string;
  @Input() appareilStatus: string ;
  @Input() indexOfAppareil: number;
  @Input() id : number;

  isEteint : boolean = true;
  classStatus = 'bi bi-dash-circle text-danger';
  constructor(private appareilService :AppareilService) { 
    
  }

  ngOnInit(): void {
  }

  getStatus(){
    return this.appareilStatus;
  }

  getColor(){
    if(this.appareilStatus === 'allumé'){
      return 'green';
    }else if(this.appareilStatus=== 'éteint'){
      return 'red';
    }
  }

  onSwitchOne(){
    if(this.appareilStatus === 'éteint'){
      this.appareilService.switchOneOn(this.indexOfAppareil)
    }else{
      if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
        this.appareilService.switchOneOff(this.indexOfAppareil)
      }else{
        return null
      }
    }
    
  }

}
