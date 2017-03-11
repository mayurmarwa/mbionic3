import { Component } from '@angular/core';

import { MarketPage } from '../market/market';
import { PricesPage } from '../prices/prices';
import { EnquiriesPage } from '../enquiries/enquiries';
import { SpeedDialPage } from '../speed-dial/speed-dial';
import { MetalCalculatorPage } from '../metal-calculator/metal-calculator';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;

  constructor() {
    //this.tab1Root = TabChatsPage;
    //this.tab2Root = TabContactsPage;
    //this.tab3Root = TabProfilePage;

      this.tab1Root = MarketPage;
      this.tab2Root = PricesPage;
      this.tab3Root = SpeedDialPage;
      this.tab4Root = EnquiriesPage;
      this.tab5Root = MetalCalculatorPage;
  }
}
