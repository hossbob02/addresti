import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  messagere
  notmessage
  constructor(private as:AuthService) { }

  ngOnInit(): void {
  }

  reset(f){
    let data=f.value
    this.as.resetPassword(data.email).then(()=>{
      this.messagere='We Send You To Your email'
    }).catch(()=>{
      this.notmessage=`We Don't Have This Email In Our System`
    })
  }
}
