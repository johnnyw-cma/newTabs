import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AudioPage } from './audio-capture';

@NgModule({
  declarations: [
    AudioPage,
  ],
  imports: [
    IonicPageModule.forChild(AudioPage),
  ],
  exports: [
    AudioPage
  ]
})
export class AudioPageModule {}
