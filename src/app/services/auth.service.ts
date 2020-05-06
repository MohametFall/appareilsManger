import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthentified = false;

  constructor() { }

  signIn(){
    return new Promise(
      (resolve, reject)=>{
        setTimeout(()=>{
          this.isAuthentified = true
          resolve(true)
        },2000);
      }
    )
  }

  signOut(){
    this.isAuthentified = false
  }
}
