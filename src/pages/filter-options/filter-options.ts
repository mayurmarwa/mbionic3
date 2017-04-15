import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


/*
  Generated class for the FilterOptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter-options',
  templateUrl: 'filter-options.html'
})
export class FilterOptionsPage {

    public weight: any;
    public weightval: any;
    public thicknessval: any;
    public mmval: any;
    public length: any;
    public width: any;
    public form: any;
    public gradeList: FirebaseListObservable<any>;
    public gradecat: any;
    public category: any;
    public selectedAlloy: any;
    public typeOD: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public af: AngularFire) {

        this.category = {};
        this.category.catid = navParams.get("catid");
        this.form = {};
        this.form.thicknessval = {};
        this.thicknessval = {};
        this.form.mmval = {};
        this.mmval = {};
        this.thicknessval.lower = 0;
        this.thicknessval.upper = 10.01;
        this.mmval.lower = 0;
        this.mmval.upper = 10.01;
        this.getGrades();

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterOptionsPage');
  }

  filterdismiss() {

      this.viewCtrl.dismiss(false); //Send back the form object when closeModal is called
  }
  applyFilter() {
      if (this.form.thickness) {
          
          this.form.thicknessval.lower = parseFloat(this.thicknessval.lower);
          this.form.thicknessval.upper = parseFloat(this.thicknessval.upper);
          console.log(this.thicknessval.lower);
          console.log(this.thicknessval.upper);

      }
      if (this.form.mm) {
          
          this.form.mmval.lower = parseFloat(this.mmval.lower);
          this.form.mmval.upper = parseFloat(this.mmval.upper);
      }

      this.viewCtrl.dismiss(this.form); //Send back the form object when closeModal is called
  }

  consolelog() {

      console.log(this.form.thickness);
      //console.log(this.weightval);
  }

  getGrades() {
      if (this.category.catid == 1 || this.category.catid == 2 || this.category.catid == 3 || this.category.catid === '4a' || this.category.catid === '4b' || this.category.catid === '4c' || this.category.catid === '4d' || this.category.catid === '4e' || this.category.catid == 5 || this.category.catid == 6 || this.category.catid == 7) {
          this.gradecat = 1;
      }
      else if (this.category.catid === '8a' || this.category.catid === '8b' || this.category.catid === '8c1' || this.category.catid === '8c2' || this.category.catid === '8c3' || this.category.catid === '8c4' || this.category.catid === '8c5' || this.category.catid === '8d') {
          this.gradecat = 2;
      }
      else if (this.category.catid === '9a' || this.category.catid === '9b' || this.category.catid === '9c1' || this.category.catid === '9c2' || this.category.catid === '9c3' || this.category.catid === '9c4' || this.category.catid === '9c5' || this.category.catid === '9d') {
          this.form.selectedAlloy = 'Hastelloy';
          this.gradecat = 3;
      }
      else {
          this.gradecat = 1;
      }
      this.gradeList = this.af.database.list('/grades/' + this.gradecat);
  }

  typeSelected() {

      //console.log(this.typeOD);
      //console.log(this.seamlessForm.value.type);

      if (this.form.type === "OD") {
          this.typeOD = true;
      }
      else {
          this.typeOD = false;
      }
      //console.log(this.typeOD);

  }

  alloySelected() {

      if (this.form.selectedAlloy === 'Hastelloy') {
          this.gradecat = 3;
      }
      else if (this.form.selectedAlloy === 'Inconel') {
          this.gradecat = 4;
      }
      else if (this.form.selectedAlloy === 'Monel') {
          this.gradecat = 5;
      }
      else if (this.form.selectedAlloy === 'Nimonic') {
          this.gradecat = 6;
      }
      else if (this.form.selectedAlloy === 'Nickel') {
          this.gradecat = 7;
      }
      else if (this.form.selectedAlloy === 'Titanium') {
          this.gradecat = 8;
      }
      this.gradeList = this.af.database.list('/grades/' + this.gradecat);
  }

}
