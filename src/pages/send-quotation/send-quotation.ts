import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth.service';
import firebase from 'firebase';

/*
  Generated class for the SendQuotation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-send-quotation',
  templateUrl: 'send-quotation.html'
})
export class SendQuotationPage {

	public quoteForm;
	public currentuser: any;
	public postuserID: any;
	public requirement: any;
	public userEnquiries: any;
    public postuserEnquiries: any;
    public loading: any;
    public poster: any;
    public user: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public af: AngularFire, public authService: AuthService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage) {
        storage.ready().then(() => {
            storage.get('currentuser').then((val) => {

                this.currentuser = JSON.parse(val);
                this.requirement = navParams.get("requirement");
                this.postuserID = this.requirement.uid;

                this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
                this.postuserEnquiries = af.database.list('/users/' + this.postuserID + '/enquiries');

                this.authService.getFullProfile(this.postuserID).first()
                    .subscribe(user => {
                        //loading.dismiss();
                        // this.user.displayName = user.displayName;
                        //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                        //this.user.photoURL = user.photoURL || this.user.photoURL;
                        this.poster = user;
                        //console.log(this.seller);
                    }, (error) => {
                        //loading.dismiss();
                        console.log('Error: ' + JSON.stringify(error));
                    });

                this.authService.getFullProfile(this.currentuser.uid).first()
                    .subscribe(user => {
                        //loading.dismiss();
                        // this.user.displayName = user.displayName;
                        //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                        //this.user.photoURL = user.photoURL || this.user.photoURL;
                        this.user = user;
                        //console.log(this.user);
                    }, (error) => {
                        //loading.dismiss();
                        console.log('Error: ' + JSON.stringify(error));
                    });


            });

        });
        this.quoteForm = formBuilder.group({
            price: ['', Validators.required],
            delivery: ['', Validators.required],
            payment: ['', Validators.required],
            details: ['', Validators.required]

        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendQuotationPage');
  }
  showConfirm(quoteForm) {
      if (!quoteForm.valid) {
          let alert = this.alertCtrl.create({
              title: 'Invalid Entries!',
              subTitle: 'Please fill all required entries',
              buttons: ['OK']
          });
          alert.present();
      }
      else {
          let confirm = this.alertCtrl.create({
              title: 'Submit Quote?',
              message: 'Do you want to send this quote to the buyer?',
              buttons: [
                  {
                      text: 'No',

                  },
                  {
                      text: 'Agree',
                      handler: () => {
                          this.submitQuote();
                      }
                  }
              ]
          });
          confirm.present();

      }
  }

  submitQuote() {

      this.loading = this.loadingCtrl.create({
          content: 'Quote sent, check enquiries for details...'
      });

   this.userEnquiries.push(this.quoteForm.value).then(data => {
   //console.log(this.enquiryForm.value);
  this.af.database.object('users/' + this.currentuser.uid + '/enquiries/' + data.key).update(
              {

                  type: 'sent',
                  otheruser: this.postuserID,
                  otheruserName: this.poster.name,
                  otheruserNo: this.poster.mobile,
				  requirement: this.requirement,
                  quote: this.quoteForm.value,
                  timestamp: firebase.database['ServerValue']['TIMESTAMP']
                  
              }



          ).then(info => { 

              //console.log("successsent");
              //this.navCtrl.pop();
              //this.navCtrl.pop();

              });
		this.af.database.object('users/' + this.postuserID + '/enquiries/' + data.key).update(
              {

                  type: 'received',
                  otheruser: this.currentuser.uid,
                  otheruserName: this.user.name,
                  otheruserNo: this.user.mobile,
				  requirement: this.requirement,
                  quote: this.quoteForm.value,
                  timestamp: firebase.database['ServerValue']['TIMESTAMP']
                  //detials: this.productForm.value.name,
                  
              }
          ).then(info => { 

              this.loading.present();

              setTimeout(() => {
                  this.navCtrl.popToRoot({ animate: false });
                  //this.navCtrl.setRoot(EnquiriesPage, { animate: false });

              }, 1000);

              setTimeout(() => {
                  this.loading.dismiss();
              }, 3000);
              //this.navCtrl.pop();
              //this.navCtrl.pop();

              });
		 
			  
	})
  
  }
}
