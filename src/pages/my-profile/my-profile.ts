import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { CallNumber } from 'ionic-native';
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
    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, private platform: Platform) {

        this.userID = navParams.get("userID");

        this.authService.getFullProfile(this.userID)
            .subscribe(user => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.userProfile = user;
                console.log(this.userProfile);
            }, (error) => {
                //loading.dismiss();
                console.log('Error: ' + JSON.stringify(error));
            });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
    }

  callNumber() {
      if (!this.platform.is('cordova')) {
          window.open("tel:" + this.userProfile.mobile);
          console.log(this.userProfile.mobile);

      }
      else {
          CallNumber.callNumber(this.userProfile.mobile, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
      }
  }

}
