import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {SharedModule} from '@s-shared/shared.module';
import {ClassyLayoutComponent} from '@s-layout/classy/classy.component';
import {FuseFullscreenModule} from '@s-fuse/fullscreen';
import {FuseLoadingBarModule} from '@s-fuse/loading-bar';
import {LanguagesModule} from '@s-layout/languages/languages.module';
import {FuseNavigationModule} from '@s-fuse/navigation';
import {MessagesModule} from '@s-layout/messages/messages.module';
import {NotificationsModule} from '@s-layout/notifications/notifications.module';
import {QuickChatModule} from '@s-layout/quick-chat/quick-chat.module';
import {SearchModule} from '@s-layout/search/search.module';
import {ShortcutsModule} from '@s-layout/shortcuts/shortcuts.module';
import {UserModule} from '@s-layout/user/user.module';
import {ImgDefectoPipe} from "#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe";
import { DefaultValuePipeModule } from '@angular-ru/cdk/pipes';

@NgModule({
    declarations: [
        ClassyLayoutComponent
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
    QuickChatModule,
    SearchModule,
    ShortcutsModule,
    UserModule,
    SharedModule,
    ImgDefectoPipe,
    DefaultValuePipeModule
  ],
    exports: [
        ClassyLayoutComponent
    ]
})
export class ClassyLayoutModule
{
}
