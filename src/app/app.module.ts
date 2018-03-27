import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import * as rp from 'request-promise';
import { Cheerio } from 'cheerio';
import { Firebase } from '@ionic-native/firebase';
import { HaversineService } from "ng2-haversine";
import { Parser } from 'xml2js';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';


import { AboutPage } from '../pages/about/about';
import { AudioPage } from '../pages/audio-capture/audio-capture';
import { ContactPage } from '../pages/contact/contact';
import { ReadingsPage } from '../pages/external/readings';
import { MeetingsPage } from '../pages/meetings/meetings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MomentModule } from 'angular2-moment'; 
import moment from 'moment';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    ReadingsPage,
    MeetingsPage,
    AudioPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    MomentModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ReadingsPage,
    AudioPage,
    MeetingsPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Media,
    Firebase,
    HaversineService,
    Geolocation,
    GoogleMaps,
    File,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
