import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../../app/models/user.model'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit, OnDestroy {

  users: User[] 
  
  userSubscription : Subscription

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.userSubject.subscribe(
      (users:User[]) =>{
        this.users = users
      }
    )

    this.userService.emitUsers()
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }

}
