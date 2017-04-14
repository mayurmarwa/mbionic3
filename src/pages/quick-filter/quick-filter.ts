import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductPagePage } from '../product-page/product-page';
import { AngularFire } from 'angularfire2';


/*
  Generated class for the QuickFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quick-filter',
  templateUrl: 'quick-filter.html'
})
export class QuickFilterPage {

    public catid: any;
    public grade: any;
    public loadingPopup: any;
    public products: any;
    public productList: any;
    public keys: any;
    public arrkey: any;
    public alloy: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public loadingCtrl: LoadingController) {

        this.loadingPopup = this.loadingCtrl.create({
            content: 'Filtering...'
        });

        this.catid = navParams.get("catid");
        this.grade = navParams.get("grade");
        this.alloy = navParams.get("alloy");

        this.loadingPopup.present().then(() => {
            this.getProducts().then(data => { this.buildArray(data).then(() => { this.filterList(); }); });
        });
    }

    getProducts() {
        return new Promise(resolve => {
            this.products = this.af.database.list('/products', {
                query: {
                    orderByChild: "catid",
                    equalTo: this.catid
                }, preserveSnapshot: true
            }).first().subscribe(snapshots => {
                this.productList = [];
                this.keys = [];
                snapshots.forEach(snapshot => {
                    this.arrkey = this.productList.push(snapshot.val());
                    this.keys.push(snapshot.key);
                    //console.log(snapshot.key);
                }, (error) => {
                    //loading.dismiss();
                    console.log('Error: ' + JSON.stringify(error));
                });
                for (var i in this.productList) {
                    this.productList[i].key = this.keys[i];
                }
                resolve(this.productList);
                // console.log(random);
                //if (random == 1) {
                //   this.buildArray(this.productList);
                // }

            })


        });

    }

    private buildArray(array) {
        return new Promise(resolve => {
            let m = array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            this.productList = array;
            console.log(array);
            //this.backupList = array;
            this.loadingPopup.dismiss().then(() => {
                resolve(true);
            });
        });
    }

    openproductpage(product) {

        this.navCtrl.push(ProductPagePage, { product: product });
    }

    filterList() {
        //console.log(this.alloy);


        if (this.alloy) {
            this.productList = this.productList.filter(item => {
                //console.log(item);
                //console.log(item['gradeval']);

                return (item['gradeval'] === this.grade && item['ptype'] === this.alloy)
            });
        }
        else {
            this.productList = this.productList.filter(item => {
                //console.log(item);
                console.log(item['gradeval']);

                return (item['gradeval'] === this.grade)
            });
        }
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickFilterPage');
  }

}
