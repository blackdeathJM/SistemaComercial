import {IAuth} from './auth.interface';

export interface IEmpleado
{
    _id?: string;
    nombreCompleto: string;
    calle: string;
    colonia: string;
    fechaIngreso: string;
    fechaBaja?: string;
    activo: boolean;
    modificadoPor: string[];
    auth: IAuth;
    deptoId: string;
}
