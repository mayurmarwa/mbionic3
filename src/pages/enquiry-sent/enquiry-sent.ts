import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Tabs, ViewController  } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
/*
  Generated class for the EnquirySent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enquiry-sent',
  templateUrl: 'enquiry-sent.html'
})
@IonicPage()

export class EnquirySentPage {

    public tab: Tabs;
    public sellerID: any;
    public seller: any;
    public enquiry: any;
    public enquiryID: any;
    public loading: any;
    public uid: any;
    public subscription: any;
    public subscription2: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public authService: AuthService, private viewCtrl: ViewController) {
        
        this.tab = this.navCtrl.parent;
        this.sellerID = navParams.get("sellerID");
        this.enquiryID = navParams.get("enquiryID");
        this.uid = navParams.get("uid");

        console.log(this.enquiryID);

        this.subscription = this.authService.getFullProfile(this.sellerID)
            .first().subscribe(user => {
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

        this.subscription2 =  this.authService.getEnquiry(this.uid,this.enquiryID)
            .first().subscribe(enquiry => {
                //loading.dismiss();
                // this.user.displayName = user.displayName;
                //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
                //this.user.photoURL = user.photoURL || this.user.photoURL;
                this.enquiry = enquiry;
                //console.log(this.enquiry);
               
            }, (error) => {
                //loading.dismiss();
                console.log('Error: ' + JSON.stringify(error));
            });
         
    }

  ionViewDidLoad() {
      console.log('ionViewDidLoad EnquirySentPage');
      
    }



  sendMessage() {
     

      
      this.navCtrl.popToRoot({ animate: false }).then(() => {
          this.tab.select(3);
      });
          //this.tab.select(3);
          //this.navCtrl.setRoot(EnquiriesPage,{ animate: false });
          //this.navCtrl.push(EnquiryDetailsPage, {enquiry: this.enquiry}, { animate: false });
          //this.navCtrl.pop({ animate: false });
      

      
  }

  viewProfile() {
     

      
          //this.navCtrl.pop({ animate: false });          
      this.navCtrl.push('MyProfilePage', { userID: this.sellerID })
          .then(() => {
              const index = this.viewCtrl.index;
              this.navCtrl.remove(index);
              //this.navCtrl.remove(index - 1);
          });
          //this.navCtrl.pop({ animate: false });
     

      
          
      

  }

 

}
