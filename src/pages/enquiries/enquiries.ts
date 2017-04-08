import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the Enquiries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enquiries',
  templateUrl: 'enquiries.html'
})
export class EnquiriesPage {

	public enquiryList: any;	
    public enquiryListref: any;	
    public sentList: any;
    public sentListref: any;	
    public currentuser: any;
    public currentuserid: any;
    public segment: any;
    public enqListRev: any;
    public sentListRev: any;
    public loadingPopup: any;
    public loadingPopup2: any;
    public keys: any;
    public keys2: any;



    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public storage: Storage, public loadingCtrl: LoadingController) {
      
        
       
        storage.ready().then(() => {
          storage.get('currentuser').then((val) => {

              this.currentuser = JSON.parse(val);
              
              this.currentuserid = this.currentuser.uid;

              

              this.enquiryListref = firebase.database().ref('/users/' + this.currentuserid + '/enquiries' ).orderByChild("type").equalTo("received");
              //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
               //   query: {
               //       orderByChild: "type",
               //       equalTo: this.segment
               //   }
              //});
              this.enquiryListref.on('value',  snapshot => {

                  //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
                 //query: {
                 //    orderByChild: "type",
                 //    equalTo: this.segment
                // }
              //});
                  
                  
                  this.enquiryList = [];
                  this.keys = [];
                     snapshot.forEach(country => {

                          this.enquiryList.push(country.val());
                         this.keys.push(country.key);
                      
                  });
                      for (var i in this.enquiryList) {
                          this.enquiryList[i].key = this.keys[i];
                         
                     } 
                      
                      this.updateEnquiryList(1);
              });

              this.sentListref = firebase.database().ref('/users/' + this.currentuserid + '/enquiries').orderByChild("type").equalTo("sent");
              //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
              //   query: {
              //       orderByChild: "type",
              //       equalTo: this.segment
              //   }
              //});
              this.sentListref.on('value', snapshot => {

                 
                  this.sentList = [];
                  this.keys2 = [];
                      snapshot.forEach(country => {
                          //console.log(country.key);
                          this.sentList.push(country.val());
                          this.keys2.push(country.key);
                      });
                      
                      for (var i in this.sentList) {
                          this.sentList[i].key = this.keys2[i];

                      } 
                      this.updateEnquiryList(2);
                 
              });
              


              //this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries');

          })
              .catch((err) =>
                  console.log(err));
      }).catch((err) =>
          console.log(err));     
       
  }
  

  ionViewDidLoad() {
      console.log('ionViewDidLoad EnquiriesPage');
      this.segment = "received";
      let loading = this.loadingCtrl.create({
          content: 'Updating...'
      });

      loading.present();

      setTimeout(() => {
          loading.dismiss();
      }, 1800);
    
    }
  ionViewDidEnter() {
     
  }

  openenquirypage(enquiry){

		this.navCtrl.push(EnquiryDetailsPage, {enquiry: enquiry});  
  }

  updateEnquiryList(type) {

      if (type == 1) { this.enqListRev = this.enquiryList.reverse();}
      else if (type == 2) { this.sentListRev = this.sentList.reverse();  }
     
      
          
     
      
      
  }
}
