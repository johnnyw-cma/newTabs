import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { AudioPage } from '../audio-capture/audio-capture';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ReadingsPage } from '../external/readings';
import { MeetingsPage } from '../meetings/meetings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = MeetingsPage;
  tab4Root = ContactPage;
  tab5Root = ReadingsPage;
  tab6Root = AudioPage;

  constructor() {

  }
}
