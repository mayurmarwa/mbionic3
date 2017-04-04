import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EnquiriesPage } from '../enquiries/enquiries';
import { AuthService } from '../../providers/auth.service';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { MyProfilePage } from '../my-profile/my-profile';
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
    public uid: any;
    public subscription: any;
    public subscription2: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authService: AuthService) {

        this.sellerID = navParams.get("sellerID");
        this.enquiryID = navParams.get("enquiryID");
        this.uid = navParams.get("uid");

        this.subscription = this.authService.getFullProfile(this.sellerID)
            .first().subscribe(user => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.seller = user;
                //console.log(this.seller);
            }, (error) => {
                //loading.dismiss();
                console.log('Error: ' + JSON.stringify(error));
            });

        this.subscription2 =  this.authService.getEnquiry(this.uid,this.enquiryID)
            .first().subscribe(enquiry => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.enquiry = enquiry;
                //console.log(this.enquiry);
               
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

  viewProfile() {
      this.loading = this.loadingCtrl.create({

      });

      this.loading.present();

      setTimeout(() => {
          //this.navCtrl.pop({ animate: false });          
          this.navCtrl.push(MyProfilePage, { userID: this.sellerID }, { animate: false });
          //this.navCtrl.pop({ animate: false });
      }, 1000);

      setTimeout(() => {
          this.loading.dismiss();
      }, 2000);

  }

 

}
