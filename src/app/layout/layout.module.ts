import { NgModule } from '@angular/core';
import { LayoutComponent } from '@s-app/layout/layout.component';
import { EmptyLayoutModule } from '@s-app/layout/layouts/empty/empty.module';
import { CenteredLayoutModule } from '@s-app/layout/layouts/horizontal/centered/centered.module';
import { EnterpriseLayoutModule } from '@s-app/layout/layouts/horizontal/enterprise/enterprise.module';
import { MaterialLayoutModule } from '@s-app/layout/layouts/horizontal/material/material.module';
import { ModernLayoutModule } from '@s-app/layout/layouts/horizontal/modern/modern.module';
import { ClassicLayoutModule } from '@s-app/layout/layouts/vertical/classic/classic.module';
import { ClassyLayoutModule } from '@s-app/layout/layouts/vertical/classy/classy.module';
import { CompactLayoutModule } from '@s-app/layout/layouts/vertical/compact/compact.module';
import { DenseLayoutModule } from '@s-app/layout/layouts/vertical/dense/dense.module';
import { FuturisticLayoutModule } from '@s-app/layout/layouts/vertical/futuristic/futuristic.module';
import { ThinLayoutModule } from '@s-app/layout/layouts/vertical/thin/thin.module';
import { SettingsModule } from '@s-app/layout/common/settings/settings.module';
import { SharedModule } from '@s-shared/shared.module';

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
