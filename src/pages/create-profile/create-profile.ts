import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular';
/*
  Generated class for the CreateProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html'
})
export class CreateProfilePage {
    public userid: any; 
    public profileForm; 
    constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, private app: App) {
        this.userid = navParams.get("userid");

        this.profileForm = formBuilder.group({
            //name: ['', Validators.required],
            mobile: ['', Validators.compose([Validators.minLength(10), Validators.required, Validators.maxLength(10)])],
            companyname: ['', Validators.required],
            address: ['', Validators.required],
            companyprofile: ['', Validators.required]
           

        });
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad CreateProfilePage');
      console.log(this.userid);
  }
  elementChanged(input) {
      let field = input.inputControl.name;
      this[field + "Changed"] = true;
  }
   createProfile() {
      //this.submitAttempt = true;

       if (!this.profileForm.valid) {
           console.log(this.profileForm.value);
       } else {

           this.af.database.list('/users').update(this.userid,
                              {
                   //name: userdata.value.name,
                   mobile: this.profileForm.value.mobile,
                   companyname: this.profileForm.value.companyname,
                   address: this.profileForm.value.address,
                   companyprofile: this.profileForm.value.companyprofile
                   //email: userdata.value.email,
                   //uid: authdata.auth.uid,
                   //photoURL: data.auth.photoURL,
                   //createdAt: firebase.database['ServerValue']['TIMESTAMP'],
                   //providerData: authdata.auth.provider

               });

           
               this.app.getRootNav().setRoot(TabsPage);
        

       }
         


      }
  }
