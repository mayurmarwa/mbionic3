import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AddProductPage } from '../add-product/add-product';

/*
  Generated class for the SelectCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html'
})
export class SelectCategoryPage {

    categories: FirebaseListObservable<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
        this.categories = af.database.list('/productcategories',{query: {orderByChild: 'catid'}});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategoryPage');
  }

  detailpage(category) {

      this.navCtrl.push(AddProductPage, {category: category});
  }

}
