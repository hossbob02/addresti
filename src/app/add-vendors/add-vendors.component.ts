import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-vendors',
  templateUrl: './add-vendors.component.html',
  styleUrls: ['./add-vendors.component.css']
})
export class AddVendorsComponent implements OnInit,OnDestroy {
  
  email:string
  uidMaster
  vendorMaxNumber
  getprofile:Subscription
  subuser:Subscription
  getusersub:Subscription
  messageValidAdd:string
  messagenotfound
  constructor(private us:UserService,private afauth:AngularFireAuth,private router:Router,private as:AuthService,private fs:AngularFirestore) {
    this.subuser=this.afauth.user.subscribe(user=>{
      if(user){ return this.uidMaster=user.uid
       
      }
      
   })
   }

  ngOnInit(): void {
    this.getprofile=this.us.getprofile().subscribe(data=>{
      data.map(resultat=>{
        if(resultat.payload.doc.id===this.uidMaster){
          this.vendorMaxNumber=resultat.payload.doc.data()['vendorMaxNumber']
        }
      })
    })
  }
  giveme(){
    let creatorId=new Promise((resolve,reject)=>{
      this.us.getAllUsers().subscribe(data=>{
        data.map(element=>{
        if(element["email"]===this.email){ 
          resolve(element["creatorId"])
        }
        })
       })

    })
    
    creatorId.then((datamm)=>{
      this.fs.doc(`Users/${datamm}`).update({
        isVendor:true,
        isRegular:false,
        masterID:this.uidMaster
      }).then(()=>{console.log("Updated")
      this.fs.doc(`masterUsers/${this.uidMaster}`).update({
        vendorMaxNumber:this.vendorMaxNumber-1
      }).then(()=>{
        this.messageValidAdd='Vendor Added'
      }).catch((err)=>{
        this.messagenotfound=`We Don't Have This Email In Our System`
      })
    
    })
     
    })
     
    
    
  }

  ngOnDestroy(){

  }  

    
}
