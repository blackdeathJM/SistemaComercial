import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {AgregarMirGQL, AgregarMirMutation, MirsActAvancesGQL, MirsActAvancesMutation, MirsPorAnoGQL, MirsPorAnoQuery, MirsPorCentroGestorGQL, MirsPorCentroGestorQuery} from '#/libs/datos/src';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';

export const loaderMirs = 'loaderMirs';

@Injectable()
export class MirService
{
    // constructor(private agregarMirGQL: AgregarMirGQL, private mirsPorAnoGQL: MirsPorAnoGQL, private mirsPorCentroGestorGQL: MirsPorCentroGestorGQL, private mirsActAvancesGQL: MirsActAvancesGQL,
    //             private mirStore: MirStore, private ngxToast: NgxToastService, private ngxLoader: NgxUiLoaderService)
    // {
    // }
    //
    // mirsPorAno(args: TMirsPorAno): Observable<SingleExecutionResult<MirsPorAnoQuery>>
    // {
    //     this.ngxLoader.startLoader(loaderMirs);
    //     return this.mirsPorAnoGQL.fetch({ano: args.ano}).pipe(tap((res) =>
    //     {
    //         if (res)
    //         {
    //             const mirs = res.data.mirsPorAno as MirType[];
    //             // this.entityMir.setAll(mirs);
    //             this.mirStore.set(mirs);
    //         }
    //         this.ngxLoader.stopLoader(loaderMirs);
    //     }));
    // }
    //
    // mirsPorCentroGestor(consulta: TMirsPorCentroGestor): Observable<SingleExecutionResult<MirsPorCentroGestorQuery>>
    // {
    //     this.ngxLoader.startLoader(loaderMirs);
    //     return this.mirsPorCentroGestorGQL.fetch({...consulta}).pipe(tap((res) =>
    //     {
    //         if (res && res.data)
    //         {
    //             this.ngxLoader.stopLoader(loaderMirs);
    //             const mirs = res.data.mirsPorCentroGestor as MirType[];
    //             // this.entityMir.setAll(mirs);
    //             this.mirStore.set(mirs);
    //         }
    //     }));
    // }
    //
    // agregarMir(input: MirType): Observable<SingleExecutionResult<AgregarMirMutation>>
    // {
    //     return this.agregarMirGQL.mutate({input}).pipe(tap((res) =>
    //     {
    //         if (res && res.data)
    //         {
    //             const registro = res.data.agregarMir as MirType;
    //             // this.entityMir.addOne(registro);
    //             this.mirStore.add(registro);
    //             this.ngxToast.satisfactorioToast('Se registro un nuevo elemnto con exito', 'MIR');
    //         }
    //     }));
    // }
    //
    // mirsActAvances(input: TMirsActAvances): Observable<SingleExecutionResult<MirsActAvancesMutation>>
    // {
    //     return this.mirsActAvancesGQL.mutate({input}).pipe(tap((res) =>
    //     {
    //         if (res.data)
    //         {
    //             const {_id, ...changes} = res.data.mirsActAvances as MirType;
    //             // this.entityMir.updateOne({id: _id, changes});
    //             this.mirStore.update(_id, changes);
    //         }
    //     }));
    // }
}
