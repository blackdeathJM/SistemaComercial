import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty, IsOptional} from "class-validator";
import {GraphQLJSONObject} from "graphql-scalars";

export interface IRol
{
    _id: string;
    idEmpleado: string;
    roles: object[];
}

@InputType('RolInput')
@ObjectType('RolType')
@Schema({collection: 'Roles'})
export class RolDto implements IRol
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'El id del empleado es necesario'})
    idEmpleado: string;
    @Field(() => [GraphQLJSONObject], {nullable: true})
    @IsNotEmpty({message: 'Es necesario los roles a administrar'})
    roles: object[];
}

export type RolesType = RolDto & Document;
export const SCHEMA_ROL = SchemaFactory.createForClass(RolDto);
