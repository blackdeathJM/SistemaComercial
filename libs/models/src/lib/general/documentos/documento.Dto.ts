import {IDocActFolio, IDocFolio, IDocsBusquedaGral, IDocsFechas, IDocsUsuarioProceso, IDocumento, TDocFinalizar, TDocReasignarUsuarios, TDocRefFolio, TDocSubir, TDocumentoReg} from './documento.interface';
import {ArgsType, Field, ID, InputType, Int, ObjectType, OmitType, PickType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsArray, IsBoolean, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';
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
    @IsArray({message: 'Los usuarios deben estar en un arreglo'})
    usuarios: string[];
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @Prop()
    @IsOptional()
    esRef: boolean;
}

export type DocumentoType = DocumentoDto & Document;
export const SCHEMA_DOCUMENTOS = SchemaFactory.createForClass(DocumentoDto);

@ArgsType()
export class DocsUsuarioProcesoDto implements IDocsUsuarioProceso
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el usuario que recibe el documento'})
    usuario: string;
    @Field(() => ID, {nullable: true, defaultValue: null})
    @IsOptional()
    enviadoPor: string;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @IsBoolean({message: 'El valor debe ser booleano'})
    esEnviadoPor: boolean;
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el proceso'})
    proceso: 'pendiente' | 'terminado';
}

@ArgsType()
export class DocsFechasDto implements IDocsFechas
{
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el usuario que recibe el documento'})
    usuario: string;
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'Es necesario enviado por'})
    enviadoPor: string;
    @Field(() => Int, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'La fecha inicial no puede estar vacia'})
    @IsInt({message: 'La fecha debe ser un entero'})
    fechaInicial: number;
    @Field(() => Int, {nullable: true, defaultValue: null})
    @IsNotEmpty({message: 'La fecha incial no puede estar vacia'})
    @IsInt({message: 'La fecha final debe ser un entero'})
    fechaFinal: number;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @IsBoolean({message: 'El Valor debe ser booleano'})
    esEnviadoPor: boolean;
}

@ArgsType()
export class DocsBusquedaGralDto implements IDocsBusquedaGral
{
    @Field(() => String, {nullable: true, defaultValue: ''})
    @IsOptional()
    consulta: string;
    @Field(() => ID, {nullable: true})
    @IsNotEmpty({message: 'Es necesario el id (enviado por)'})
    @IsMongoId({message: 'El id debe ser valido'})
    enviadoPor: string;
    @Field(() => Boolean, {nullable: true, defaultValue: false})
    @IsBoolean()
    @IsNotEmpty({message: 'Debe tener un valor verdadero o falso'})
    esEnviadoPor: boolean;
    @Field(() => ID, {nullable: true})
    @IsMongoId({message: 'El id debe ser valido'})
    @IsNotEmpty({message: 'El id del usuario no puede estar vacio'})
    usuario: string;
}

@ArgsType()
export class DocsRefDto
{
    @Field(() => ID, {nullable: true, description: 'Es el id del documento'})
    @IsNotEmpty({message: 'Es necesario el id del documento'})
    @IsMongoId({message: 'El id no corresponde a un id valido'})
    _id: string;
    @Field(() => ID, {nullable: true, description: 'Es el id del usuario donde se envia el documento pertenece al campo de usuarios[]'})
    @IsNotEmpty({message: 'Es necesario el id del usuario'})
    @IsMongoId({message: 'El id no corresponde a un id valido'})
    usuario: string;
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

@InputType('DocRefFolioInput')
export class DocRefFolioDto extends PickType(DocumentoDto, ['_id', 'ref', 'folio', 'usuarioFolio'], InputType) implements TDocRefFolio
{

}

@InputType('DocFinalizarInput')
export class DocFinalizarDto extends PickType(DocumentoDto, ['_id', 'fechaTerminado'], InputType) implements TDocFinalizar
{

}

@InputType('DocActFolioInput')
export class DocActFolioDto extends PickType(DocumentoDto, ['_id', 'usuarioFolio', 'tipoDoc'], InputType) implements IDocActFolio
{
    @Field(() => String, {nullable: true})
    @IsNotEmpty({message: 'Es requerido el id del departamento'})
    deptoId: string;
}

@InputType('DocReasignarUsuarioInput')
export class DocReasignarUsuarioDto extends PickType(DocumentoDto, ['_id', 'usuarios'], InputType) implements TDocReasignarUsuarios
{

}
