import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as firebase from 'firebase';

import { environment } from '../../environment/environment';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  readingsListItems: any;
  readingsIndex: any;
  tweaker;

  constructor(public navCtrl: NavController) {
    
    this.readingsIndex = environment.meetingReadings;
    firebase.initializeApp(environment.firebase);
    this.getSomeText();
  }

  getSomeText() {
      firebase.storage().ref().child('Are_You_a_Tweaker.pdf').getDownloadURL()
      .then(response => this.tweaker = response)
      .catch(error => console.log('error', error))
  }

}
