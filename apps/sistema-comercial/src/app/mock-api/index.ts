import {ChatMockApi} from '@s-app/mock-api/apps/chat/api';
import {IconsMockApi} from '@s-app/mock-api/ui/icons/api';
import {MessagesMockApi} from '@s-app/mock-api/common/messages/api';
import {NavigationMockApi} from '@s-app/mock-api/common/navigation/api';
import {NotificationsMockApi} from '@s-app/mock-api/common/notifications/api';
import {SearchMockApi} from '@s-app/mock-api/common/search/api';
import {ShortcutsMockApi} from '@s-app/mock-api/common/shortcuts/api';
import {UserMockApi} from '@s-app/mock-api/common/user/api';

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
