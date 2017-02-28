import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import firebase from 'firebase';
import { EnquiriesPage } from '../enquiries/enquiries';
import { AuthService } from '../../providers/auth.service';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
/*
  Generated class for the EnquirySent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enquiry-sent',
  templateUrl: 'enquiry-sent.html'
})
export class EnquirySentPage {

    public sellerID: any;
    public seller: any;
    public enquiry: any;
    public enquiryID: any;
    public loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authService: AuthService) {

        this.sellerID = navParams.get("sellerID");
        this.enquiryID = navParams.get("enquiryID");

        this.authService.getFullProfile(this.sellerID)
            .subscribe(user => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.seller = user;
                console.log(this.seller);
            }, (error) => {
                //loading.dismiss();
                console.log('Error: ' + JSON.stringify(error));
            });

        this.authService.getEnquiry(this.sellerID,this.enquiryID)
            .subscribe(enquiry => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.enquiry = enquiry;
                console.log(this.enquiry);
               
            }, (error) => {
                //loading.dismiss();
                console.log('Error: ' + JSON.stringify(error));
            });
         
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad EnquirySentPage');
      
  }

  sendMessage() {
      this.loading = this.loadingCtrl.create({
         
      });

      this.loading.present();

      setTimeout(() => {
          this.navCtrl.popToRoot({ animate: false });
          this.navCtrl.setRoot(EnquiriesPage,{ animate: false });
          this.navCtrl.push(EnquiryDetailsPage, {enquiry: this.enquiry}, { animate: false });
          //this.navCtrl.pop({ animate: false });
      }, 1000);

      setTimeout(() => {
          this.loading.dismiss();
      }, 2000);

  }

 

}
