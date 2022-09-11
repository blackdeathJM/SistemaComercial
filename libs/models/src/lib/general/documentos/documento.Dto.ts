import {IDocumento} from './documentos.interface';
import {Field, ID, InputType, Int, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty} from 'class-validator';
import {Document} from 'mongoose';
import {IArchivo} from '../../upload/upload.interface';
// import GraphQLUpload from 'apollo-server-express';


@ObjectType('DocumentoType')
@InputType('DocumentoInput')
@Schema({collection: 'Documentos'})
export class DocumentoDto implements IDocumento
{
    @Field(() => ID, {nullable: true})
    _id: string;
    @Field({nullable: true, defaultValue: null})
    @Prop()
    acuseUrl: string;
    @Field(() => Int, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El año no puede estar vacio'})
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
    @Field(() => Int, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la fecha de recepcion'})
    fechaRecepcion: number;
    @Field({nullable: true})
    @Prop()
    fechaTerminado: string;
    @Field({nullable: true, defaultValue: null})
    @Prop()
    folio: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El identificador es necesario'})
    identificadorDoc: string;
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El proceso es necesario'})
    proceso: 'Pendiente' | 'Terminado';
    @Field(() => [String], {nullable: true, defaultValue: null})
    @Prop()
    ref: string[];
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el tipo del documento'})
    tipoDoc: string;
    @Field({nullable: true, defaultValue: null})
    @Prop()
    usuarioFolio: string;
    @Field(() => [String], {nullable: true})
    @Prop()
    usuarios: string[];
    // @Field(() => GraphQLUpload)
    // archivo?: Promise<ISubirArchivo>;
}

export type DocumentoType = DocumentoDto & Document;
export const SCHEMA_DOCUMENTOS = SchemaFactory.createForClass(DocumentoDto);
