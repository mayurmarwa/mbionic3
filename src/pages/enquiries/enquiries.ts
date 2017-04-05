import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { Storage } from '@ionic/storage';

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
	public currentuser: any;
    public segment: any;
    public enqListRev: any;
    public loadingPopup: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public storage: Storage, public loadingCtrl: LoadingController) {
      
        
       
        storage.ready().then(() => {
          storage.get('currentuser').then((val) => {

              this.currentuser = JSON.parse(val);
              this.segment = "received";
              
              
              //this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries');

          })
              .catch((err) =>
                  console.log(err));
      }).catch((err) =>
          console.log(err));     
		
  }
  

  ionViewDidLoad() {
      console.log('ionViewDidLoad EnquiriesPage');
      
    
    }
  ionViewDidEnter() {
      console.log('ionViewDidEnter EnquiriesPage');
      this.loadingPopup = this.loadingCtrl.create({
          content: 'Loading...'
      });
      this.loadingPopup.present();
      this.updateEnquiryList();
  }

  openenquirypage(enquiry){

		this.navCtrl.push(EnquiryDetailsPage, {enquiry: enquiry});  
  }

  updateEnquiryList() {
      console.log(this.segment);
      this.enquiryList = this.af.database.list('/users/' + this.currentuser.uid + '/enquiries', {
          query: {
              orderByChild: "type",
              equalTo: this.segment
          }
      });
      this.enqListRev = this.enquiryList.map((arr) => { return arr.reverse(); }); 
      this.loadingPopup.dismiss();
  }
  
}
