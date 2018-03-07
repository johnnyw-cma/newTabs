import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as rp from 'request-promise';
//import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as cheerio from 'cheerio';

@Component({
  selector: 'page-readings',
  templateUrl: 'readings.html'
})
export class ReadingsPage {
	readingsHtmlContent: any;
	public readings_url: string;

	constructor(public navCtrl: NavController,
							private platform: Platform) {

  	this.readings_url = 'https://crystalmeth.org/cma-meetings/start-a-meeting/meeting-readings/category/3-cma-readings.html';
  	//var target = "_system";
    //var options = "location=yes,toolbar=yes";
		//const browser = iab.create(readings_url, target, options);
		
		function gettHtmlContent(uri) {
			var options = {
					method: 'GET',
					uri: uri,
			};
			return rp(options)
					.then(function (resp) {
							const $ = cheerio.load(resp);
							var htmlString = $('body').html();
							return htmlString;
					})
					.catch(function (err) {
							return err;
					});
		}

		platform.ready().then(() => {
			this.readingsHtmlContent = gettHtmlContent(this.readings_url);
		})
	}
}
