import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {MessagesService} from '@s-layout/messages/messages.service';
import {NavigationService} from '@s-core/navigation/navigation.service';
import {QuickChatService} from '@s-layout/quick-chat/quick-chat.service';
import {ShortcutsService} from '@s-layout/shortcuts/shortcuts.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    constructor(private _messagesService: MessagesService, private _navigationService: NavigationService,
                private _quickChatService: QuickChatService, private _shortcutsService: ShortcutsService)
    {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return forkJoin([
            this._navigationService.get(),
            this._messagesService.getAll(),
            this._quickChatService.getChats(),
            this._shortcutsService.getAll(),
        ]);
    }
}
