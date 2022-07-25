// import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
// import {State} from '@ngxs/store';
// import {Injectable} from '@angular/core';
// import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';
// import {DeptosService} from '@app/modules/admin/deptos/deptos.service';
// import {ApiService} from '@shared/services/api.service';
// import {Observable, tap} from 'rxjs';
// import {crearDepto} from '@app/modules/admin/deptos/gql/deptos';
// import { IDepto } from './models/depto.model';
//
// @StateRepository()
// @State<IDepto[]>({
//     name: 'Deptos',
//     defaults: []
// })
// @Injectable()
// export class DeptosState extends NgxsDataRepository<IDepto[]>
// {
//     constructor(private deptoService: DeptosService, private apiService: ApiService)
//     {
//         super();
//     }
//
//     @DataAction()
//     crearDepto(@Payload('Depto') depto: IDepto): Observable<IDepto[]>
//     {
//         return this.apiService.mutation(crearDepto, {input: depto}, {}, ['data']).pipe(tap((res) =>
//         {
//             console.log(res);
//         }));
//     }
//
//     // public deptos()
// }
