import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from '@s-environments/environment';
import {AppModule} from '#/apps/sistema-comercial/src/app/app.module';

if (environment.production)
{
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(es => console.log('==', es)).catch(err => console.log(err));
