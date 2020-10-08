import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs:AngularFirestore,private storage:AngularFireStorage) { }

  addnewuser(uid,name,email,company,adresse,mobile){
    return this.fs.doc('masterUsers/'+uid).set({
      name:name,
      Email:email,
      address:adresse,
      company:company,
      creatorId:uid,
      firstLogin:true,
      isAdmin:false,
      isMaster:true,
      isRegular:false,
      isVendor:false,
      lastLogin:new Date().toLocaleString(),
      phone:mobile,
      photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Tunisia_logo.svg/1200px-Tunisia_logo.svg.png',
      subscription:0,
      vendorMaxNumber:0
    })
     
  }
  addNewVendor(uiddd,uidUserMaster,email,company,mobile){
    return this.fs.doc('Users/'+uiddd).set({
      creatorId:uiddd,                             
      masterID: uidUserMaster,
      email:email,
      phone:mobile,
      firstLogin:true, 
      isAdmin:false ,
      isRegular: false,
      isVendor: true,
      workPlace: company
    })
  }
  getprofile(){
   return this.fs.collection('masterUsers').snapshotChanges()
  }
  getAllUsers(){
    return this.fs.collection('Users').valueChanges()
  }
  getAllLocation(){
      return this.fs.collection('locations').snapshotChanges()    
  }
  getAllFeedback(){
    return this.fs.collection('feedback').snapshotChanges()    
}
  getAllUsersDelivered(){
    return this.fs.collection('Users').snapshotChanges()
  }
}
