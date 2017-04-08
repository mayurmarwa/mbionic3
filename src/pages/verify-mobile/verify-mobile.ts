import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var SMS: any;
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
    public sessionid: any;
    public otpinput: any;

    constructor(public nav: NavController, public authService: AuthService,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        private http:Http,
        public alertCtrl: AlertController, private app: App, private zone: NgZone, public navParams: NavParams,) {

        this.signupForm = navParams.get("form");
        this.otpValid = false;
        //this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/BAL/SMS').map(res => res.json()).subscribe(data => {
        //    console.log(data);
        //});
        //this.http.get('/API/V1/068c2321-12f2-11e7-9462-00163ef91450/BAL/SMS').map(res => res.json()).subscribe(data => {
        //    console.log(data);
        //});
        //this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/' + this.signupForm.value.mobile + '/AUTOGEN/Registration').map(res => res.json()).subscribe(data => {
        //    console.log(data);
        //});
        //this.http.get('/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/' + this.signupForm.value.mobile + '/AUTOGEN/Registration').map(res => res.json()).subscribe(data => {
            //console.log(data);
        this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/' + this.signupForm.value.mobile + '/AUTOGEN/Registration').map(res => res.json()).subscribe(data => {
        this.sessionid = data.Details;
            if (SMS) {
                SMS.startWatch(function () {
                    //update('watching', 'watching started');
                }, function () {
                    //updateStatus('failed to start watching');
                });
            }
        });
        
        document.addEventListener('onSMSArrive', function (e) {
            var sms = (e as any).data;
            this.otpinput = sms.substring(0, 5);

            //smsList.push(sms); // optional, if you want to push that arrived SMS to a list
            //updateStatus('SMS arrived, count: ' + smsList.length);

            // sms.address
            // sms.body

            //var divdata = $('div#data');
            //divdata.html(divdata.html() + JSON.stringify(sms));

        });
        //this.verifyotp();

    }

    

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyMobilePage');
  }


  verifyotp() {


      if (this.otpinput == '' || this.otpinput == null) {
          let alert = this.alertCtrl.create({
              message: "Invalid OTP, please try again.",
              buttons: [{ text: "Ok", role: 'cancel' }]
          });

          alert.present();
      }
      else {
          // this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/VERIFY/{session_id}/{otp_input}' + this.signupForm.value.mobile + '/AUTOGEN/Registration').map(res => res.json()).subscribe(data => {
          //     console.log(data);
          //   }); 
          //this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/VERIFY/' + this.sessionid + '/' + this.otpinput).map(res => res.json()).subscribe(data => {
          //this.http.get('/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/VERIFY/' + this.sessionid + '/' + this.otpinput).map(res => res.json()).subscribe(data => {
              //console.log(data);
          this.http.get('http://2factor.in/API/V1/068c2321-12f2-11e7-9462-00163ef91450/SMS/VERIFY/' + this.sessionid + '/' + this.otpinput).map(res => res.json()).subscribe(data => {
          if (data.Status == "Success") {
                  this.signupUser();
              }
              else {
                  let alert = this.alertCtrl.create({
                      message: "Invalid OTP, please try again.",
                      buttons: [{ text: "Ok", role: 'cancel' }]
                  });

                  alert.present();
              }
          });

          
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
