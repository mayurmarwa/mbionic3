import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MetalCalculatorPage } from './metal-calculator';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        MetalCalculatorPage,
    ],
    imports: [
        IonicPageModule.forChild(MetalCalculatorPage),
        CustomIconsModule

    ],
    exports: [
        MetalCalculatorPage
    ]
})
export class MetalCalculatorPageModule { }
