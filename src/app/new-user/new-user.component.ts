import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../app/models/user.model'
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm : FormGroup

  constructor(private userService : UserService,
              private formBuilder : FormBuilder,
              private route : Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      emailAddress : ['',[Validators.required, Validators.email]],
      drinkPreference: ['',Validators.required],
      hobbies: this.formBuilder.array([])
    })
  }

  onFormSubmit(){
    const formValue = this.userForm.value
    const newUser = new  User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['emailAddress'],
      formValue['drinkPreference'],
      formValue['hobbies'] ? formValue['hobbies'] :[]) 

      this.userService.addUser(newUser)
      this.route.navigate(['/utilisateurs'])
  }

  getHobbies() : FormArray{
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby(){
    const newHobbyControl = this.formBuilder.control('',Validators.required)
    this.getHobbies().push(newHobbyControl)
  }

}
