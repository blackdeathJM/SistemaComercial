import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@s-shared/shared.module';
import {CenteredLayoutComponent} from '@s-layout/centered/centered.component';
import {FuseFullscreenModule} from '@s-fuse/fullscreen';
import {FuseLoadingBarModule} from '@s-fuse/loading-bar';
import {FuseNavigationModule} from '@s-fuse/navigation';
import {LanguagesModule} from '@s-layout/languages/languages.module';
import {MessagesModule} from '@s-layout/messages/messages.module';
import {NotificationsModule} from '@s-layout/notifications/notifications.module';
import {SearchModule} from '@s-layout/search/search.module';
import {ShortcutsModule} from '@s-layout/shortcuts/shortcuts.module';
import {UserModule} from '@s-layout/user/user.module';
import {NgIf} from "@angular/common";

@NgModule({
    declarations: [
        CenteredLayoutComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseFullscreenModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        LanguagesModule,
        MessagesModule,
        NotificationsModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule,
        NgIf
    ],
    exports     : [
        CenteredLayoutComponent
    ]
})
export class CenteredLayoutModule
{
}
