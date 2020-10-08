import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MyVendorsComponent } from './my-vendors/my-vendors.component';
import { AddVendorsComponent } from './add-vendors/add-vendors.component';
import { AuthGuard } from './services/guards/auth.guard';
import { NoauthService } from './services/guards/noauth.service';
import { DetailsVendorComponent } from './details-vendor/details-vendor.component';
import { AddmasterUsersComponent } from './addmaster-users/addmaster-users.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: '',   redirectTo:'', pathMatch: 'full' },
  {path:'login',component:LoginComponent,canActivate:[NoauthService]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'myvendors',component:MyVendorsComponent,canActivate:[AuthGuard]},
  {path:'addvendors',component:AddVendorsComponent,canActivate:[AuthGuard]},
  {path:'detailsvendor/:location/:secretkey',component:DetailsVendorComponent,canActivate:[AuthGuard]},
  {path:'adminaddresticarthaginiosforever',component:AddmasterUsersComponent,canActivate:[NoauthService]},
  {path:'resetpassword',component:ResetpasswordComponent,canActivate:[NoauthService]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
