import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
    myenquiries: any;
    otherenquiries: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController) {
      storage.ready().then(() => {
          storage.get('currentuser').then((val) => {

              

              this.currentuser = JSON.parse(val);
              this.enquiry = navParams.get("enquiry");
              
              this.messageList = af.database.list('/users/' + this.currentuser.uid + '/enquiries/' + this.enquiry.key + '/messgaes/');
              this.otherUserList = af.database.list('/users/' + this.enquiry.otheruser + '/enquiries/' + this.enquiry.key + '/messgaes/');

              this.myenquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
              this.otherenquiries = af.database.list('/users/' + this.enquiry.otheruser + '/enquiries');
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

      console.log(this.enquiry.key);
      console.log(this.enquiry);
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

  confirmDelete() {
      let alert = this.alertCtrl.create({
          title: 'Delete Enquiry?',
          message: 'Do you want to delete this enquiry?',
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Confirm',
                  handler: data => {
                      this.myenquiries.remove(this.enquiry.key);
                      this.otherenquiries.remove(this.enquiry.key);
                      let toast = this.toastCtrl.create({
                          message: 'Enquiry will be deleted',
                          duration: 2000,
                          position: 'middle'
                      });
                      toast.present().then(() => {
                          this.navCtrl.pop();
                      });
                      
                  }
              }
          ]
      });
      alert.present();
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
