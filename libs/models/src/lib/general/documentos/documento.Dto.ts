import {IDocumento} from './documento.interface';
import {Field, ID, InputType, Int, ObjectType, OmitType, PickType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {Document} from 'mongoose';

@ObjectType('DocumentoType')
@InputType('DocumentoInput')
@Schema({collection: 'Documentos'})
export class DocumentoDto implements IDocumento
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;
    @Field(() => Int)
    @Prop()
    @IsOptional()
    noSeguimiento: number;
    @Field({nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
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
    @IsOptional()
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
    @Field(() => Int, {nullable: true})
    @Prop()
    fechaLimiteEntrega: number;
    @Field(() => Int, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la fecha de recepcion'})
    fechaRecepcion: number;
    @Field(() => Int, {nullable: true, defaultValue: null})
    @Prop()
    fechaTerminado: number;
    @Field({nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
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
    @IsOptional()
    ref: string[];
    @Field({nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el tipo del documento'})
    tipoDoc: string;
    @Field({nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    usuarioFolio: string;
    @Field(() => [String], {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario colocar por lo menos un usuario'})
    usuarios: string[];
}

export type DocumentoType = DocumentoDto & Document;
export const SCHEMA_DOCUMENTOS = SchemaFactory.createForClass(DocumentoDto);

@InputType('DocsUsuarioProcesoInput')
export class DocsUsuarioProcesoDto extends PickType(DocumentoDto, ['ano', 'enviadoPor'], InputType)
{
}

@InputType('DocumentoRegInput')
export class DocumentoRegDto extends OmitType(DocumentoDto, ['_id', 'acuseUrl', 'fechaTerminado', 'ref', 'folio', 'noSeguimiento'], InputType)
{
}
