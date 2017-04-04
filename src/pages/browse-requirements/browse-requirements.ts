import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RequirementDetailsPage } from '../requirement-details/requirement-details';
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

    constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  
      let loadingPopup = this.loadingCtrl.create({
          content: 'Loading...'
      });
      loadingPopup.present();
      this.requirementRef = firebase.database().ref('/requirements');

      this.requirementRef.on('value', memberList => {
          let members = [];
          memberList.forEach(country => {
              members.push(country.val());
          });

          this.requirementList = members;
          this.loadedlist = members;
          loadingPopup.dismiss();
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
