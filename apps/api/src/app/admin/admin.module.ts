import {Module} from '@nestjs/common';
import {AuthModule} from '@api-admin/auth.module';

@Module({
    imports:
        [
            AuthModule
        ]
})
export class AdminModule
{
}
