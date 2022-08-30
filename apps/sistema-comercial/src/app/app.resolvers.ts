import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {MessagesService} from '@s-app/layout/common/messages/messages.service';
import {NavigationService} from '@s-app/core/navigation/navigation.service';
import {NotificationsService} from '@s-app/layout/common/notifications/notifications.service';
import {QuickChatService} from '@s-app/layout/common/quick-chat/quick-chat.service';
import {ShortcutsService} from '@s-app/layout/common/shortcuts/shortcuts.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _messagesService: MessagesService, private _navigationService: NavigationService, private _notificationsService: NotificationsService,
                private _quickChatService: QuickChatService, private _shortcutsService: ShortcutsService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            // this.deptosGQL.watch({}, {notifyOnNetworkStatusChange: true}).valueChanges.pipe(tap(res => STATE_DEPTOS(res.data.deptos as IDepto[]))),
            this._navigationService.get(),
            this._messagesService.getAll(),
            this._notificationsService.getAll(),
            this._quickChatService.getChats(),
            this._shortcutsService.getAll(),
            // todo: aqui va el servicio de obtener la sesion del usuario como quien dice sus datos ya decodificados
        ]);
    }
}
