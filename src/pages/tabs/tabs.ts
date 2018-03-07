import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { AudioPage } from '../audio-capture/audio-capture';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ReadingsPage } from '../external/readings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ReadingsPage;
  tab5Root = AudioPage;

  constructor() {

  }
}
