import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errlogin
  NotMaster
  verifMaster:boolean
  constructor(private as:AuthService,private router:Router,private us:UserService) { }

  ngOnInit(): void {
  }
  login(f){
    let data=f.value
    this.us.getprofile().subscribe(datak=>{
      datak.map(element=>{
        if(element.payload.doc.data()['Email']===data.email){
          this.verifMaster=true
        }
      })
    })
    if(this.verifMaster==true){
    this.as.login(data.email,data.password).then(()=>{
      this.router.navigate(['/profile'])
    }).catch(()=>this.errlogin="invalid Email Or Password")
  }
   
  }
  resetpass(){
    this.router.navigate(['/resetpassword'])
  }
}
