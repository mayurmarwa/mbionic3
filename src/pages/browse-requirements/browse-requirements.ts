import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';
import { MyRequirementsPage } from '../my-requirements/my-requirements';
import { ProductData } from '../../providers/product-data';


import firebase from 'firebase';

/*
  Generated class for the BrowseRequirements page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-browse-requirements',
  templateUrl: 'browse-requirements.html'
})
export class BrowseRequirementsPage {

    public requirementList: any;
    public loadedlist: any;
    public requirementRef: any;
    public loadingPopup: any;
    public keys: any;
    public members: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public productData: ProductData, public loadingCtrl: LoadingController, private viewCtrl: ViewController) {
  
      this.loadingPopup = this.loadingCtrl.create({
          content: 'Loading...'
      });
     
      //this.requirementRef = firebase.database().ref('/requirements');
      this.members = this.productData.requirements;
      

          this.buildArray(this.members);
          //this.requirementList = members;
          //this.loadedlist = members;
          //this.loadingPopup.dismiss();
      
    }

    ionViewDidEnter() {


    }

    private buildArray(array) {
        this.loadingPopup.present().then(() => { 
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
            this.requirementList = array;
            this.loadedlist = array;
            this.loadingPopup.dismiss().then(() => { resolve(true); });
            
            });
        });
    }


  initializeItems(): void {
      this.requirementList = this.loadedlist;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowseRequirementsPage');
  }

  openrequirementpage(requirement) {

      this.navCtrl.push(RequirementDetailsPage, {requirement: requirement});
  }

  openmyrequirements() {

      this.navCtrl.push(MyRequirementsPage);
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
          if (v.category && q) {
              if (v.category.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                  return true;
              }
              return false;
          }
      });

      //console.log(q, this.directory.length);

  }



}
