import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SendEnquiryPage } from '../send-enquiry/send-enquiry';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ProductPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-page',
  templateUrl: 'product-page.html'
})
export class ProductPagePage {

    public product: any;
    public currentuser: any;
    public cur: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
       

      storage.ready().then(() => {
          storage.get('currentuser').then((val) => {

              this.currentuser = JSON.parse(val);
              this.product = navParams.get("product");
              console.log(this.product);
              //console.log(this.currentuser);

          })
              .catch((err) =>
                  console.log(err));
      }).catch((err) =>
          console.log(err));
      
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad ProductPagePage');
     
  }

  sendEnquiry(){
	 this.navCtrl.push(SendEnquiryPage, {product: this.product});
	

  }
}
