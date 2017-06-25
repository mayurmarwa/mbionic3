import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';


/*
  Generated class for the DirectoryProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DirectoryProvider {

    public directoryRef: any;
    public directory: any;

  constructor(public http: Http) {
      console.log('Hello DirectoryProvider Provider');
      this.directoryRef = firebase.database().ref('/directory');
      
  }

  setDirectory() {
      this.directoryRef.orderByChild("Name").on('value', countryList => {
          let countries = [];

          countryList.forEach(country => {

              countries.push(country.val());
          });

          this.directory = countries;
          //this.loadedlist = countries;
          //console.log("here", this.directory);
          //this.loadingPopup.dismiss();


      });
  }

}
