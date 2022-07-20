import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { ChatMockApi } from 'app/mock-api/apps/chat/api';
import { IconsMockApi } from 'app/mock-api/ui/icons/api';
import { MessagesMockApi } from 'app/mock-api/common/messages/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { SearchMockApi } from 'app/mock-api/common/search/api';
import { ShortcutsMockApi } from 'app/mock-api/common/shortcuts/api';
import { UserMockApi } from 'app/mock-api/common/user/api';

export const mockApiServices = [
    AuthMockApi,
    ChatMockApi,
    IconsMockApi,
    MessagesMockApi,
    NavigationMockApi,
    NotificationsMockApi,
    SearchMockApi,
    ShortcutsMockApi,
    UserMockApi
];
