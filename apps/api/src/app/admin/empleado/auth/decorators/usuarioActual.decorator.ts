import {createParamDecorator, ExecutionContext, InternalServerErrorException} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';
import {IEmpleado} from "#api/libs/models/src/lib/admin/empleado/empleado.interface";

export const usuarioActualDecorator = createParamDecorator((data: any, context: ExecutionContext) =>
{
    const ctx = GqlExecutionContext.create(context);
    const empleado: IEmpleado = ctx.getContext().req.empleado;
    if (!empleado) throw new InternalServerErrorException('El usuario no se encuentra dentro de la peticion');


    return ctx.getContext().req.user;
});
