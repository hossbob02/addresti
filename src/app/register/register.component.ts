import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private as:AuthService,private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  signup(f){
    let data:User=f.value
    this.as.signup(data.email,data.password)
    .then((result)=>{
      this.us.addnewuser(result.user.uid,data.name,data.email,data.company,data.adresse,data.mobile)
      .then(()=>{
        this.router.navigate(['/'])
        console.log('added')
      })
      .catch(()=>{console.log('user not added')})
    })
    .catch(err=>console.log(err))
  }
}
