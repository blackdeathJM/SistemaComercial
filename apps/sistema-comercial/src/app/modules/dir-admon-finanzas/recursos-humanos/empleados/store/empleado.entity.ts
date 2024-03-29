// import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
// import {State} from '@ngxs/store';
// import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
// import {Injectable} from '@angular/core';
// import {createEntityCollections} from '@angular-ru/cdk/entity';
// import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
//
// export interface IEmpleadoSelect
// {
//     empleado: IResolveEmpleado;
// }
//
// @StateRepository()
// @State({
//     name: 'empleados', defaults: {
//         ...createEntityCollections(),
//         empleado: null
//     }
// })
// @Injectable()
// export class EmpleadoEntity extends NgxsDataEntityCollectionsRepository<IResolveEmpleado, string, IEmpleadoSelect>
// {
//     public primaryKey = '_id';
//
//     @DataAction()
//     public seleccionarEmpleado(@Payload('empleadoSeleccionado') empleado: IResolveEmpleado): void
//     {
//         // const state = this.getState();
//         // const empleado = this.selectOne(_id);
//         // this.setEntitiesState({
//         //     ...state,
//         //     empleado
//         // });
//         const empleadoSeleccionado = this.selectOne(empleado._id);
//         this.ctx.patchState({empleado: empleadoSeleccionado});
//     }
// }
