import { ENVIRONMENT_INITIALIZER, inject, NgZone } from '@angular/core';
import { akitaDevtools, DevtoolsOptions } from '@datorama/akita';

export function provideAkitaDevtools(options: Partial<DevtoolsOptions> = {}) {
    return {
        provide: ENVIRONMENT_INITIALIZER,
        multi: true,
        useFactory() {
            return () => {
                akitaDevtools(inject(NgZone), options);
            };
        },
    };
}
