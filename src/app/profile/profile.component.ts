import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { element } from 'protractor';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../interfaces/user.interface';
import * as firebase from 'firebase';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  data={
    name:'',
    email:'',
    company:'',
    subscription:0,
    vendorMaxNumber:0,
    photo:''
  }
  getProfile:Subscription
  uid:string
  uid2:any
  user:Observable<firebase.User>
  messageUpdateName=''
  messageUpdatePassword=''
  messageUpdateEchecPassword=''
  ref:AngularFireStorageReference
  task:AngularFireUploadTask
  downloadURL:Observable<string>
  idsub:Subscription
  constructor(private fs:AngularFirestore,private afauth:AngularFireAuth,private as:AuthService,private us:UserService,private afStorage:AngularFireStorage) {
   this.idsub=this.afauth.user.subscribe(user=>{
      if(user){ return this.uid=user.uid
       
      }
      
   })
  
  }

  
  
  ngOnInit(): void {
    this.getProfile=this.us.getprofile().subscribe(data=>{
      data.map(element=>{
       if(element.payload.doc.id==this.uid){
         this.data.name=element.payload.doc.data()['name'],
         this.data.email=element.payload.doc.data()['Email'],
         this.data.company=element.payload.doc.data()['company']
         this.data.subscription=element.payload.doc.data()['subscription']
         this.data.vendorMaxNumber=element.payload.doc.data()['vendorMaxNumber']
         this.data.photo=element.payload.doc.data()['photo']
       }
      })
    })
  
  }
  upload(event){
    const id=Math.random().toString(36).substring(2)
    this.ref=this.afStorage.ref('imageMasterUsers/'+id)
    this.task=this.ref.put(event.target.files[0])
    this.task.then((data)=>{data.ref.getDownloadURL().then(url=>{
      this.fs.doc(`masterUsers/${this.uid}`).update({
        photo:url
      })
    })})
  }
  updateName(f){
    let data=f.value
    this.fs.doc(`masterUsers/${this.uid}`).update({
      name:data.name
    }).then(()=>{
      this.messageUpdateName="Your Name Has Been Updated"
    }).catch(()=>{
      this.messageUpdateName=''
    })
    
  }
  
  updatepassword(fo){
    let data=fo.value
    const cpUser=firebase.auth().currentUser
    const credentials = firebase.auth.EmailAuthProvider.credential(
      cpUser.email, data.oldpassword);
      cpUser.reauthenticateWithCredential(credentials).then(
        success => {
          cpUser.updatePassword(data.password).then(()=>{
            this.messageUpdatePassword='Your Password Has Been Updated'
          })
        }).catch(()=>{this.messageUpdateEchecPassword='Echec Updated Password'})    
      }
      ngOnDestroy(){
        this.getProfile.unsubscribe()
        this.idsub.unsubscribe()
      }
}
export interface profile{
  name:string
  Email:string
  company:string;
  subscription:string;
  vendorMaxNumber:string;
  photo:string;
}