import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
//import * as firebase from 'firebase';
//import { HaversineService } from "ng2-haversine";
import * as dom from 'xmldom';
import * as xpath from 'xpath';
import * as xml2js from 'xml2js';
import * as haversine from 'haversine';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

import { File } from '@ionic-native/file';

import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

import { environment } from '../../environment/environment';

@Component({
  selector: 'page-meetings',
  templateUrl: 'meetings.html'
})
export class MeetingsPage {
  meetingsXML;
  mapReady: boolean = false;
  map: GoogleMap;
  user_loc = { latitude: null,
                longitude: null}
  
  state_list: any = [];

  constructor(public navCtrl: NavController,
              private platform: Platform,
              public file: File,
              public toastCtrl: ToastController,
              private geolocation: Geolocation
              
  ) {

   
    
    //firebase.initializeApp(environment.firebase);


    platform.ready().then(() => {

      this.geolocation.getCurrentPosition().then((resp) => {
        this.user_loc.latitude  = resp.coords.latitude;
        this.user_loc.longitude = resp.coords.longitude

        //console.log(JSON.stringify(resp));
        //console.log('User Lat:'+resp.coords.latitude);
        //console.log('User Long:'+resp.coords.longitude);

     }).catch((error) => {
       console.log('Error getting location', error);
     });

      var path = file.applicationDirectory;
      var fileName = '../www/assets/entries.xml';
     
      file.readAsText(path, fileName).then(content => {
        this.meetingsXML = new DOMParser().parseFromString(content, 'text/xml'); 
      })
      .catch(function (err){
        console.log('ERROR: ');
        console.log(JSON.stringify(err));
      })
		})

  }
  
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    console.log('Starting to load map...');

    this.map = GoogleMaps.create('map', {
      camera: {
        target: {
          lat: 32.9312,
          lng: -96.8405
          //lat: this.user_loc.latitude, 
          //lng: this.user_loc.longitude
        },
        tilt: 30,
        zoom: 15,
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
      this.mapReady = true;
    });
  }

  onButtonClick() {
    if (!this.mapReady) {
      this.showToast('map is not ready yet. Please try again.');
      return;
    }
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        return this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        }).then(() => {
          // add a marker
          return this.map.addMarker({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
        })
      }).then((marker: Marker) => {
        // show the infoWindow
        marker.showInfoWindow();

        // If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showToast('clicked!');
        });
      });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

  private filterByState(state) {
    console.log("User Loc: "+ JSON.stringify(this.user_loc));

    let path_exp = "//entry[field_state='"+ state +"']";
    //let path_exp = "//entry";
    //console.log(this.meetingsXML);
    //let filtered_results = xpath.evaluate(path_exp, this.meetingsXML, null, XPathResult.STRING_TYPE, null);
    let nodes = Array.from(xpath.select(path_exp, this.meetingsXML));
    //console.log('Number of Nodes: ' +nodes.length);
    var meetings_list = [];

    for (var f=0; f<nodes.length; f++){
      var node = nodes[f] as Node;
      var xmls = new XMLSerializer().serializeToString(node);
      //console.log(xmls);
      var parser = new xml2js.Parser();
      parser.parseString(xmls, function(err, result){
        //console.log(JSON.stringify(result));
        
        meetings_list.push(result);
      });
    }

    this.state_list = this.sortByHaversine(meetings_list);
  }

  public sortByHaversine(list){
    
    for (var a in list){
      var item = list[a];

      var name       = item.entry['$'].name;
      var item_lat   = item.entry.field_latitude[0].latitude[0];
      var item_long  = item.entry.field_latitude[0].longitude[0];
      var codes      = item.entry.field_meeting_codes[0];

      var distance = haversine(this.user_loc,
         {latitude: item_lat, longitude: item_long},
        {unit: 'mile'});
      
      list[a].entry.distance = distance;
      list[a].entry.codes    = codes;
    }

    //sort list by distance
    list.sort(function(a, b){
      if (a.entry.distance < b.entry.distance)
        return -1;
      if (a.entry.distance > b.entry.distance)
        return 1;
      else
       return 0;
    })

    return list;
  }
}
