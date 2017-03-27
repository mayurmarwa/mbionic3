var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MarketPage } from '../market/market';
import { PricesPage } from '../prices/prices';
import { EnquiriesPage } from '../enquiries/enquiries';
import { SpeedDialPage } from '../speed-dial/speed-dial';
import { MetalCalculatorPage } from '../metal-calculator/metal-calculator';
var TabsPage = (function () {
    function TabsPage() {
        //this.tab1Root = TabChatsPage;
        //this.tab2Root = TabContactsPage;
        //this.tab3Root = TabProfilePage;
        this.tab1Root = MarketPage;
        this.tab2Root = PricesPage;
        this.tab3Root = SpeedDialPage;
        this.tab4Root = EnquiriesPage;
        this.tab5Root = MetalCalculatorPage;
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        selector: 'page-tabs',
        templateUrl: 'tabs.html'
    }),
    __metadata("design:paramtypes", [])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map