import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {makeVar, SingleExecutionResult, useReactiveVar} from '@apollo/client';
import {PbrsGQL, RegPbrGQL, RegPbrMutation} from '#/libs/datos/src';
import {TPbrs, TRegPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr-consultas.dto';
import {EntityPbr} from '@s-dir-general/pbr/store/pbr.entity';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {IResPbrEmpleado} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';

export const loaderPbrs = 'loaderPbrs';

@Injectable()
export class PbrService
{
    constructor(private regPbrGQL: RegPbrGQL, private pbrsGQL: PbrsGQL, private entityPbr: EntityPbr, private ngxLoader: NgxUiLoaderService)
    {
    }

    regPbr(input: TRegPbr): Observable<SingleExecutionResult<RegPbrMutation>>
    {
        return this.regPbrGQL.mutate({input}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const pbr = $cast<IResPbrEmpleado>(res.data.regPbr);
                this.entityPbr.addOne(pbr);
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
                const pbrs = $cast<IResPbrEmpleado[]>(res.data.pbrs);
                this.entityPbr.setAll(pbrs);
            }
        }));
    }
}
