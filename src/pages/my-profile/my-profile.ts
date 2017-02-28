import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';

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
    constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {

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

}
