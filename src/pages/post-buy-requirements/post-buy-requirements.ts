import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the PostBuyRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-buy-requirements',
  templateUrl: 'post-buy-requirements.html'
})
export class PostBuyRequirementsPage {

	requirements: FirebaseListObservable<any>;
	currentuser: any;
    requirementForm: any;
    public loading: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  
		this.currentuser = firebase.auth().currentUser;
        this.requirements = af.database.list('/requirements');

		this.requirementForm = formBuilder.group({
            category: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['', Validators.required],
            bid: ['', Validators.required],
            details: ['', Validators.required],
            uid: ['', Validators.required],
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostBuyRequirementsPage');
  }
  showConfirm(requirementForm) {
      if (!requirementForm.valid) {
          let alert = this.alertCtrl.create({
              title: 'Invalid Entries!',
              subTitle: 'Please fill all required entries',
              buttons: ['OK']
          });
          alert.present();
      }
      else {
          let confirm = this.alertCtrl.create({
              title: 'Post Requirement?',
              message: 'Do you want to post this requirement to the market?',
              buttons: [
                  {
                      text: 'No',

                  },
                  {
                      text: 'Agree',
                      handler: () => {
                          this.submitRequirement();
                      }
                  }
              ]
          });
          confirm.present();
      }
}

  submitRequirement() {
      this.loading = this.loadingCtrl.create({
          content: 'Requrement Posted, Going Home...'
      });
      
      console.log(this.requirementForm.value);
      this.requirements.push(this.requirementForm.value).then(data => {

          console.log(data.key);
          this.af.database.object('users/' + this.currentuser.uid + '/requirements/' + data.key).set(
              {

                  islive: true,
                  details: this.requirementForm.value
              }



          ).then(info => { 

                  this.loading.present();

                  setTimeout(() => {
                      this.navCtrl.pop({ animate: false });
                      
                  }, 1000);

                  setTimeout(() => {
                      this.loading.dismiss();
                  }, 3000);

              })
              

              })

  }

}
