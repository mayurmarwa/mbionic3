import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketPage } from './market';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        MarketPage,
    ],
    imports: [
        IonicPageModule.forChild(MarketPage),
        CustomIconsModule

    ],
    exports: [
        MarketPage
    ]
})
export class MarketPageModule { }
