import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import firebase from 'firebase';
import { EnquirySentPage } from '../enquiry-sent/enquiry-sent';
import { Observable } from 'rxjs/Observable'; 

/*
  Generated class for the SendEnquiry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-send-enquiry',
  templateUrl: 'send-enquiry.html'
})
export class SendEnquiryPage {

	public enquiryForm;
	public currentuser: any;
	public sellerID: any;
	public product: any;
	public userEnquiries: any;
    public sellerEnquiries: any;
    public enquiry: any;
    public loading: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public af: AngularFire, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  
      this.product = navParams.get("product");
      this.sellerID = this.product.uid;		
        this.currentuser = firebase.auth().currentUser;
		this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries' );
		this.sellerEnquiries = af.database.list('/users/' + this.sellerID + '/enquiries' );        
        this.enquiryForm = formBuilder.group({
            rate: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['', Validators.required],
            payment: ['', Validators.required],
            details: ['',]    

        });

    
	
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SendEnquiryPage');
	//console.log(this.seller);
	//console.log(this.productID);
    }

  showConfirm(enquiryForm) {
      if (!enquiryForm.valid) {
          let alert = this.alertCtrl.create({
              title: 'Invalid Entries!',
              subTitle: 'Please fill all required entries',
              buttons: ['OK']
          });
          alert.present();
      }
      else {
          let confirm = this.alertCtrl.create({
              title: 'Submit Enquiry?',
              message: 'Do you want to send this enquiry to the seller?',
              buttons: [
                  {
                      text: 'No',

                  },
                  {
                      text: 'Agree',
                      handler: () => {
                          this.submitEnquiry();
                      }
                  }
              ]
          });
          confirm.present();
          
      }


  }


  submitEnquiry() {
      this.loading = this.loadingCtrl.create({
          content: 'Sending Enquiry, Please Wait...'
      });
   this.userEnquiries.push(this.enquiryForm.value).then(data => {
   //console.log(this.enquiryForm.value);
  this.af.database.object('users/' + this.currentuser.uid + '/enquiries/' + data.key).update(
              {

                  type: 'sent',
				  otheruser: this.sellerID,
				  productName: this.product.name
                  //detials: this.productForm.value.name,
                  
              }



          ).then(info => { 

              //console.log("successsent");
              //this.navCtrl.pop();
              
              //this.navCtrl.pop();

              });
		this.af.database.object('users/' + this.sellerID + '/enquiries/' + data.key).update(
              {

                  type: 'received',
				  otheruser: this.currentuser.uid,
				  productName: this.product.name,
				  details: this.enquiryForm.value.details
                  //detials: this.productForm.value.name,
                  
              }
          ).then(info => { 

              //console.log("successrcv");
              //this.navCtrl.pop();
              //this.navCtrl.pop();

      });

        this.loading.present();

        setTimeout(() => {
            this.navCtrl.pop({animate: false});
            this.navCtrl.push(EnquirySentPage, { enquiryID: data.key, sellerID: this.sellerID }, {animate: false});
        }, 1000);

        setTimeout(() => {
            this.loading.dismiss();
        }, 3000);
        	  
      })
  }

  
}
