import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FuseHorizontalNavigationBasicItemComponent} from '@s-fuse/navigation/horizontal/components/basic/basic.component';
import {FuseHorizontalNavigationBranchItemComponent} from '@s-fuse/navigation/horizontal/components/branch/branch.component';
import {FuseHorizontalNavigationDividerItemComponent} from '@s-fuse/navigation/horizontal/components/divider/divider.component';
import {FuseHorizontalNavigationSpacerItemComponent} from '@s-fuse/navigation/horizontal/components/spacer/spacer.component';
import {FuseHorizontalNavigationComponent} from '@s-fuse/navigation/horizontal/horizontal.component';
import {FuseVerticalNavigationAsideItemComponent} from '@s-fuse/navigation/vertical/components/aside/aside.component';
import {FuseVerticalNavigationBasicItemComponent} from '@s-fuse/navigation/vertical/components/basic/basic.component';
import {FuseVerticalNavigationCollapsableItemComponent} from '@s-fuse/navigation/vertical/components/collapsable/collapsable.component';
import {FuseVerticalNavigationDividerItemComponent} from '@s-fuse/navigation/vertical/components/divider/divider.component';
import {FuseVerticalNavigationGroupItemComponent} from '@s-fuse/navigation/vertical/components/group/group.component';
import {FuseVerticalNavigationSpacerItemComponent} from '@s-fuse/navigation/vertical/components/spacer/spacer.component';
import {FuseVerticalNavigationComponent} from '@s-fuse/navigation/vertical/vertical.component';
import {FuseScrollbarModule} from '@s-fuse/scrollbar';

@NgModule({
    declarations: [
        FuseHorizontalNavigationBasicItemComponent,
        FuseHorizontalNavigationBranchItemComponent,
        FuseHorizontalNavigationDividerItemComponent,
        FuseHorizontalNavigationSpacerItemComponent,
        FuseHorizontalNavigationComponent,
        FuseVerticalNavigationAsideItemComponent,
        FuseVerticalNavigationBasicItemComponent,
        FuseVerticalNavigationCollapsableItemComponent,
        FuseVerticalNavigationDividerItemComponent,
        FuseVerticalNavigationGroupItemComponent,
        FuseVerticalNavigationSpacerItemComponent,
        FuseVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        FuseScrollbarModule
    ],
    exports     : [
        FuseHorizontalNavigationComponent,
        FuseVerticalNavigationComponent
    ]
})
export class FuseNavigationModule
{
}
