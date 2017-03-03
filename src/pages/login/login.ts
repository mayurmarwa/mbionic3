import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { SignupPage } from '../signup/signup';
import { CreateProfilePage } from '../create-profile/create-profile';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService, AuthMode } from '../../providers/auth.service';
import { EmailValidator } from '../../validators/email';
import { App } from 'ionic-angular';
import { NgZone } from '@angular/core';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    homePage: any = TabsPage;
    submitAttempt: boolean = false;
    public loading: any;
    public loginForm: any;

  constructor(
    public navCtrl    : NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl  : ToastController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private app: App,
    private zone: NgZone
  ) {
      this.loginForm = formBuilder.group({
          email: ['', Validators.compose([Validators.required,
          EmailValidator.isValid])],
          password: ['', Validators.compose([Validators.minLength(6),
          Validators.required])]
      });
  }

  /**
   * login with facebook
   */
  loginWithFacebook() {
    this.login2()
  }

  /**
   * login with google
   */
  loginWithGoogle() {
    this.login(AuthMode.GooglePlus);
  }

  /**
   * login with Github
   */

  elementChanged(input) {
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
  }
  loginUser() {
      this.submitAttempt = true;

      if (!this.loginForm.valid) {
          console.log(this.loginForm.value);
      } else {
          this.authService.loginUser(this.loginForm.value.email,
              this.loginForm.value.password).then(data => {

                  this.zone.run(() => {
                      this.app.getRootNav().setRoot(TabsPage);
                  });

              }, error => {
                  this.loading.dismiss().then(() => {
                      console.log(error);
                      let alert = this.alertCtrl.create({
                          message: error.message,
                          buttons: [{ text: "Okk", role: 'cancell' }]
                      });
                      alert.present();
                  });
              });

          this.loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              //duration: 3000
          });
          this.loading.present();
      }
  }
  

  goToResetPassword() {
      this.navCtrl.push(ResetpasswordPage);
  }

  createAccount() {
      this.navCtrl.push(SignupPage);
  }
  ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
  }

  private login(mode) {
    let loading = this.loadingCtrl.create();
    loading.present();
    
    this.authService.login(mode)
      .then((data) => {
        this.authService.getFullProfile(data.uid)
          .first()
          .subscribe((user) => {
              if (!(user.$value !== null)) {
                  console.log("Null User");
              this.authService.createAccount(data)
                .then( _=> {
                  loading.dismiss();
                  this.navCtrl.setRoot(CreateProfilePage, { userid: data.uid });
                }, (error)=> this.showMessage(error.message || 'Unknown error'));
            } else {
              loading.dismiss();
              this.navCtrl.setRoot(TabsPage);
            }
          }, (error)=> {
            loading.dismiss();
            this.showMessage(error.message || 'Unknown error');
          });
      }, (error)=>{
        loading.dismiss();
        this.showMessage(error.message || 'Unknown error');
    });
  }

  private login2() {
      let loading = this.loadingCtrl.create();
      loading.present();

      this.authService.login2()
          .then((data) => {
              this.authService.getFullProfile(data.uid)
                  .first()
                  .subscribe((user) => {
                      if (!(user.$value !== null)) {
                          console.log("Null User");
                          this.authService.createAccount(data)
                              .then(_ => {
                                  loading.dismiss();
                                  this.navCtrl.setRoot(CreateProfilePage, { userid: data.uid });
                              }, (error) => this.showMessage(error.message || 'Unknown error'));
                      } else {
                          loading.dismiss();
                          this.navCtrl.setRoot(TabsPage);
                      }
                  }, (error) => {
                      loading.dismiss();
                      this.showMessage(error.message || 'Unknown error');
                  });
          }, (error) => {
              loading.dismiss();
              this.showMessage(error.message || 'Unknown error');
          });
  }

  private showMessage(message: string) {
    this.toastCtrl.create({message: message, duration: 3000}).present();
  }
}
