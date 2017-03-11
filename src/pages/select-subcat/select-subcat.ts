import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { CategoryProductsPage } from '../category-products/category-products';
/*
  Generated class for the SelectSubcat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-subcat',
  templateUrl: 'select-subcat.html'
})
export class SelectSubcatPage {

    public catid: any;
    categories: FirebaseListObservable<any>;
    public parentcat: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
        this.catid = navParams.get("catid");
        this.loadCategory(this.catid);
    }

    loadCategory(catid) {

        if (catid === 4 ) {

            this.categories = this.af.database.list('/productcategories/SSPipes/subcategories/', { query: { orderByChild: 'oid' } });
            this.parentcat = 'SSPipes';
        }
        else if (catid === 8) {

            this.categories = this.af.database.list('/productcategories/D&SD/subcategories/', { query: { orderByChild: 'oid' } });
            this.parentcat = 'D&SD';
        }
        else if (catid === 9) {

            this.categories = this.af.database.list('/productcategories/Nickel/subcategories/', { query: { orderByChild: 'oid' } });
            this.parentcat = 'Nickel';
        }
        else if (catid === '8c' || catid === '9c') {

            this.categories = this.af.database.list('/productcategories/' + this.parentcat + '/subcategories/pipes/types/', { query: { orderByChild: 'oid' } });
        }
        else {
            this.navCtrl.push(CategoryProductsPage, { catid: catid });
        }
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectSubcatPage');
  }

}
