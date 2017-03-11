import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { MyProfilePage } from '../my-profile/my-profile';
import { ProductPagePage } from '../product-page/product-page';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';

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
	chatBox: any;
	currentuser: any;
	messageList: FirebaseListObservable<any>;
	otherUserList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public af: AngularFire, public storage: Storage) {
      storage.ready().then(() => {
          storage.get('currentuser').then((val) => {

              this.currentuser = JSON.parse(val);
              this.enquiry = navParams.get("enquiry");
              this.messageList = af.database.list('/users/' + this.currentuser.uid + '/enquiries/' + this.enquiry.$key + '/messgaes/');
              this.otherUserList = af.database.list('/users/' + this.enquiry.otheruser + '/enquiries/' + this.enquiry.$key + '/messgaes/');
          })
              .catch((err) =>
                  console.log(err));
      }).catch((err) =>
          console.log(err)); 

      
        //console.log(this.enquiry);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryDetailsPage');
  }

  send(chatBox){
		
			//console.log(chatBox);
			this.messageList.push({
									
				text: this.chatBox,
				type: 'sent'
			})
			this.otherUserList.push({
									
				text: this.chatBox,
				type: 'received'
			})
			this.chatBox = '';

  }

  viewProfile() {
      this.navCtrl.push(MyProfilePage, {userID: this.enquiry.otheruser});
  }

  viewProduct() {
      this.navCtrl.push(ProductPagePage, { product: this.enquiry.product });
  }

  viewRequirement() {
      this.navCtrl.push(RequirementDetailsPage, { requirement: this.enquiry.requirement });
  }

}
