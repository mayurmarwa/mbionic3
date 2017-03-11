import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from 'ionic-native';
import { Platform } from 'ionic-angular';

/*
  Generated class for the SpeedDial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-speed-dial',
  templateUrl: 'speed-dial.html'
})
export class SpeedDialPage {

	speedNumber: any;
	intNumber: any;
	dialNumber: any;
	callEnable: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
	this.speedNumber = '';
	this.dialNumber = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeedDialPage');
  }

  addNumber(number){
	
		
		if(this.speedNumber.length < 4){
			this.speedNumber = this.speedNumber + number;
			this.intNumber = parseInt(this.speedNumber,10);
		}
        if (this.speedNumber.length == 4) {
            this.intNumber = parseInt(this.speedNumber, 10);
			this.calNumber(this.intNumber);	
		}
		
			
  }

  calNumber(inum: number){
  if(1000 <= inum && inum <= 1099){
				this.dialNumber = "0226654" + inum;
      }

  else if (1100 <= inum && inum <= 1299) {
      this.dialNumber = "0226752" + inum;
      }
  else if (1300 <= inum && inum <= 1499) {
      this.dialNumber = "0226615" + inum;
      }
  else if (1500 <= inum && inum <= 1679) {
      this.dialNumber = "0226658" + inum;
      }
  else if (1680 <= inum && inum <= 1999) {
      this.dialNumber = "0226615" + inum;
      }
  else if (2000 <= inum && inum <= 3499) {
      this.dialNumber = "0226636" + inum;
      }
  else if (3500 <= inum && inum <= 4999) {
      this.dialNumber = "0226639" + inum;
      }
  else if (5000 <= inum && inum <= 5999) {
      this.dialNumber = "0226659" + inum;
      }
  else if (6000 <= inum && inum <= 6399) {
      this.dialNumber = "0226749" + inum;
      }
  else if (6400 <= inum && inum <= 6999) {
      this.dialNumber = "0226743" + inum;
      }
  else if (7000 <= inum && inum <= 7099) {
      this.dialNumber = "0226615" + inum;
      }
  else if (7100 <= inum && inum <= 7999) {
      this.dialNumber = "0226743" + inum;
      }
  else if (8000 <= inum && inum <= 8099) {
      this.dialNumber = "0226615" + inum;
      }
  else if (8100 <= inum && inum <= 8499) {
      this.dialNumber = "0226743" + inum;
      }
  else if (8500 <= inum && inum <= 8999) {
      this.dialNumber = "0226651" + inum;
      }
  else if (9000 <= inum && inum <= 9099) {
      this.dialNumber = "0226615" + inum;
      }
  else if (9100 <= inum && inum <= 9199) {
      this.dialNumber = "0226743" + inum;
      }
  else if (9200 <= inum && inum <= 9999) {
      this.dialNumber = "0226610" + inum;
  }
    
		
		this.callEnable = true;
		//console.log(this.dialNumber)
  
  }
  clearInput() {
      this.speedNumber = this.speedNumber.substring(0,this.speedNumber.length - 1);
	 // this.speedNumber = '';
      if (this.speedNumber.length != 0) {
          this.intNumber = parseInt(this.speedNumber, 10);
      }
      else {
          this.intNumber = '';
      }
	  this.callEnable = false;
  }

  callIT()      
  {
      if (!this.platform.is('cordova')) {
          window.open("tel:" + this.dialNumber);
          //console.log(this.dialNumber);

      }
      else {
          CallNumber.callNumber(this.dialNumber, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
      }
    }
}
