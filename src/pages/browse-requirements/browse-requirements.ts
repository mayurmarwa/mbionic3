import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { ProductData } from '../../providers/product-data';



/*
  Generated class for the BrowseRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()

@Component({
  selector: 'page-browse-requirements',
  templateUrl: 'browse-requirements.html'
})
export class BrowseRequirementsPage {

    public startNumber: any;
    public endNumber: any;
    public end: boolean = false;
    public displayList: any;
    public requirementList: any;
    public loadedlist: any;
    public requirementRef: any;
    public loadingPopup: any;
    public keys: any;
    public members: any;
    private infiniteScroll: any;



    constructor(public navCtrl: NavController, public navParams: NavParams, public productData: ProductData, public loadingCtrl: LoadingController, private viewCtrl: ViewController) {
  
      this.loadingPopup = this.loadingCtrl.create({
          content: 'Loading...'
      });
     
      //this.requirementRef = firebase.database().ref('/requirements');
      this.members = this.productData.requirements;
      this.requirementList = this.productData.requirements;
      this.loadedlist = this.productData.requirements;
      this.buildArray(this.requirementList);


          //this.buildArray(this.members);
          //this.requirementList = members;
          //this.loadedlist = members;
          //this.loadingPopup.dismiss();
      
    }

    doInfinite(infiniteScroll) {
        //console.log(this.startNumber);
        this.infiniteScroll = infiniteScroll;
        console.log(this.requirementList.length);
        if (this.requirementList.length > 20) {

            if (this.requirementList.length < 40) {
                for (let i = this.startNumber; i < this.requirementList.length; i++) {
                    this.displayList.push(this.requirementList[i]);
                    //this.displayList.push(i);


                }
            }
            else {
                for (let i = this.startNumber; i < this.endNumber; i++) {
                    this.displayList.push(this.requirementList[i]);
                    //this.displayList.push(i);


                }
            }

            if (this.end) {
                infiniteScroll.enable(false);
            }
            else {
                this.startNumber = this.endNumber;
                if (this.endNumber + 20 > this.requirementList.length) {

                    this.endNumber = this.requirementList.length;
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

    ionViewDidEnter() {


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


  initializeItems(): void {
      this.requirementList = this.loadedlist;
      this.buildArray(this.requirementList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseRequirementsPage');
  }

  openrequirementpage(requirement) {

      this.navCtrl.push('RequirementDetailsPage', {requirement: requirement});
  }

  openmyrequirements() {

      this.navCtrl.push('MyRequirementsPage');
          //.then(() => {
          // first we find the index of the current view controller:
          //const index = this.viewCtrl.index;
          // then we remove it from the navigation stack
          //this.navCtrl.remove(index);
      //});
  }

  getItems(searchbar) {
      // Reset items back to all of the items
      this.initializeItems();

      // set q to the value of the searchbar
      var q = searchbar.srcElement.value;


      // if the value is an empty string don't filter the items
      if (!q) {
          return;
      }

      this.requirementList = this.requirementList.filter((v) => {
          
          if (v.category && v.grade && q) {
              let search = v.category + ' ' + v.grade;
              let search2 = v.grade + ' ' + v.category;
              if (search.toLowerCase().indexOf(q.toLowerCase()) > -1 || search2.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                  return true;
              }
              return false;
          }
          else {
              if(v.category && q) {
                  if (v.category.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                      return true;
                  }
                  return false;
              }
          }
      });

      console.log(q, this.requirementList.length);


      this.buildArray(this.requirementList);
      //console.log(q, this.directory.length);

  }



}
