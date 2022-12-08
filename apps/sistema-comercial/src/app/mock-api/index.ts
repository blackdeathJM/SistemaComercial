// import {ChatMockApi} from '#/apps/sistema-comercial/src/app/mock-api/apps/chat/api';
import {ChatMockApi} from '../mock-api/apps/chat/api';
import {IconsMockApi} from '../mock-api/ui/icons/api';
import {MessagesMockApi} from '../mock-api/common/messages/api';
import {NavigationMockApi} from '../mock-api/common/navigation/api';
import {NotificationsMockApi} from '../mock-api/common/notifications/api';
import {SearchMockApi} from '../mock-api/common/search/api';
import {ShortcutsMockApi} from '../mock-api/common/shortcuts/api';
import {UserMockApi} from '../mock-api/common/user/api';

export const mockApiServices =
    [
        ChatMockApi,
        IconsMockApi,
        MessagesMockApi,
        NavigationMockApi,
        NotificationsMockApi,
        SearchMockApi,
        ShortcutsMockApi,
        UserMockApi
    ];
