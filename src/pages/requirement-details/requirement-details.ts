import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { SendQuotationPage } from '../send-quotation/send-quotation'
import { Storage } from '@ionic/storage';
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
    public currentuser: any;
    public cur: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage) {
        storage.ready().then(() => {
            storage.get('currentuser').then((val) => {

                this.currentuser = JSON.parse(val);
                this.requirement = navParams.get("requirement");
                //console.log(this.product);
                //console.log(this.currentuser);

            })
                .catch((err) =>
                    console.log(err));
        }).catch((err) =>
            console.log(err));
       
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
