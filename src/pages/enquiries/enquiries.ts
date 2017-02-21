import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
		this.currentuser = firebase.auth().currentUser;
		this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries' );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiriesPage');
  }
  openenquirypage(enquiry){

		this.navCtrl.push(EnquiryDetailsPage, {enquiry: enquiry});  
  }

}
