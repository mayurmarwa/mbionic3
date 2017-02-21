import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EnquiryDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enquiry-details',
  templateUrl: 'enquiry-details.html'
})
export class EnquiryDetailsPage {

	public enquiry: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
		this.enquiry = navParams.get("enquiry");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryDetailsPage');
  }

}
