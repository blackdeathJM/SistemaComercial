import {IAuth} from './auth.interface';

export interface IEmpleado
{
    _id?: string;
    avatar: string;
    nombreCompleto: string;
    calle: string;
    colonia: string;
    fechaIngreso: Date;
    fechaBaja?: Date;
    activo: boolean;
    puesto: string;
    modificadoPor: string[];
    telefono: string;
    auth?: IAuth;
    deptoId: string;
}
