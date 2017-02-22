import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SendEnquiryPage } from '../send-enquiry/send-enquiry';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
		this.product = navParams.get("product");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPagePage');
  }

  sendEnquiry(){
	 this.navCtrl.push(SendEnquiryPage, {productName: this.product.name,seller: this.product.uid});
	

  }
}
