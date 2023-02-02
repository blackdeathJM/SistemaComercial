import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ArgsType, Field, ID, InputType, ObjectType, OmitType, PickType} from '@nestjs/graphql';
import {IsBoolean, IsNotEmpty, IsOptional} from 'class-validator';
import {GraphQLJSONObject} from 'graphql-scalars';
import {IActRoles, IRoles, TCrearRol, TRolesAsig} from './roles.interface';

@InputType('RolesInput')
@ObjectType('RolesType')
@Schema({collection: 'Roles'})
export class RolesDto implements IRoles
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;
    @Field(() => ID, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El id del empleado es necesario'})
    idEmpleado: string;
    @Field(() => [GraphQLJSONObject], {nullable: true, defaultValue: []})
    @Prop()
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

@InputType('ActRolesInput')
export class ActRolesDto extends PickType(RolesDto, ['_id'], InputType) implements IActRoles
{
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El id Grupo de rutas'})
    idRutaPrincipal: string;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El id del expandible'})
    idRutaSecundaria: string;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El id de la ruta'})
    idRutaTreciaria: string;
    @Field(() => Boolean, {nullable: true})
    @IsBoolean({message: 'El valor debe ser boleano'})
    @IsNotEmpty({message: 'El valor no puede estar vacio'})
    acceso: boolean;
}
