import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the SelectCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()

@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html'
})
export class SelectCategoryPage {

    categories: FirebaseListObservable<any>;
    public parentcat: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
        this.categories = af.database.list('/productcategories',{query: {orderByChild: 'catid'}});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCategoryPage');
  }

  detailpage(category) {

      if (category.catid == 4 || category.catid == 8 || category.catid == 9 || category.catid == 11 ) {

          this.categories = this.af.database.list('/productcategories/' + category.$key + '/subcategories/', { query: { orderByChild: 'oid' } });
          this.parentcat = category.$key;
      }
      else if (category.catid === '8c' || category.catid === '9c' || category.catid === '11d') {

          this.categories = this.af.database.list('/productcategories/' + this.parentcat + '/subcategories/' + category.$key + '/types/', { query: { orderByChild: 'oid' } });
      }
      else {
          this.navCtrl.push('AddProductPage', { category: category });
      }
  }

}
