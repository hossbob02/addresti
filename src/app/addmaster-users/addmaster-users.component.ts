import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmaster-users',
  templateUrl: './addmaster-users.component.html',
  styleUrls: ['./addmaster-users.component.css']
})
export class AddmasterUsersComponent implements OnInit {

  uidUserMaster:string
  testp:string='tunisia'
  messageValid
  constructor(private as:AuthService,private us:UserService,private route:Router) { }

  ngOnInit(): void {
    
  
  }
  signup(f){
    let data:User=f.value
    this.as.signup(data.email,data.password)
    .then((result)=>{
      this.us.addnewuser(result.user.uid,data.name,data.email,data.company,data.adresse,data.mobile)
      .then(()=>{
        this.messageValid="created"
        this.route.navigate(['/'])
      })
      .catch(()=>{console.log('user not added')})
    })
    .catch(err=>console.log(err))
  }

}
