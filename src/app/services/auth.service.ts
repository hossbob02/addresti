import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:Observable<firebase.User>
  userId:string=''
  constructor(private afauth:AngularFireAuth) {
    this.user=this.afauth.user
    
   }

  signup(email,password){
    return this.afauth.createUserWithEmailAndPassword(email,password)
   }
   login(email,password){
     return this.afauth.signInWithEmailAndPassword(email,password)
   }  
   logout(){
     return this.afauth.signOut()
   }
   resetPassword(email){
    return this.afauth.sendPasswordResetEmail(email)
   }
}
