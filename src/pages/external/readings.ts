import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as rp from 'request-promise';
import * as cheerio from 'cheerio'

@Component({
	selector: 'page-readings',
	templateUrl: 'readings.html'
})
export class ReadingsPage {
	public start_up: any;
	public readings_url: string;
	public readingsHtmlContent =''

	constructor(
		public navCtrl: NavController,
		private platform: Platform) {

		this.readings_url = "https://crystalmeth.org/cma-meetings/start-a-meeting/meeting-readings/category/3-cma-readings.html";
		
		platform.ready().then(() => {
			let resp = this.gettHtmlContent(this.readings_url);
			console.log(JSON.stringify(resp));
		})
	}

	gettHtmlContent(uri) {
		var options = {
			method: 'GET',
			simple: true,
			headers: {
				'User-Agent': 'CMA App',
				'Origin': null,
				'Referer': 'http://crystalmeth.org',
				'Accept': 'text/json'
			},
			uri: uri,
		};
		return rp(options)
			.then(function (resp) {
				const $ = this.cheerio.load(resp);
				var htmlString = $('body').html();
				return htmlString;
			})
			.catch(function (err) {
				console.log('ERROR: ');
				console.log(JSON.stringify(err));
				return err;
			});
	}
}
