import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
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
	public postuserEnquiries:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public af: AngularFire) {
	
		this.requirement = navParams.get("requirement");
		this.postuserID = this.requirement.uid;		
        this.currentuser = firebase.auth().currentUser;
		this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries' );
		this.postuserEnquiries = af.database.list('/users/' + this.postuserID + '/enquiries' ); 
		
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

  submitQuote(){
   this.userEnquiries.push(this.quoteForm.value).then(data => {
   //console.log(this.enquiryForm.value);
  this.af.database.object('users/' + this.currentuser.uid + '/enquiries/' + data.key).update(
              {

                  type: 'sent',
				  otheruser: this.postuserID,
				  requirement: this.requirement,
                  quote: this.quoteForm.value
                  
              }



          ).then(info => { 

              console.log("successsent");
              //this.navCtrl.pop();
              //this.navCtrl.pop();

              });
		this.af.database.object('users/' + this.postuserID + '/enquiries/' + data.key).update(
              {

                  type: 'received',
				  otheruser: this.currentuser.uid,
				  requirement: this.requirement,
				  quote: this.quoteForm.value
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
