import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
import { NgZone } from '@angular/core';

/*
  Generated class for the VerifyMobile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-verify-mobile',
  templateUrl: 'verify-mobile.html'
})
export class VerifyMobilePage {

    public loading: any;
    public signupForm: any;
    public otpValid: any;

    constructor(public nav: NavController, public authService: AuthService,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, private app: App, private zone: NgZone, public navParams: NavParams) {

        this.signupForm = navParams.get("form");
        this.otpValid = true;
        this.verifyotp();

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyMobilePage');
  }


  verifyotp() {
      if (this.otpValid) {
          this.signupUser();
      }
      else {
          let alert = this.alertCtrl.create({
              message: "Invalid OTP, please try again.",
              buttons: [{ text: "Ok", role: 'cancel' }]
          });

          alert.present();
      }
  }

  signupUser() {
     

      if (!this.signupForm.valid) {
          console.log(this.signupForm.value);
      } else {
          this.authService.signupUser(this.signupForm.value.email,
              this.signupForm.value.password).then(authData => {
                  console.log(authData);
                  console.log(this.signupForm.value);
                  this.authService.createAccount2(authData, this.signupForm);
                  this.zone.run(() => {
                      this.app.getRootNav().setRoot(TabsPage);
                  });
              }, (error) => {
                  this.loading.dismiss().then(() => {
                      console.log(error);
                      var errorMessage: string = error.message;
                      let alert = this.alertCtrl.create({
                          message: errorMessage,
                          buttons: [{ text: "Ok", role: 'cancel' }]
                      });

                      alert.present();
                  });
              });

          this.loading = this.loadingCtrl.create({
              //dismissOnPageChange: true,
              duration: 3000
          });

          this.loading.present();

      }
  }
}
