import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseFullscreenModule } from '@s-fuse/components/fullscreen';
import { FuseLoadingBarModule } from '@s-fuse/components/loading-bar';
import { FuseNavigationModule } from '@s-fuse/components/navigation';
import { LanguagesModule } from '@s-app/layout/common/languages/languages.module';
import { MessagesModule } from '@s-app/layout/common/messages/messages.module';
import { NotificationsModule } from '@s-app/layout/common/notifications/notifications.module';
import { SearchModule } from '@s-app/layout/common/search/search.module';
import { ShortcutsModule } from '@s-app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from '@s-app/layout/common/user/user.module';
import { SharedModule } from '@s-shared/shared.module';
import { CenteredLayoutComponent } from '@s-app/layout/layouts/horizontal/centered/centered.component';

@NgModule({
    declarations: [
        CenteredLayoutComponent
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
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        CenteredLayoutComponent
    ]
})
export class CenteredLayoutModule
{
}