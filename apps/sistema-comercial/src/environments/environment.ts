// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'siadorg',
    appId: '1:1062285849940:web:2800aa4b78720165b944c1',
    storageBucket: 'siadorg.appspot.com',
    locationId: 'us-west2',
    apiKey: 'AIzaSyDdTNg32B7Uo4rtfZTYwBrCDTiDYMrZ3dE',
    authDomain: 'siadorg.firebaseapp.com',
    messagingSenderId: '1062285849940',
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
