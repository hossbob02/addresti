import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-my-vendors',
  templateUrl: './my-vendors.component.html',
  styleUrls: ['./my-vendors.component.css']
})
export class MyVendorsComponent implements OnInit {
  user:Observable<firebase.User>
  uid:any
  
  
  verif
  dataUser=[]
  address:string
  vendorMaxNumber
  constructor(private afauth:AngularFireAuth,private us:UserService,private as:AuthService,private router:Router,private fs:AngularFirestore) { 
    this.afauth.user.subscribe(user=>{
      if(user){  
        this.uid=user.uid
      }
   })
   this.verif=firebase.auth().currentUser.uid

  }

  ngOnInit(): void {
    this.us.getAllUsers().subscribe(data=>{
      
      for (const iterator of data) {
        if(iterator["masterID"]==this.verif){
          this.dataUser.push(iterator)
        }
      }     
    })

  }
  details(id,creatorId){
    
    this.router.navigate(['/detailsvendor/'+id+'/'+creatorId])

  }  
  delete(i){
    this.fs.doc(`Users/${i}`).update({
      isVendor:false,
      isRegular:true,
      masterID:''
    }).then(()=>{this.router.navigate(['/addvendors'])})
  
  }


}


export interface Vendors{  
  creatorId: string;
  email :string;
  phone: string;
  workPlace: string;
}