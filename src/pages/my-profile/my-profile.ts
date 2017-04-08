import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { CallNumber } from '@ionic-native/call-number';
import { Platform } from 'ionic-angular';

/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage {

    public userID: any;
    public userProfile: any;
    public subscription: any
    public loadingPopup: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, private platform: Platform, private callNumber: CallNumber, public loadingCtrl: LoadingController) {

        this.userID = navParams.get("userID");
        this.loadingPopup = this.loadingCtrl.create({
            content: 'Loading...'
        });
        this.loadingPopup.present();
       

        this.subscription = this.authService.getFullProfile(this.userID).first()
            .subscribe(user => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.userProfile = user;
                console.log(this.userProfile);
                this.loadingPopup.dismiss();
            }, (error) => {
                //loading.dismiss();
                this.loadingPopup.dismiss();
                console.log('Error: ' + JSON.stringify(error));
            });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
    }



  callNo() {
      if (!this.platform.is('cordova')) {
          window.open("tel:" + this.userProfile.mobile);
          console.log(this.userProfile.mobile);

      }
      else {
          this.callNumber.callNumber(this.userProfile.mobile, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
      }
  }

}
