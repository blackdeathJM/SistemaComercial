// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
      apiKey: 'AIzaSyCw4UXBEJUZzs__Lk9NlJWNvKpLvnJN4s0',
      authDomain: 'siscomapx.firebaseapp.com',
      projectId: 'siscomapx',
      storageBucket: 'siscomapx.appspot.com',
      messagingSenderId: '1030208961728',
      appId: '1:1030208961728:web:3de8997a5f17605cba0125'
  },
    production: false,
    apiUrl: 'http://localhost:3333/file',
    apiGraphql: 'http://localhost:3333/graphql',
    wsGraphql: 'ws://localhost:3333/graphql',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
