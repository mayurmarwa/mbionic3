import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	this.requirement = navParams.get("requirement");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequirementDetailsPage');
	console.log(this.requirement);
  }

}
