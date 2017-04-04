import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the MetalCalculator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-metal-calculator',
  templateUrl: 'metal-calculator.html'
})
export class MetalCalculatorPage {

    public material: any;
    public shape: any;
    public length: any;
    public width: any;
    public wall: any;
    public thickness: any;
    public diameter: any;
    public calculated: any;
    public outer: any;
    public inner: any;
    public density: any;
    public calval: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MetalCalculatorPage');
  }

  doclear() {
      this.material = "";
      this.shape = "";
      this.length = "";
      this.width = "";
      this.wall = "";
      this.thickness = "";
      this.diameter = "";
      this.calculated = "";
      this.outer = "";
      this.inner = "";
      this.density = "";
      this.calval = "";


  }

  materialSelected() {
      if (this.material == 0) {
          this.density = 7.93;
      }
      if (this.material == 1) {
          this.density = 7.75;
      }
      if (this.material == 2) {
          this.density = 2.71;
      }
      if (this.material == 3) {
          this.density = 2.7;
      }
      if (this.material == 4) {
          this.density = 2.8;
      }
      if (this.material == 5) {
          this.density = 2.79;
      }
      if (this.material == 6) {
          this.density = 2.78;
      }
      if (this.material == 7) {
          this.density = 2.73;
      }
      if (this.material == 8) {
          this.density = 2.7;
      }
      if (this.material == 10) {
          this.density = 2.68;
      }
      if (this.material == 11) {
          this.density = 2.66;
      }
      if (this.material == 12) {
          this.density = 2.7;
      }
      if (this.material == 13) {
          this.density = 2.81;
      }
      if (this.material == 14) {
          this.density = 2.71;
      }
      if (this.material == 15) {
          this.density = 2.72;
      }
      if (this.material == 16) {
          this.density = 8.90;
      }
      if (this.material == 17) {
          this.density = 1.74;
      }
      if (this.material == 18) {
          this.density = 1.85;
      }
      if (this.material == 19) {
          this.density = 4.51;
      }
      if (this.material == 20) {
          this.density = 6.52;
      }
      if (this.material == 22) {
          this.density = 7.14;
      }
      if (this.material == 25) {
          this.density = 8.96;
      }
      if (this.material == 26) {
          this.density = 10.2;
      }
      if (this.material == 27) {
          this.density = 10.5;
      }
      if (this.material == 28) {
          this.density = 11.3;
      }
      if (this.material == 29) {
          this.density = 16.4;
      }
      if (this.material == 30) {
          this.density = 19.3;
      }
      if (this.material == 30) {
          this.density = 19.3;
      }

  }
  shapeSelected() { }
  calculate() {

      if (!this.material || this.material === "") {
          let alert = this.alertCtrl.create({
              title: 'Invalid Entries!',
              subTitle: 'Please select a material',
              buttons: ['OK']
          });
          alert.present();
      }
      else {
          if (!this.shape || this.shape === "") {
              let alert = this.alertCtrl.create({
                  title: 'Invalid Entries!',
                  subTitle: 'Please select a shape',
                  buttons: ['OK']
              });
              alert.present();
          }
          else {


              if (this.shape == 0 || this.shape == 1 || this.shape == 6) {
                  if (!this.thickness || this.thickness === "" || !this.width || this.width === "" || !this.length || this.length === "") {
                      let alert = this.alertCtrl.create({
                          title: 'Invalid Entries!',
                          subTitle: 'Please fill all measurements',
                          buttons: ['OK']
                      });
                      alert.present();
                  }
                  else {
                      this.calculated = this.thickness * this.width * this.length * 0.001 * 0.001 * this.density;
                  }
              }


              if (this.shape == 3) {
                  if (!this.thickness || this.thickness === "" || !this.outer || this.outer === "" || !this.length || this.length === "") {
                      let alert = this.alertCtrl.create({
                          title: 'Invalid Entries!',
                          subTitle: 'Please fill all measurements',
                          buttons: ['OK']
                      });
                      alert.present();
                  }
                  else {
                      this.calculated = 0.003141 * this.thickness * (this.outer - this.thickness) * this.density * this.length;
                  }
              }

              if (this.shape == 4) {
                  if (!this.thickness || this.thickness === "" || !this.outer || this.outer === "" || !this.length || this.length === "") {
                      let alert = this.alertCtrl.create({
                          title: 'Invalid Entries!',
                          subTitle: 'Please fill all measurements',
                          buttons: ['OK']
                      });
                      alert.present();
                  }
                  else {
                      this.calval = [(4 * this.thickness * this.outer) - (4 * this.thickness * this.thickness)];
                      this.calculated = this.calval * this.density * 0.001 * this.length;
                  }
              }

              if (this.shape == 7) {
                  if (!this.inner || this.inner === "" || !this.length || this.length === "") {
                      let alert = this.alertCtrl.create({
                          title: 'Invalid Entries!',
                          subTitle: 'Please fill all measurements',
                          buttons: ['OK']
                      });
                      alert.present();
                  }
                  else {
                      this.calculated = 0.000866 * this.inner * this.inner * this.density * this.length;
                  }
              }

              if (this.shape == 8) {
                  if (!this.width || this.width === "" || !this.length || this.length === "") {
                      let alert = this.alertCtrl.create({
                          title: 'Invalid Entries!',
                          subTitle: 'Please fill all measurements',
                          buttons: ['OK']
                      });
                      alert.present();
                  }
                  else {
                      this.calculated = 0.001 * this.width * this.width * this.density * this.length;
                  }
              }

              if (this.shape == 9) {
                  if (!this.outer || this.outer === "" || !this.length || this.length === "") {
                      let alert = this.alertCtrl.create({
                          title: 'Invalid Entries!',
                          subTitle: 'Please fill all measurements',
                          buttons: ['OK']
                      });
                      alert.present();
                  }
                  else {
                      this.calculated = 0.0007854 * this.outer * this.outer * this.density * this.length;
                  }
              }

             
          }
      }
 
  }

}
