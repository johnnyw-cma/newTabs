//import { NativeAudio } from '@ionic-native/audio';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';


//import {Camera} from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-audio-capture',
  templateUrl: 'audio-capture.html',
  providers: []
})
export class AudioPage {
  @ViewChild('myaudio')
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  logMessages: any[] = [];
  interval:any;
  duration = -1;

  constructor(public navCtrl: NavController,
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
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

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
      //this.audio.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
      //this.audio.onSuccess.subscribe(() => console.log('Action is successful'));
      this.audio.onError.subscribe(error => alert('Error!' + error));

      this.audio.play();
      this.interval = setInterval(() => {
        if(this.duration == -1) {
          this.duration = this.audio.getDuration();
          this.logMessage('duration:'+this.duration)
        } else {
          //this.audio.stop();
          //this.audio.setVolume(1.0);
          clearInterval(this.interval);
        }
     }, 10);
     //this.audio.play();
     this.audio.setVolume(1.0);

    } catch (e) {
      this.logMessage('exception playing audio:' + e)
    }
  }

  logMessage(s) {
    this.logMessages.push('log:' + s)
  }
}
