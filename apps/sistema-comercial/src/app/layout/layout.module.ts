import { NgModule } from '@angular/core';
import { SharedModule } from '@s-shared/shared.module';
import {EmptyLayoutModule} from '@s-layout/empty.module';
import {CenteredLayoutModule} from '@s-layout/centered/centered.module';
import {MaterialLayoutModule} from '@s-layout/material/material.module';
import {EnterpriseLayoutModule} from '@s-layout/enterprise/enterprise.module';
import {ModernLayoutModule} from '@s-layout/modern/modern.module';
import {ClassicLayoutModule} from '@s-layout/classic/classic.module';
import {CompactLayoutModule} from '@s-layout/compact/compact.module';
import {ClassyLayoutModule} from '@s-layout/classy/classy.module';
import {FuturisticLayoutModule} from '@s-layout/futuristic/futuristic.module';
import {DenseLayoutModule} from '@s-layout/dense/dense.module';
import {ThinLayoutModule} from '@s-layout/thin/thin.module';
import {LayoutComponent} from '@s-layout/layout.component';
import {SettingsModule} from '@s-layout/settings/settings.module';

const layoutModules = [
    // Empty
    EmptyLayoutModule,

    // Horizontal navigation
    CenteredLayoutModule,
    EnterpriseLayoutModule,
    MaterialLayoutModule,
    ModernLayoutModule,

    // Vertical navigation
    ClassicLayoutModule,
    ClassyLayoutModule,
    CompactLayoutModule,
    DenseLayoutModule,
    FuturisticLayoutModule,
    ThinLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        SettingsModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
