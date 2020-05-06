import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppareilService } from '../services/appareil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  onOffDefault : string = 'éteint'
  addMessage : string

  constructor(private appareilService : AppareilService, private route : Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form.value)
    const name = form.value['name']
    const status = form.value['status']
    this.appareilService.addAppareil(name, status)
    this.addMessage =  "Appareil créé avec succés"
    //this.route.navigate(['appareils']) avoid not calling NgOnInit
  }

}
