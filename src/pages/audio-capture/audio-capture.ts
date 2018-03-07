import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, Platform} from 'ionic-angular';
import {Media, MediaObject } from '@ionic-native/media';
import {File} from '@ionic-native/file';
import {Observable} from 'rxjs/Rx';
import {MomentModule} from 'angular2-moment';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-audio-capture',
  templateUrl: 'audio-capture.html',
  providers: []
})
export class AudioPage {

  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

  @ViewChild('myaudio')
  recording: boolean = false;
  playing: boolean = false;
  subscription: any;
  recordingDuration: any;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(public navCtrl: NavController,
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
  }

  stopPlayback(){
    this.audio.stop();
    this.playing = false;
  }
}
