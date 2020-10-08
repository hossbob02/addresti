import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { environment } from 'src/environments/environment.prod';
import { ProfileComponent } from './profile/profile.component';
import { AddVendorsComponent } from './add-vendors/add-vendors.component';
import { MyVendorsComponent } from './my-vendors/my-vendors.component';
import { DetailsVendorComponent } from './details-vendor/details-vendor.component';
import { AgmCoreModule } from '@agm/core';
import { AddmasterUsersComponent } from './addmaster-users/addmaster-users.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AddVendorsComponent,
    MyVendorsComponent,
    DetailsVendorComponent,
    AddmasterUsersComponent,
    ResetpasswordComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJKfQPH_glsDFZeBPT4eMl3SSrM3e0-hU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
