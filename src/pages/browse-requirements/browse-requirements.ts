import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';

/*
  Generated class for the BrowseRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-browse-requirements',
  templateUrl: 'browse-requirements.html'
})
export class BrowseRequirementsPage {

	 requirementList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  
	this.requirementList = af.database.list('/requirements');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseRequirementsPage');
  }

  openrequirementpage(requirement) {

      this.navCtrl.push(RequirementDetailsPage, {requirement: requirement});
  }
}
