import {IErrores} from './errores.interface';
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType('ErroresType')
export class ErroresDto implements IErrores
{
    @Field(() => String, {nullable: true})
    error: string;
    @Field(() => Boolean, {nullable: true})
    exito: boolean;
}
