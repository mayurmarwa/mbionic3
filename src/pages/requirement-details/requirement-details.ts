import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { SendQuotationPage } from '../send-quotation/send-quotation'
/*
  Generated class for the RequirementDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-requirement-details',
  templateUrl: 'requirement-details.html'
})
export class RequirementDetailsPage {

	public requirement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
	this.requirement = navParams.get("requirement");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequirementDetailsPage');
	//console.log(this.requirement);
  }

  sendQuote(){
	 this.navCtrl.push(SendQuotationPage, {requirement: this.requirement});
		//console.log('Send Quote');
		
  }
  

  
}
