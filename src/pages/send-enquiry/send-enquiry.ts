import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

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
	public productName: any;
	public userEnquiries: any;
	public sellerEnquiries:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public af: AngularFire) {
  
		this.sellerID = navParams.get("seller");
		this.productName = navParams.get("productName");
        this.currentuser = firebase.auth().currentUser;
		this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries' );
		this.sellerEnquiries = af.database.list('/users/' + this.sellerID + '/enquiries' ); 
		
		this.enquiryForm = formBuilder.group({
            details: ['', Validators.required]    

        });

	
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SendEnquiryPage');
	//console.log(this.seller);
	//console.log(this.productID);
  }

  submitEnquiry(){
   this.userEnquiries.push(this.enquiryForm.value).then(data => {
   //console.log(this.enquiryForm.value);
  this.af.database.object('users/' + this.currentuser.uid + '/enquiries/' + data.key).update(
              {

                  type: 'sent',
				  otheruser: this.sellerID,
				  productName: this.productName
                  //detials: this.productForm.value.name,
                  
              }



          ).then(info => { 

              console.log("successsent");
              //this.navCtrl.pop();
              //this.navCtrl.pop();

              });
		this.af.database.object('users/' + this.sellerID + '/enquiries/' + data.key).update(
              {

                  type: 'received',
				  otheruser: this.currentuser.uid,
				  productName: this.productName,
				  details: this.enquiryForm.value.details
                  //detials: this.productForm.value.name,
                  
              }
          ).then(info => { 

              console.log("successrcv");
              //this.navCtrl.pop();
              //this.navCtrl.pop();

              });
		 
			  
	})
  
  }
}
