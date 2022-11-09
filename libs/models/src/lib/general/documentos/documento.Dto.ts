import {IDocFolio, IDocumento, TDocSubir, TDocumentoReg} from './documento.interface';
import {Field, ID, InputType, Int, ObjectType, OmitType, PickType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
import {Document} from 'mongoose';

@ObjectType('DocumentoType')
@InputType('DocumentoInput')
@Schema({collection: 'Documentos'})
export class DocumentoDto implements IDocumento
{
    @Field(() => ID, {nullable: true})
    @IsOptional()
    _id: string;
    @Field(() => String, {defaultValue: null})
    @Prop()
    @IsOptional()
    seguimiento: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    acuseUrl: string;
    @Field(() => Int, {nullable: true})
    @Prop()
    @IsNumber({allowNaN: false}, {message: 'El ano debe ser numerico'})
    @IsNotEmpty({message: 'El año no puede estar vacio'})
    ano: number;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El asunto es necesario'})
    asunto: string;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsOptional()
    comentario: string;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'La dependencia es necesaria'})
    dependencia: string;
    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    docUrl: string;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el usuario que envia el documento'})
    enviadoPor: string;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @Prop()
    @IsBoolean({message: 'Solo se admite un valor booleano'})
    @IsNotEmpty({message: 'Es necesario si es requerido'})
    esInterno: boolean;
    @Field(() => Int, {nullable: true})
    @Prop()
    @IsInt({message: 'La fecha debe estar en formato unix'})
    fechaLimiteEntrega: number;
    @Field(() => Int, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesaria la fecha de recepcion'})
    @IsInt({message: 'La fecha debe estar en formato unix'})
    fechaRecepcion: number;
    @Field(() => Int, {nullable: true, defaultValue: 0})
    @Prop()
    @IsInt({message: 'La fecha debe estar en formato unix'})
    fechaTerminado: number;
    @Field(() => String, {nullable: true, defaultValue: null})
    @Prop()
    @IsOptional()
    folio: string;
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'El identificador es necesario'})
    identificadorDoc: string;
    @Field(() => String, {nullable: true, defaultValue: 'pendiente'})
    @Prop()
    @IsOptional()
    proceso: 'pendiente' | 'terminado';
    @Field(() => [String], {nullable: true, defaultValue: []})
    @Prop()
    @IsOptional()
    ref: string[];
    @Field(() => String, {nullable: true})
    @Prop()
    @IsNotEmpty({message: 'Es necesario el tipo del documento'})
    tipoDoc: string;
    @Field(() => String, {nullable: true, defaultValue: null})
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

@InputType('DocRegInput')
export class DocRegDto extends OmitType(DocumentoDto, ['_id', 'ref'], InputType) implements TDocumentoReg
{
}

@InputType('DocsSubirInput')
export class DocsSubirDto extends PickType(DocumentoDto, ['_id', 'docUrl', 'acuseUrl'], InputType) implements TDocSubir
{
}

@InputType('DocFolioInput')
export class DocFolioDto extends PickType(DocumentoDto, ['tipoDoc'], InputType) implements IDocFolio
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'el id del departamento es necesario'})
    deptoId: string;
}
