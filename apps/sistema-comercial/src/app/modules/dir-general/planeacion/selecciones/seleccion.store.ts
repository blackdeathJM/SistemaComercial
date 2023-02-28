import {StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {SeleccionType} from '#/libs/models/src/lib/dir-general/planeacion/selecciones/seleccion.dto';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';

@StateRepository()
@State<SeleccionType>({name: 'seleccion', defaults: null})
@Injectable()
export class SeleccionStore extends NgxsDataRepository<SeleccionType>
{
}
