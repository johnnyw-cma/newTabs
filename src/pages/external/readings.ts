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

		//this.readings_url = "https://crystalmeth.org/cma-meetings/start-a-meeting/meeting-readings/category/3-cma-readings.html";
		this.readings_url = "https://docs.google.com/document/d/e/2PACX-1vSdOCikEDnaSelvL69ocDhtShghd-UjutaGiXfw3WRByOJtAKGkbzbDFPvA5FcqJbrXV4MqzQ3s_c6n/pub?embedded=true";
		
		platform.ready().then(() => {
			this.gettHtmlContent(this.readings_url).then(resp => {
				this.readingsHtmlContent = resp;
				this.readingsHtmlContent = this.readingsHtmlContent.replace('{','')
				this.readingsHtmlContent = this.readingsHtmlContent.replace('}','')
				console.log(this.readingsHtmlContent)
			})
		})
	}

	gettHtmlContent(uri) {
		var options = {
			method: 'GET', 
			simple: false,
			headers: {
				"Content-Type": "text/plain"
			},
			uri: uri,
		};
		return rp(options)
			.then(function (resp) {
				const $ = cheerio.load(resp);
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
