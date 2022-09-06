import {IDocumentos} from './documentos.interface';
import {Field, ID, InputType, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema} from '@nestjs/mongoose';
import {IsNotEmpty} from 'class-validator';

@ObjectType('DocumentosType')
@InputType('DocumentosInput')
@Schema({collection: 'Documentos'})
export class DocumentosDto implements IDocumentos
{
    @Field(() => ID, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El id es necesario'})
    _id: string;
    @Field({nullable: true, defaultValue: null})
    @Prop()
    acuseUrl: string;
    @Field(() => Int, {nullable: true})
    @Prop()
    ano: number;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El asunto es necesario'})
    asunto: string;
    @Field({nullable: true})
    @Prop()
    comentario: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La dependencia es necesaria'})
    dependencia: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario subir el documentos'})
    docUrl: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el usuario que envia el documento'})
    enviadoPor: string;
    @Field({nullable: true, defaultValue: false})
    @Prop()
    @IsNotEmpty({message: 'Es necesario si es requerido'})
    esInterno: boolean;
    @Field({nullable: true})
    @Prop()
    fechaLimiteEntrega: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la fecha de recepcion'})
    fechaRecepcion: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El asunto la fecha de terminado'})
    fechaTerminado: string;
    @Field({nullable: true, defaultValue: true})
    @Prop()
    folio: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El identificador es necesario'})
    identificadorDoc: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El proceso es necesario'})
    proceso: 'pendiente' | 'terminado';
    @Field(() => [String], {nullable: true})
    @Prop()
    ref: string[];
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el tipo del documento'})
    tipoDoc: string;
    @Field({nullable: true, defaultValue: null})
    @Prop()
    usuarioFolio: string;

}
