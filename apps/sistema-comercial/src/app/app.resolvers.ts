import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {MessagesService} from '@s-layout/messages/messages.service';
import {NavigationService} from '@s-core/navigation/navigation.service';
import {NotificationsService} from '@s-layout/notifications/notifications.service';
import {QuickChatService} from '@s-layout/quick-chat/quick-chat.service';
import {ShortcutsService} from '@s-layout/shortcuts/shortcuts.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    constructor(private _messagesService: MessagesService, private _navigationService: NavigationService, private _notificationsService: NotificationsService,
                private _quickChatService: QuickChatService, private _shortcutsService: ShortcutsService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        console.log('Resolve en appResolve');
        return forkJoin([
            // this.deptosGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(tap(res => STATE_DEPTOS(res.data.deptos as IDepto[]))),
            this._navigationService.get(),
            this._messagesService.getAll(),
            this._notificationsService.getAll(),
            this._quickChatService.getChats(),
            this._shortcutsService.getAll(),
        ]);
    }
}
