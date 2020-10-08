import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { element } from 'protractor';
@Component({
  selector: 'app-details-vendor',
  templateUrl: './details-vendor.component.html',
  styleUrls: ['./details-vendor.component.css']
})
export class DetailsVendorComponent implements OnInit  {

  sub:any
  location:string
  secretKey:string

  dataDetails={
    address:'',
    creatorId:'',
    location:{
    accuracy:'',
    altitude:'',
    bearing:'',
    latitude:'',
    longitude:'',
    provider:'',
    speed:'',
    time:'',
    
    },
    temperarlyLocation:''
  }
  newdataFeedback={
    clientID:'',
    delivererID:'',
    rating:''
  }
 
    
  newtimes
  emailFeed:string
  usernameFeed:string

  constructor(private router:ActivatedRoute,private us:UserService) {
    this.sub=this.router.params.subscribe(params=>{
      this.location=params["location"]
      this.secretKey=params["secretkey"]
    })
   }

  ngOnInit(): void {
    this.us.getAllLocation().subscribe(data=>{
      data.map(element=>{
        if(element.payload.doc.id===this.location){
          this.dataDetails.address=element.payload.doc.data()['address']
          this.dataDetails.location=element.payload.doc.data()['location']
          this.dataDetails.temperarlyLocation=element.payload.doc.data()['temperarlyLocation']
        }
      })
    })
    this.us.getAllFeedback().subscribe(dataFeed=>{
      dataFeed.map(elementf=>{
        if(elementf.payload.doc.id===this.secretKey){
          this.newdataFeedback.clientID=elementf.payload.doc.data()['clientID']
          this.newdataFeedback.delivererID=elementf.payload.doc.data()['delivererID']
          this.newdataFeedback.rating=elementf.payload.doc.data()['rating']
        }
      })
    })
    this.us.getAllUsersDelivered().subscribe(datauserDeli=>{
         datauserDeli.map(elementdeli=>{
        if(elementdeli.payload.doc.id===this.newdataFeedback.delivererID){
          this.emailFeed=elementdeli.payload.doc.data()['email']
          this.usernameFeed=elementdeli.payload.doc.data()['username']
        }

      })
    })

  }
  
  
  
  
}
