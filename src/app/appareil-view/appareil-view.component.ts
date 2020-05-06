import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {
  
  isAuth = false;

  allOff = true;

  appareils : any[]

  appareilSubscription : Subscription

  constructor( private appareilService : AppareilService) {
 
  }

  ngOnInit(){
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils : any[])=>{
          this.appareils = appareils
      }
    )
    this.appareilService.getAppareilsFromServer()
    console.log('Appel de ngOnInit')
  }

  lastUpdate = new Promise(
    (resolve,reject)=>{
      const date = new Date()
      setTimeout(()=>{
        resolve(date);
      },1000)    
    }
  )

  onAllumerTout(){
    console.log("On allume tout !! ")
    this.appareilService.switchAllOn()
    this.allOff = false
  }

  onEteindreTout(){
    console.log("on éteint tout")
    this.appareilService.switchAllOff()
    this.allOff = true
  }

  ngOnDestroy(){
    this.appareilSubscription.unsubscribe()
  }

  onSave(){
    this.appareilService.saveAppareilsToServer()
   }


}
