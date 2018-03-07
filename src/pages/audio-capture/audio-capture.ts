<<<<<<< HEAD
import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, Platform} from 'ionic-angular';
import {Media, MediaObject } from '@ionic-native/media';
import {File} from '@ionic-native/file';
import {Observable} from 'rxjs/Rx';
import {MomentModule} from 'angular2-moment';
import * as moment from 'moment';
=======
//import { NativeAudio } from '@ionic-native/audio';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';


//import {Camera} from '@ionic-native/camera';
>>>>>>> 9d1cd40ce79220fdb0a84dbce76e42ba96d39aba

@IonicPage()
@Component({
  selector: 'page-audio-capture',
  templateUrl: 'audio-capture.html',
  providers: []
})
export class AudioPage {
  @ViewChild('myaudio')
  recording: boolean = false;
  playing: boolean = false;
  subscription: any;
  recordingDuration: any;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  logMessages: any[] = [];

  constructor(public navCtrl: NavController,
<<<<<<< HEAD
              public alertCtrl: AlertController,
              public platform: Platform,
              private file: File,
              public mm: MomentModule,
              private media: Media) {
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Name of Speaker',
      message: "Please tell us the Speaker's first name and last initial.",
      inputs: [
        {
          name: 'speaker_name',
          placeholder: 'Bill W.'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Begin recording',
          handler: data => {
            console.log('Saved clicked');
            this.startRecord(data);
          }
        }
      ]
    });
    prompt.present();
  }

  startRecord(data) {
    var speaker_name: String = data.speaker_name;
    var date = new Date();
    let date_of_talk = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    this.fileName = speaker_name.replace(/\ /g, '_').trim() + '_' + date_of_talk;

    if (this.platform.is('ios')) {
      this.fileName += '.m4a';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
    } else if (this.platform.is('android')) {
      this.fileName += '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    }
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;

    //start a timer
    this.recordingDuration = moment({hour: 0, minute: 0, seconds: 0});
    this.subscription = Observable.interval(1000).subscribe(x => {
      // the number 1000 is on miliseconds so every second is going to have an iteration of what is inside this code.
        this.recordingDuration = this.recordingDuration.add(1, 'seconds');
        console.log (this.recordingDuration);
      });
=======
    public platform: Platform,
    public file: File,
    private media: Media) {
  }

  getAudioList() {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  startRecord() {
    try {
      if (this.platform.is('ios')) {
        this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
        this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';

        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      }

      this.audio.startRecord();
      this.recording = true;
    } catch (e) {
      alert('exception playing audio:' + e)
    }
>>>>>>> 9d1cd40ce79220fdb0a84dbce76e42ba96d39aba
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.subscription.unsubscribe();
    this.recordingDuration = 0;
    this.getAudioList();
  }
<<<<<<< HEAD
  
  playAudio(file,idx) {
    //stop any current playback
    if (this.playing)
      this.stopPlayback();

    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.playing = true;
    this.audio.play();
    this.audio.setVolume(0.8);
=======

  playAudio(filePath, idx) {
    try {
      this.logMessage('playing')
      if (this.platform.is('ios')) {
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + filePath;
        this.audio = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + filePath;
        this.audio = this.media.create(this.filePath);
      }
      let duration = this.audio.getDuration();
      this.logMessage('duration:' + duration)
      //this.audio.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
      //this.audio.onSuccess.subscribe(() => console.log('Action is successful'));
      this.audio.onError.subscribe(error => alert('Error!' + error));

      this.audio.play();
      this.audio.setVolume(0.8);
    } catch (e) {
      this.logMessage('exception playing audio:' + e)
    }
  }

  logMessage(s) {
    this.logMessages.push('log:' + s)
>>>>>>> 9d1cd40ce79220fdb0a84dbce76e42ba96d39aba
  }

  stopPlayback(){
    this.audio.stop();
    this.playing = false;
  }
}
