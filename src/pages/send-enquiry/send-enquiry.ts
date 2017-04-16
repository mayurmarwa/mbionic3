import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import { EnquirySentPage } from '../enquiry-sent/enquiry-sent';
import { Storage } from '@ionic/storage';
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
    public seller: any;
    public user: any;
    public product: any;
    public userEnquiries: any;
    public sellerEnquiries: any;
    public enquiry: any;
    public loading: any;
    public productunit: any;
    public productmrate: any;
    public productkrate: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public af: AngularFire, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public authService: AuthService, public storage: Storage, private viewCtrl: ViewController) {
        storage.ready().then(() => {
            storage.get('currentuser').then((val) => {

                this.currentuser = JSON.parse(val);
                this.product = navParams.get("product");
                this.sellerID = this.product.uid;
                //console.log(this.currentuser);
                //this.currentuser = firebase.auth().currentUser;
                this.userEnquiries = af.database.list('/users/' + this.currentuser.uid + '/enquiries');
                this.sellerEnquiries = af.database.list('/users/' + this.sellerID + '/enquiries');

                if (this.product.mrate) {
                    this.productmrate = this.product.mrate
                }
                else {
                    this.productmrate = null;
                }
                if (this.product.krate) {
                    this.productkrate = this.product.krate
                }
                else {
                    this.productkrate = null;
                }

                this.productunit = "Kg";


                this.authService.getFullProfile(this.sellerID).first()
                    .subscribe(user => {
                        //loading.dismiss();
                        // this.user.displayName = user.displayName;
                        //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                        //this.user.photoURL = user.photoURL || this.user.photoURL;
                        this.seller = user;
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

            })
                .catch((err) =>
                    console.log(err));
        }).catch((err) =>
            console.log(err));

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

        this.loading.present().then(() => {
            this.userEnquiries.push(this.enquiryForm.value).then(data => {
                //console.log(this.enquiryForm.value);
                this.af.database.object('users/' + this.currentuser.uid + '/enquiries/' + data.key).update(
                    {

                        type: 'sent',
                        otheruser: this.sellerID,
                        otheruserName: this.seller.name,
                        otheruserNo: this.seller.mobile,
                        product: this.product,
                        productName: this.product.name,
                        productUnit: this.productunit,
                        productMrate: this.productmrate,
                        productKrate: this.productkrate,
                        timestamp: firebase.database['ServerValue']['TIMESTAMP']
                        //detials: this.productForm.value.name,

                    }



                ).then(info => {

                    //console.log("successsent");
                    //this.navCtrl.pop();

                    //this.navCtrl.pop();

                }).catch(info => {

                    //console.log("successsent");
                    //this.navCtrl.pop();

                    //this.navCtrl.pop();

                });
                this.af.database.object('users/' + this.sellerID + '/enquiries/' + data.key).update(
                    {

                        type: 'received',
                        otheruser: this.currentuser.uid,
                        otheruserName: this.user.name,
                        otheruserNo: this.user.mobile,
                        product: this.product,
                        productName: this.product.name,
                        productUnit: this.productunit,
                        productMrate: this.productmrate,
                        productKrate: this.productkrate,
                        rate: this.enquiryForm.value.rate,
                        quantity: this.enquiryForm.value.quantity,
                        unit: this.enquiryForm.value.unit,
                        payment: this.enquiryForm.value.payment,
                        details: this.enquiryForm.value.details,
                        timestamp: firebase.database['ServerValue']['TIMESTAMP']
                        //detials: this.productForm.value.name,

                    }
                ).then(info => {

                    //console.log("successrcv");
                    //this.navCtrl.pop();
                    //this.navCtrl.pop();
                    this.loading.dismiss().then(() => {
                        this.navCtrl.push(EnquirySentPage, { enquiryID: data.key, sellerID: this.sellerID, uid: this.currentuser.uid })
                            .then(() => {
                                const index = this.viewCtrl.index;
                                this.navCtrl.remove(index);
                                this.navCtrl.remove(index - 1);
                            });
                    });
                    

                }).catch(info => {

                    //console.log("successsent");
                    //this.navCtrl.pop();

                    //this.navCtrl.pop();

                });


            }).catch(info => {

                //console.log("successsent");
                //this.navCtrl.pop();

                //this.navCtrl.pop();

            });
        });
    }


}
