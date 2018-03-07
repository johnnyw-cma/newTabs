import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public clean_date: any;
	public years: any;
	public months: any;
	public days: any;
	public hours: any;
	public minutes: any;
	public computeTime: any;
	public start_up: any;
	public store_new_date: any;

  constructor(public plt: Platform,
  				private moment: MomentModule,
  				private storage: Storage,
  				public navCtrl: NavController) {
  	this.clean_date = null;
  	this.years = null;
  	this.months = null;
  	this.days = null;
  	this.hours = null;
  	this.minutes = null;

  	this.start_up = function(){
  		console.log('starting up...');
		this.storage.get('clean_date').then(data =>{
			console.log('Retrieved... ' +data);
			this.clean_date = data;
			this.computeTime(data);
		});
  	}

  	this.store_new_date = function(){
  		this.storage.set('clean_date', this.clean_date).then(data =>{
  			console.log("Storing new date... " +data);
  		});
  		this.computeTime(this.clean_date);
  	}

  	this.computeTime = function(input_date){

  		var nowDate = new Date();
  		var stored_date = new Date(Date.parse(input_date));
  		
	    var nAge: any = nowDate.getTime() - stored_date.getTime();

	    nAge /= 1000;  // msec to seconds
	    this.seconds = FormatNumber(parseInt(nAge));
	    nAge /= 60; // seconds to minutes
	    this.minutes = FormatNumber(parseInt(nAge));
	    nAge /= 60; // minutes to hours
	    this.hours = FormatNumber(parseInt(nAge));
	    nAge /= 24; // hours to days
	    this.days = FormatNumber(parseInt(nAge));
	    nAge /= 365.25; // days to years (fraction for leap year)
	    this.years = FormatNumber(parseInt(nAge));
	    
	    let months = 0;

	    //let months = parseFloat(nowDate.getMonth() - stored_date.getMonth() + (12 * (nowDate.getFullYear() - stored_date.getFullYear())));
	    this.months = months;

	    function FormatNumber(n) {
	        //if (true)
	        //      return n;

	        if (isNaN(n)) return "-";

	        var s = n.toString();
	        var sDelimiter = ",";

	        for (var nn=0; nn < Math.floor((s.length - (1 + nn)) / 3); nn++) {
	                s = s.substring(0, s.length-(4*nn+3)) + sDelimiter + s.substring(s.length-(4*nn+3));
	        }

	        return s;
		}

  	}

  	this.plt.ready().then((readySource) =>{
  		console.log('Platform Ready...', readySource);
  		this.start_up();
  	})
  }

}
