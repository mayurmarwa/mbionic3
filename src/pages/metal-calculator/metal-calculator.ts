import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

/*
  Generated class for the MetalCalculator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-metal-calculator',
  templateUrl: 'metal-calculator.html'
})
export class MetalCalculatorPage {

    public material: any;
    public shape: any;
    public length: any;
    public clength: any;
    public lengthunit: any;
    public width: any;
    public cwidth: any;
    public widthunit: any;
    public wall: any;
    public cwall: any;
    public wallunit: any;
    public thickness: any;
    public cthickness: any;
    public thicknessunit: any;
    public diameter: any;
    public cdiameter: any;
    public diamunit: any;
    public calculated: any;
    public outer: any;
    public couter: any;
    public outerunit: any;
    public inner: any;
    public cinner: any;
    public innerunit: any;
    public density: any;
    public calval: any;
    public caldone: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
        this.diamunit = "in";
        this.outerunit = "in";
        this.thicknessunit = "in";
        this.lengthunit = "in";
        this.innerunit = "in";
        this.wallunit = "in";
        this.widthunit = "in";
        this.caldone = false;
    }

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
      this.caldone = false;


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
      if (this.material == 91) {
          this.density = 2.71;
      }
      if (this.material == 92) {
          this.density = 2.71;
      }
      if (this.material == 93) {
          this.density = 2.71;
      }
      if (this.material == 94) {
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
      if (this.material == 32) {
          this.density = 9.22;
      }
      if (this.material == 33) {
          this.density = 8.89;
      }
      if (this.material == 40) {
          this.density = 8.47;
      }
      if (this.material == 41) {
          this.density = 8.11;
      }
      if (this.material == 42) {
          this.density = 8.44;
      }
      if (this.material == 43) {
          this.density = 8.19;
      }
      if (this.material == 44) {
          this.density = 8.22;
      }
      if (this.material == 45) {
          this.density = 8.28;
      }
      if (this.material == 50) {
          this.density = 8.80;
      }
      if (this.material == 51) {
          this.density = 8.44;
      }
      if (this.material == 60) {
          this.density = 8.94;
      }
      if (this.material == 70) {
          this.density = 8.80;
      }
      if (this.material == 71) {
          this.density = 8.44;
      }
      if (this.material == 80) {
          this.density = 4.51;
      }
      if (this.material == 81) {
          this.density = 4.43;
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
                      if (this.thicknessunit === "in") {
                          this.cthickness = this.thickness * 25.4;
                      }
                      else if (this.thicknessunit === "ft") {
                          this.cthickness = this.thickness * 304.8;
                      }
                      else if (this.thicknessunit === "yd") {
                          this.cthickness = this.thickness * 914.4;
                      }
                      else if (this.thicknessunit === "cm") {
                          this.cthickness = this.thickness * 10;
                      }
                      else if (this.thicknessunit === "m") {
                          this.cthickness = this.thickness * 1000;
                      }
                      else if (this.thicknessunit === "mm") {
                          this.cthickness = this.thickness;
                      }

                      if (this.lengthunit === "in") {
                          this.clength = this.length * 0.0254;
                      }
                      else if (this.thicknessunit === "ft") {
                          this.clength = this.length * 0.3048;
                      }
                      else if (this.lengthunit === "yd") {
                          this.clength = this.length * 0.9144;
                      }
                      else if (this.lengthunit === "cm") {
                          this.clength = this.length * 0.01;
                      }
                      else if (this.lengthunit === "mm") {
                          this.clength = this.length * 0.001;
                      }
                      else if (this.lengthunit === "m") {
                          this.clength = this.length;
                      }

                      if (this.widthunit === "in") {
                          this.cwidth = this.width * 25.4;
                      }
                      else if (this.widthunit === "ft") {
                          this.cwidth = this.width * 304.8;
                      }
                      else if (this.widthunit === "yd") {
                          this.cwidth = this.width * 914.4;
                      }
                      else if (this.widthunit === "cm") {
                          this.cwidth = this.width * 10;
                      }
                      else if (this.widthunit === "m") {
                          this.cwidth = this.width * 1000;
                      }
                      else if (this.widthunit === "mm") {
                          this.cwidth = this.width;
                      }

                      this.calculated = this.cthickness * this.cwidth * this.clength * 0.001 * this.density;
                      this.caldone = true;
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
                      if (this.outerunit === "in") {
                          this.couter = this.outer * 25.4;
                      }
                      else if (this.outerunit === "ft") {
                          this.couter = this.outer * 304.8;
                      }
                      else if (this.outerunit === "yd") {
                          this.couter = this.outer * 914.4;
                      }
                      else if (this.outerunit === "cm") {
                          this.couter = this.outer * 10;
                      }
                      else if (this.outerunit === "m") {
                          this.couter = this.outer * 1000;
                      }
                      else if (this.outerunit === "mm") {
                          this.couter = this.outer;
                      }
                      if (this.thicknessunit === "in") {
                          this.cthickness = this.thickness * 25.4;
                      }
                      else if (this.thicknessunit === "ft") {
                          this.cthickness = this.thickness * 304.8;
                      }
                      else if (this.thicknessunit === "yd") {
                          this.cthickness = this.thickness * 914.4;
                      }
                      else if (this.thicknessunit === "cm") {
                          this.cthickness = this.thickness * 10;
                      }
                      else if (this.thicknessunit === "m") {
                          this.cthickness = this.thickness * 1000;
                      }
                      else if (this.thicknessunit === "mm") {
                          this.cthickness = this.thickness;
                      }
                      if (this.lengthunit === "in") {
                          this.clength = this.length * 0.0254;
                      }
                      else if (this.lengthunit === "ft") {
                          this.clength = this.length * 0.3048;
                      }
                      else if (this.lengthunit === "yd") {
                          this.clength = this.length * 0.9144;
                      }
                      else if (this.lengthunit === "cm") {
                          this.clength = this.length * 0.01;
                      }
                      else if (this.lengthunit === "mm") {
                          this.clength = this.length * 0.001;
                      }
                      else if (this.lengthunit === "m") {
                          this.clength = this.length;
                      }
                      this.calculated = 0.003141 * this.cthickness * (this.couter - this.cthickness) * this.density * this.clength;
                      this.caldone = true;
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
                      if (this.outerunit === "in") {
                          this.couter = this.outer * 25.4;
                      }
                      else if (this.outerunit === "ft") {
                          this.couter = this.outer * 304.8;
                      }
                      else if (this.outerunit === "yd") {
                          this.couter = this.outer * 914.4;
                      }
                      else if (this.outerunit === "cm") {
                          this.couter = this.outer * 10;
                      }
                      else if (this.outerunit === "m") {
                          this.couter = this.outer * 1000;
                      }
                      else if (this.outerunit === "mm") {
                          this.couter = this.outer;
                      }
                      if (this.thicknessunit === "in") {
                          this.thickness = this.thickness * 25.4;
                      }
                      else if (this.thicknessunit === "ft") {
                          this.cthickness = this.thickness * 304.8;
                      }
                      else if (this.thicknessunit === "yd") {
                          this.cthickness = this.thickness * 914.4;
                      }
                      else if (this.thicknessunit === "cm") {
                          this.cthickness = this.thickness * 10;
                      }
                      else if (this.thicknessunit === "m") {
                          this.cthickness = this.thickness * 1000;
                      }
                      else if (this.thicknessunit === "mm") {
                          this.cthickness = this.thickness;
                      }
                      if (this.lengthunit === "in") {
                          this.clength = this.length * 0.0254;
                      }
                      else if (this.lengthunit === "ft") {
                          this.clength = this.length * 0.3048;
                      }
                      else if (this.lengthunit === "yd") {
                          this.clength = this.length * 0.9144;
                      }
                      else if (this.lengthunit === "cm") {
                          this.clength = this.length * 0.01;
                      }
                      else if (this.lengthunit === "mm") {
                          this.clength = this.length * 0.001;
                      }
                      else if (this.lengthunit === "m") {
                          this.clength = this.length;
                      }
                      this.calval = [(4 * this.cthickness * this.couter) - (4 * this.cthickness * this.cthickness)];
                      this.calculated = this.calval * this.density * 0.001 * this.clength;
                      this.caldone = true;
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
                      if (this.lengthunit === "in") {
                          this.clength = this.length * 0.0254;
                      }
                      else if (this.lengthunit === "ft") {
                          this.clength = this.length * 0.3048;
                      }
                      else if (this.lengthunit === "yd") {
                          this.clength = this.length * 0.9144;
                      }
                      else if (this.lengthunit === "cm") {
                          this.clength = this.length * 0.01;
                      }
                      else if (this.lengthunit === "mm") {
                          this.clength = this.length * 0.001;
                      }
                      else if (this.lengthunit === "m") {
                          this.clength = this.length;
                      }
                      if (this.innerunit === "in") {
                          this.cinner = this.inner * 25.4;
                      }
                      else if (this.innerunit === "ft") {
                          this.cinner = this.inner * 304.8;
                      }
                      else if (this.innerunit === "yd") {
                          this.cinner = this.inner * 914.4;
                      }
                      else if (this.innerunit === "cm") {
                          this.cinner = this.inner * 10;
                      }
                      else if (this.innerunit === "m") {
                          this.cinner = this.inner * 1000;
                      }
                      else if (this.innerunit === "mm") {
                          this.cinner = this.inner;
                      }
                      this.calculated = 0.000866 * this.cinner * this.cinner * this.density * this.clength;
                      this.caldone = true;
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
                      if (this.lengthunit === "in") {
                          this.clength = this.length * 0.0254;
                      }
                      else if (this.lengthunit === "ft") {
                          this.clength = this.length * 0.3048;
                      }
                      else if (this.lengthunit === "yd") {
                          this.clength = this.length * 0.9144;
                      }
                      else if (this.lengthunit === "cm") {
                          this.clength = this.length * 0.01;
                      }
                      else if (this.lengthunit === "mm") {
                          this.clength = this.length * 0.001;
                      }
                      else if (this.lengthunit === "m") {
                          this.clength = this.length;
                      }
                      if (this.widthunit === "in") {
                          this.cwidth = this.width * 25.4;
                      }
                      else if (this.widthunit === "ft") {
                          this.cwidth = this.width * 304.8;
                      }
                      else if (this.widthunit === "yd") {
                          this.cwidth = this.width * 914.4;
                      }
                      else if (this.widthunit === "cm") {
                          this.cwidth = this.width * 10;
                      }
                      else if (this.widthunit === "m") {
                          this.cwidth = this.width * 1000;
                      }
                      else if (this.widthunit === "mm") {
                          this.cwidth = this.width;
                      }
                      this.calculated = 0.001 * this.cwidth * this.cwidth * this.density * this.clength;
                      this.caldone = true;
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
                      if (this.outerunit === "in") {
                          this.couter = this.outer * 25.4;
                      }
                      else if (this.outerunit === "ft") {
                          this.couter = this.outer * 304.8;
                      }
                      else if (this.outerunit === "yd") {
                          this.couter = this.outer * 914.4;
                      }
                      else if (this.outerunit === "cm") {
                          this.couter = this.outer * 10;
                      }
                      else if (this.outerunit === "m") {
                          this.couter = this.outer * 1000;
                      }
                      else if (this.outerunit === "mm") {
                          this.couter = this.outer;
                      }
                      if (this.lengthunit === "in") {
                          this.clength = this.length * 0.0254;
                      }
                      else if (this.lengthunit === "ft") {
                          this.clength = this.length * 0.3048;
                      }
                      else if (this.lengthunit === "yd") {
                          this.clength = this.length * 0.9144;
                      }
                      else if (this.lengthunit === "cm") {
                          this.clength = this.length * 0.01;
                      }
                      else if (this.lengthunit === "mm") {
                          this.clength = this.length * 0.001;
                      }
                      else if (this.lengthunit === "m") {
                          this.clength = this.length;
                      }
                      this.calculated = 0.0007854 * this.couter * this.couter * this.density * this.clength;
                      this.caldone = true;
                  }
              }

             
          }
      }
 
  }

}
