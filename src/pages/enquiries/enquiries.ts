import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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

	public enquiryList: FirebaseListObservable<any>;	
	public currentuser: any;
    public segment: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public storage: Storage) {
      storage.ready().then(() => {
          storage.get('currentuser').then((val) => {

              this.currentuser = JSON.parse(val);
              this.segment = "received";
              this.updateEnquiryList();
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
      
  }
}
