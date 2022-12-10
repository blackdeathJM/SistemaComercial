import {INotificacion} from './notificacion.interface';
import {Field, ID, InputType, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsBoolean, IsMongoId, IsNotEmpty, IsOptional} from 'class-validator';
import {DateTime} from 'luxon';
import {Document} from 'mongoose';

@ObjectType('NotificacionType')
@InputType('NotificacionInput')
@Schema({collection: 'Notificaciones'})
export class NotificacionDto implements INotificacion
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La descripcion de la notificacion es necesaria'})
    descripcion: string;
    @Field(() => String, {nullable: true, defaultValue: 'heroicons_outline:speakerphone'})
    @Prop()
    @IsOptional()
    icono: string;
    @Field(() => ID, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el id del usuario'})
    idUsuario: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    imagen: string;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @Prop()
    @IsBoolean({message: 'El valor debe ser boleano'})
    leido: boolean;
    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    link: string;
    @Field(() => Int, {nullable: true, defaultValue: DateTime.utc({locale: 'es-MX'}).toUnixInteger()})
    @Prop()
    @IsOptional()
    tiempo: number;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar un titulo a la notificacion'})
    titulo: string;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @Prop()
    @IsOptional()
    usarRouter: boolean;
}

export type NotificacionType = NotificacionDto & Document;
export const SCHEMA_NOTIFICACION = SchemaFactory.createForClass(NotificacionDto);
