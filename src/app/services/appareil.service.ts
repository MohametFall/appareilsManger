import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {

  private appareils = []

  constructor(private httpClient : HttpClient) { }

  appareilSubject = new Subject<any[]>() 

  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice())
  }

  switchAllOn(){
    for(let appareil of this.appareils){
      appareil.status = 'allumé'
    }
    this.emitAppareilSubject()
  }

  switchAllOff(){
    for(let appareil of this.appareils){
      appareil.status = 'éteint'
    }
    this.emitAppareilSubject()
  }

  switchOneOn(index : number){
    this.appareils[index].status = 'allumé'
    this.emitAppareilSubject()
  }

  switchOneOff(index : number ){
    this.appareils[index].status = 'éteint'
    this.emitAppareilSubject()
  }

  getAppareilById(id : number){
    const appareil = this.appareils.find(
      (appareilObject)=>{
        return appareilObject.id === id
      })
      if(appareil != null ){
        return appareil

      }else{
        return null
      }
      this.emitAppareilSubject()
  }

  switchOnById(id : number){
    let oneAppareil = this.getAppareilById(id)
    oneAppareil.status = 'allumé'
    this.emitAppareilSubject()
  }

  switchOffById(id : number){
    let oneAppareil = this.getAppareilById(id)
    oneAppareil.status = 'éteint'
    this.emitAppareilSubject()
  }

  addAppareil(name:string, status:string){
    const appareilObject = {
      name : '',
      status: '',
      id:0
    }
    appareilObject.name = name
    appareilObject.status = status
    appareilObject.id = this.appareils[this.appareils.length - 1].id + 1 
    this.appareils.push(appareilObject)
    this.saveAppareilsToServer()
  }

  saveAppareilsToServer(){
    this.httpClient.put('https://http-client-demo-7aa6c.firebaseio.com/appareils.json',this.appareils).subscribe(
      ()=>{
        console.log('Sauvegarde effectué avec succés')
      },
      (error)=>{
        console.log('Erreur lors de la sauvegarde '+error)
      }
    )
  }

  getAppareilsFromServer(){
    this.httpClient.get<any[]>('https://http-client-demo-7aa6c.firebaseio.com/appareils.json').subscribe(
      (response)=>{
        this.appareils = response
        this.emitAppareilSubject()
      },
      (error)=>{
        console.log("Error retrieving Appareils")
      }
    )
  }

}
