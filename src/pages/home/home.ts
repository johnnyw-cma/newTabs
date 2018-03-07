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
	public start_up: any;
	public store_new_date: any;

  constructor(public plt: Platform,
  				private moment: MomentModule,
  				private storage: Storage,
  				public navCtrl: NavController) {
  	this.clean_date = null;

  	this.start_up = function(){
  		console.log('starting up...');
		this.storage.get('clean_date').then(data =>{
			console.log('Retrieved... ' +data);
			this.clean_date = data;
		});
  	}

  	this.store_new_date = function(){
  		this.storage.set('clean_date', this.clean_date).then(data =>{
  			console.log("Storing new date... " +data);
  		});
  	}

  	this.plt.ready().then((readySource) =>{
  		console.log('Platform Ready...', readySource);
  		this.start_up();
  	})
  }

}
