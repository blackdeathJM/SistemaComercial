// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

export const environment = {
    firebase: {
        apiKey: 'AIzaSyC-GcLYtf9lA0ySlxYiuQUWZi782ifM2Nc',
        authDomain: 'siscomapx-dev.firebaseapp.com',
        projectId: 'siscomapx-dev',
        storageBucket: 'siscomapx-dev.appspot.com',
        messagingSenderId: '496873279991',
        appId: '1:496873279991:web:29b95e3951321f60eadef2'
    },
    production: false,
    apiGraphql: 'http://localhost:3333/graphql',
    wsGraphql: 'ws://localhost:3333/graphql',
    // plugins: [NgxsLoggerPluginModule.forRoot(), NgxsReduxDevtoolsPluginModule.forRoot()]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should lbe commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
