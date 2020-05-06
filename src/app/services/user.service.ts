import { Injectable } from '@angular/core';
import { User } from '../../app/models/user.model'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users : User[]  = [
    {
      firstName:'Jhon',
      lastName: 'Smith',
      emailAddress: 'jhon@smith.com',
      drinkPreference: 'Coca Cola',
      hobbies:[
        'coder',
        'lire',
        'piloter'
      ]
    },
    {
      firstName:'Alpha',
      lastName: 'Omar',
      emailAddress: 'alpha@omar.com',
      drinkPreference: 'Jus de Pomme',
      hobbies:[
        'cinema',
        'velo'
      ]
    },
    {
      firstName:'Fatou',
      lastName: 'Ndiaye',
      emailAddress: 'fatou@ndiaye.fr',
      drinkPreference: 'bissap',
      hobbies:[
        'danse'
      ]
    },
    {
      firstName:'Adama',
      lastName: 'Sall',
      emailAddress: 'adama@sall.com',
      drinkPreference: 'bouye',
      
    }
  ]
  userSubject  = new Subject<User[]>()

  constructor() { }

  emitUsers(){
    this.userSubject.next(this.users.slice())
  }

  addUser(user:User){
    this.users.push(user)
    this.emitUsers()
  }
}
