import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {PbrsGQL, RegPbrGQL, RegPbrMutation} from '#/libs/datos/src';
import {TPbrs, TRegPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr-consultas.dto';
import {IResPbrEmpleado} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PbrStore} from '@s-dir-general/pbr/store/pbr.store';

export const loaderPbrs = 'loaderPbrs';

@Injectable()
export class PbrService
{
    constructor(private regPbrGQL: RegPbrGQL, private pbrsGQL: PbrsGQL, private pbrStore: PbrStore, private ngxLoader: NgxUiLoaderService)
    {
    }

    regPbr(input: TRegPbr): Observable<SingleExecutionResult<RegPbrMutation>>
    {
        return this.regPbrGQL.mutate({input}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const pbr = res.data.regPbr as IResPbrEmpleado;
                // this.entityPbr.addOne(pbr);
                this.pbrStore.add(pbr);
            }
        }));
    }

    pbrs(args: TPbrs): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderPbrs);
        return this.pbrsGQL.fetch({...args}).pipe(tap((res) =>
        {
            if (res.data)
            {
                this.ngxLoader.stopLoader(loaderPbrs);
                const pbrs = res.data.pbrs as IResPbrEmpleado[];
                // this.entityPbr.setAll(pbrs);
                this.pbrStore.set(pbrs);
            }
        }));
    }
}
