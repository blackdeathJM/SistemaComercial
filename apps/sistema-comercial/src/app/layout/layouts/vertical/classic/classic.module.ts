import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@s-shared/shared.module';
import {ClassicLayoutComponent} from '@s-layout/classic/classic.component';
import {FuseFullscreenModule} from '@s-fuse/fullscreen';
import {FuseNavigationModule} from '@s-fuse/navigation';
import {FuseLoadingBarModule} from '@s-fuse/loading-bar';
import {MessagesModule} from '@s-layout/messages/messages.module';
import {LanguagesModule} from '@s-layout/languages/languages.module';
import {NotificationsModule} from '@s-layout/notifications/notifications.module';
import {QuickChatModule} from '@s-layout/quick-chat/quick-chat.module';
import {SearchModule} from '@s-layout/search/search.module';
import {ShortcutsModule} from '@s-layout/shortcuts/shortcuts.module';
import {UserModule} from '@s-layout/user/user.module';

@NgModule({
    declarations: [
        ClassicLayoutComponent
    ],
    imports     : [
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
        QuickChatModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        ClassicLayoutComponent
    ]
})
export class ClassicLayoutModule
{
}
