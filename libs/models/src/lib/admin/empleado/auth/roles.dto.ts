import {Schema, SchemaFactory} from '@nestjs/mongoose';
import {ArgsType, Field, ID, InputType, ObjectType, OmitType, PickType} from '@nestjs/graphql';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {GraphQLJSONObject} from 'graphql-scalars';
import {IRoles, TCrearRol, TRolesAsig} from './roles.interface';

@InputType('RolesInput')
@ObjectType('RolesType')
@Schema({collection: 'Roles'})
export class RolesDto implements IRoles
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'El id del empleado es necesario'})
    idEmpleado: string;
    @Field(() => [GraphQLJSONObject], {nullable: true, defaultValue: []})
    @IsNotEmpty({message: 'Es necesario los roles'})
    roles: object[];
}

export type RolesType = RolesDto & Document;
export const SCHEMA_ROLES = SchemaFactory.createForClass(RolesDto);

@ArgsType()
export class RolesAsigDto extends PickType(RolesDto, ['idEmpleado'], ArgsType) implements TRolesAsig
{
}

@InputType('CrearRolInput')
export class CrearRolDto extends OmitType(RolesDto, ['_id'], InputType) implements TCrearRol
{
}
