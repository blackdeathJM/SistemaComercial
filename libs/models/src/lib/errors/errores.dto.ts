import {IErroresApi} from './errores.interface';
import {Field, ObjectType} from '@nestjs/graphql';
import {GraphQLJSONObject} from 'graphql-scalars';

@ObjectType('ErroresType')
export class ErroresDto implements IErroresApi
{
    @Field(() => GraphQLJSONObject, {nullable: true, defaultValue: false})
    data: object[];
    @Field(() => [String], {nullable: true, defaultValue: []})
    errors: string[];
    @Field(() => Boolean, {nullable: true, defaultValue: true})
    exito: boolean;
}
