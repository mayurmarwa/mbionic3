import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductPagePage } from '../product-page/product-page';
import { AngularFire } from 'angularfire2';
import { ProductData } from '../../providers/product-data';



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

    public displayList: Array<any>;
    public startNumber: any;
    public endNumber: any;
    public end: boolean = false;
    public catid: any;
    public grade: any;
    public loadingPopup: any;
    public products: any;
    public productList: any;
    public keys: any;
    public arrkey: any;
    public alloy: any;
    private infiniteScroll: any


    constructor(public navCtrl: NavController, public navParams: NavParams, public productData: ProductData, public af: AngularFire, public loadingCtrl: LoadingController) {

        this.loadingPopup = this.loadingCtrl.create({
            content: 'Filtering...'
        });

        this.catid = navParams.get("catid");
        this.grade = navParams.get("grade");
        this.alloy = navParams.get("alloy");

        //this.loadingPopup.present().then(() => {
            this.getProducts().then(data => { this.buildArray(data).then(() => { this.filterList(); }); });
        //});
    }

    doInfinite(infiniteScroll) {
        //console.log(this.startNumber);
        this.infiniteScroll = infiniteScroll;
        console.log(this.productList.length);
        if (this.productList.length > 20) {

            if (this.productList.length < 40) {
                for (let i = this.startNumber; i < this.productList.length; i++) {
                    this.displayList.push(this.productList[i]);
                    //this.displayList.push(i);


                }
            }
            else {
                for (let i = this.startNumber; i < this.endNumber; i++) {
                    this.displayList.push(this.productList[i]);
                    //this.displayList.push(i);


                }
            }

            if (this.end) {
                infiniteScroll.enable(false);
            }
            else {
                this.startNumber = this.endNumber;
                if (this.endNumber + 20 > this.productList.length) {

                    this.endNumber = this.productList.length;
                    this.end = true;

                }
                else {
                    this.endNumber = this.endNumber + 20;

                }

            }
        }
        else {
            infiniteScroll.enable(false);
        }
        //console.log("start", this.startNumber);
        //console.log("i", i);


        infiniteScroll.complete();

    }


    getProducts() {
        return new Promise(resolve => {
            /**this.products = this.af.database.list('/products', {
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
                } **/
            this.productList = this.productData.products.filter(item => {
                //console.log(item);
                return (item['catid'] === this.catid)
            });
            


            resolve(this.productList);
            // console.log(random);
            //if (random == 1) {
            //   this.buildArray(this.productList);
            // }

            //})


        });

    }

    private buildArray(array) {
        return new Promise(resolve => {
            this.startNumber = 20;
            this.endNumber = 40;
            this.end = false;
            this.displayList = [];
            if (this.infiniteScroll) {
                this.infiniteScroll.enable(true);
            }
            /**let m = array.length, t, i;
  
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
            this.backupList = array;**/

            if (array.length < 20) {
                for (let i = 0; i < array.length; i++) {
                    this.displayList.push(array[i]);
                    //this.displayList.push(i);
                }
            }
            else {
                for (let i = 0; i < 20; i++) {
                    this.displayList.push(array[i]);
                    //this.displayList.push(i);
                }
            }

            //this.loadingPopup.dismiss().then(() => {
            resolve(true);
            //});
        });
    }

    openproductpage(product) {

        this.navCtrl.push(ProductPagePage, { product: product });
    }

    filterList() {
        //console.log(this.alloy);


        if (this.alloy) {
            this.displayList = this.displayList.filter(item => {
                //console.log(item);
                //console.log(item['gradeval']);

                return (item['gradeval'] === this.grade && item['ptype'] === this.alloy)
            });
        }
        else {
            this.displayList = this.displayList.filter(item => {
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
