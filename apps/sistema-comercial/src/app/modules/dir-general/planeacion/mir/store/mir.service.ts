import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {AgregarMirGQL, AgregarMirMutation, MirsActAvancesGQL, MirsActAvancesMutation, MirsPorAnoGQL, MirsPorAnoQuery, MirsPorCentroGestorGQL, MirsPorCentroGestorQuery} from '#/libs/datos/src';
import {MirType} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {EntityMir} from '@s-dir-general/mir/store/mir.entity';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {TMirsActAvances, TMirsPorAno, TMirsPorCentroGestor} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir-consultas.dto';
import {NgxUiLoaderService} from 'ngx-ui-loader';

export const loaderMirs = 'loaderMirs';

@Injectable()
export class MirService
{
    constructor(private agregarMirGQL: AgregarMirGQL, private mirsPorAnoGQL: MirsPorAnoGQL, private mirsPorCentroGestorGQL: MirsPorCentroGestorGQL, private mirsActAvancesGQL: MirsActAvancesGQL,
                private entityMir: EntityMir, private ngxToast: NgxToastService, private ngxLoader: NgxUiLoaderService)
    {
    }

    mirsPorAno(args: TMirsPorAno): Observable<SingleExecutionResult<MirsPorAnoQuery>>
    {
        this.ngxLoader.startLoader(loaderMirs);
        return this.mirsPorAnoGQL.fetch({ano: args.ano}).pipe(tap((res) =>
        {
            if (isNotNil(res))
            {
                const mirs = $cast<MirType[]>(res.data.mirsPorAno);
                this.entityMir.setAll(mirs);
            }
            this.ngxLoader.stopLoader(loaderMirs);
        }));
    }

    mirsPorCentroGestor(consulta: TMirsPorCentroGestor): Observable<SingleExecutionResult<MirsPorCentroGestorQuery>>
    {
        this.ngxLoader.startLoader(loaderMirs);
        return this.mirsPorCentroGestorGQL.fetch({...consulta}).pipe(tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                this.ngxLoader.stopLoader(loaderMirs);
                const mirs = $cast<MirType[]>(res.data.mirsPorCentroGestor);
                this.entityMir.setAll(mirs);
            }
        }));
    }

    agregarMir(input: MirType): Observable<SingleExecutionResult<AgregarMirMutation>>
    {
        return this.agregarMirGQL.mutate({input}).pipe(tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const registro = $cast<MirType>(res.data.agregarMir);
                this.entityMir.addOne(registro);
                this.ngxToast.satisfactorioToast('Se registro un nuevo elemnto con exito', 'MIR');
            }
        }));
    }

    mirsActAvances(input: TMirsActAvances): Observable<SingleExecutionResult<MirsActAvancesMutation>>
    {
        return this.mirsActAvancesGQL.mutate({input}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const {_id, ...changes} = $cast<MirType>(res.data.mirsActAvances);
                this.entityMir.updateOne({id: _id, changes});
            }
        }));
    }
}
