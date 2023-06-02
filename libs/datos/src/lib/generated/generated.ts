import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type ActInstInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  instalacion?: InputMaybe<InstalacionInput>;
};

export type ActRolesInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  acceso?: InputMaybe<Scalars['Boolean']['input']>;
  accesoCtrl?: InputMaybe<Scalars['Boolean']['input']>;
  idCtrl?: InputMaybe<Scalars['String']['input']>;
  idRutaCuarta?: InputMaybe<Scalars['String']['input']>;
  idRutaPrincipal?: InputMaybe<Scalars['String']['input']>;
  idRutaSecundaria?: InputMaybe<Scalars['String']['input']>;
  idRutaTreciaria?: InputMaybe<Scalars['String']['input']>;
  puedeAsigPermisos?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AgregarBombaInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  bomba?: InputMaybe<BombaInput>;
};

export type AgregarMotorInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  motor?: InputMaybe<MotorInput>;
};

export type AuthInput = {
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  asigPermisos?: InputMaybe<Array<Scalars['String']['input']>>;
  contrasena?: InputMaybe<Scalars['String']['input']>;
  controles?: InputMaybe<Array<Scalars['String']['input']>>;
  estatus?: InputMaybe<Scalars['String']['input']>;
  guards?: InputMaybe<Array<Scalars['String']['input']>>;
  roles?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
  usuario?: InputMaybe<Scalars['String']['input']>;
};

export type AuthType = {
  __typename?: 'AuthType';
  activo?: Maybe<Scalars['Boolean']['output']>;
  asigPermisos?: Maybe<Array<Scalars['String']['output']>>;
  contrasena?: Maybe<Scalars['String']['output']>;
  controles?: Maybe<Array<Scalars['String']['output']>>;
  estatus?: Maybe<Scalars['String']['output']>;
  guards?: Maybe<Array<Scalars['String']['output']>>;
  roles?: Maybe<Array<Scalars['JSONObject']['output']>>;
  usuario?: Maybe<Scalars['String']['output']>;
};

export type BombaInput = {
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  diametro?: InputMaybe<Scalars['Float']['input']>;
  eficiencia?: InputMaybe<Scalars['Float']['input']>;
  evidenciaInst?: InputMaybe<Array<Scalars['String']['input']>>;
  evidenciaRetiro?: InputMaybe<Array<Scalars['String']['input']>>;
  fechaInstalacion?: InputMaybe<Scalars['DateTime']['input']>;
  fechaRetiro?: InputMaybe<Scalars['DateTime']['input']>;
  lts?: InputMaybe<Scalars['Float']['input']>;
  marca?: InputMaybe<Scalars['String']['input']>;
  modelo?: InputMaybe<Scalars['String']['input']>;
  motivoRet?: InputMaybe<Scalars['String']['input']>;
  noImpulsores?: InputMaybe<Scalars['Int']['input']>;
  noSerie?: InputMaybe<Scalars['String']['input']>;
  observaciones?: InputMaybe<Scalars['String']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
};

export type BombaType = {
  __typename?: 'BombaType';
  activo?: Maybe<Scalars['Boolean']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  diametro?: Maybe<Scalars['Float']['output']>;
  eficiencia?: Maybe<Scalars['Float']['output']>;
  evidenciaInst?: Maybe<Array<Scalars['String']['output']>>;
  evidenciaRetiro?: Maybe<Array<Scalars['String']['output']>>;
  fechaInstalacion?: Maybe<Scalars['DateTime']['output']>;
  fechaRetiro?: Maybe<Scalars['DateTime']['output']>;
  lts?: Maybe<Scalars['Float']['output']>;
  marca?: Maybe<Scalars['String']['output']>;
  modelo?: Maybe<Scalars['String']['output']>;
  motivoRet?: Maybe<Scalars['String']['output']>;
  noImpulsores?: Maybe<Scalars['Int']['output']>;
  noSerie?: Maybe<Scalars['String']['output']>;
  observaciones?: Maybe<Scalars['String']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
};

export type CambioContrasenaInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  contrasena?: InputMaybe<Scalars['String']['input']>;
};

export type ComponenteInput = {
  formComun?: InputMaybe<Array<FormComunInput>>;
  formPlanta?: InputMaybe<Array<FormPlantaInput>>;
  tablaColumnas?: InputMaybe<Array<TablaInput>>;
  tipoForm?: InputMaybe<Scalars['String']['input']>;
  tipoValorAvance?: InputMaybe<Scalars['String']['input']>;
  tipoValorTrim?: InputMaybe<Scalars['String']['input']>;
  valorAdicional?: InputMaybe<Scalars['Float']['input']>;
  valorAdicionalB?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ComponenteType = {
  __typename?: 'ComponenteType';
  formComun?: Maybe<Array<FormComunType>>;
  formPlanta?: Maybe<Array<FormPlantaType>>;
  tablaColumnas?: Maybe<Array<TablaType>>;
  tipoForm?: Maybe<Scalars['String']['output']>;
  tipoValorAvance?: Maybe<Scalars['String']['output']>;
  tipoValorTrim?: Maybe<Scalars['String']['output']>;
  valorAdicional?: Maybe<Scalars['Float']['output']>;
  valorAdicionalB?: Maybe<Scalars['Boolean']['output']>;
};

export type CrearRolInput = {
  idEmpleado?: InputMaybe<Scalars['ID']['input']>;
  roles?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
};

export type DatosSesionType = {
  __typename?: 'DatosSesionType';
  _id: Scalars['ID']['output'];
  activo: Scalars['Boolean']['output'];
  auth: AuthType;
  avatar?: Maybe<Scalars['String']['output']>;
  deptoId?: Maybe<Scalars['ID']['output']>;
  nombreCompleto: Scalars['String']['output'];
};

export type DeptoInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  nombre?: InputMaybe<Scalars['String']['input']>;
  puestos?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DeptoType = {
  __typename?: 'DeptoType';
  _id?: Maybe<Scalars['ID']['output']>;
  centroGestor?: Maybe<Scalars['String']['output']>;
  nombre?: Maybe<Scalars['String']['output']>;
  puestos?: Maybe<Array<Scalars['String']['output']>>;
};

export type DocActFolioInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  deptoId?: InputMaybe<Scalars['String']['input']>;
  tipoDoc?: InputMaybe<Scalars['String']['input']>;
  usuarioFolio?: InputMaybe<Scalars['String']['input']>;
};

export type DocFolioInput = {
  deptoId?: InputMaybe<Scalars['ID']['input']>;
  tipoDoc?: InputMaybe<Scalars['String']['input']>;
};

export type DocReasignarUsuarioInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  usuarios?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocRefFolioInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  folio?: InputMaybe<Scalars['String']['input']>;
  ref?: InputMaybe<Array<Scalars['String']['input']>>;
  usuarioFolio?: InputMaybe<Scalars['String']['input']>;
};

export type DocRegInput = {
  acuseUrl?: InputMaybe<Scalars['String']['input']>;
  ano?: InputMaybe<Scalars['Int']['input']>;
  asunto?: InputMaybe<Scalars['String']['input']>;
  comentario?: InputMaybe<Scalars['String']['input']>;
  dependencia?: InputMaybe<Scalars['String']['input']>;
  docUrl?: InputMaybe<Scalars['String']['input']>;
  enviadoPor?: InputMaybe<Scalars['String']['input']>;
  esInterno?: InputMaybe<Scalars['Boolean']['input']>;
  esRef?: InputMaybe<Scalars['Boolean']['input']>;
  fechaLimiteEntrega?: InputMaybe<Scalars['Int']['input']>;
  fechaRecepcion?: InputMaybe<Scalars['Int']['input']>;
  fechaTerminado?: InputMaybe<Scalars['Int']['input']>;
  folio?: InputMaybe<Scalars['String']['input']>;
  identificadorDoc?: InputMaybe<Scalars['String']['input']>;
  proceso?: InputMaybe<Scalars['String']['input']>;
  seguimiento: Scalars['String']['input'];
  tipoDoc?: InputMaybe<Scalars['String']['input']>;
  usuarioFolio?: InputMaybe<Scalars['String']['input']>;
  usuarios?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocsSubirInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  acuseUrl?: InputMaybe<Scalars['String']['input']>;
  docUrl?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentoInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  acuseUrl?: InputMaybe<Scalars['String']['input']>;
  ano?: InputMaybe<Scalars['Int']['input']>;
  asunto?: InputMaybe<Scalars['String']['input']>;
  comentario?: InputMaybe<Scalars['String']['input']>;
  dependencia?: InputMaybe<Scalars['String']['input']>;
  docUrl?: InputMaybe<Scalars['String']['input']>;
  enviadoPor?: InputMaybe<Scalars['String']['input']>;
  esInterno?: InputMaybe<Scalars['Boolean']['input']>;
  esRef?: InputMaybe<Scalars['Boolean']['input']>;
  fechaLimiteEntrega?: InputMaybe<Scalars['Int']['input']>;
  fechaRecepcion?: InputMaybe<Scalars['Int']['input']>;
  fechaTerminado?: InputMaybe<Scalars['Int']['input']>;
  folio?: InputMaybe<Scalars['String']['input']>;
  identificadorDoc?: InputMaybe<Scalars['String']['input']>;
  proceso?: InputMaybe<Scalars['String']['input']>;
  ref?: InputMaybe<Array<Scalars['String']['input']>>;
  seguimiento: Scalars['String']['input'];
  tipoDoc?: InputMaybe<Scalars['String']['input']>;
  usuarioFolio?: InputMaybe<Scalars['String']['input']>;
  usuarios?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentoType = {
  __typename?: 'DocumentoType';
  _id?: Maybe<Scalars['ID']['output']>;
  acuseUrl?: Maybe<Scalars['String']['output']>;
  ano?: Maybe<Scalars['Int']['output']>;
  asunto?: Maybe<Scalars['String']['output']>;
  comentario?: Maybe<Scalars['String']['output']>;
  dependencia?: Maybe<Scalars['String']['output']>;
  docUrl?: Maybe<Scalars['String']['output']>;
  enviadoPor?: Maybe<Scalars['String']['output']>;
  esInterno?: Maybe<Scalars['Boolean']['output']>;
  esRef?: Maybe<Scalars['Boolean']['output']>;
  fechaLimiteEntrega?: Maybe<Scalars['Int']['output']>;
  fechaRecepcion?: Maybe<Scalars['Int']['output']>;
  fechaTerminado?: Maybe<Scalars['Int']['output']>;
  folio?: Maybe<Scalars['String']['output']>;
  identificadorDoc?: Maybe<Scalars['String']['output']>;
  proceso?: Maybe<Scalars['String']['output']>;
  ref?: Maybe<Array<Scalars['String']['output']>>;
  resolveEmpleado?: Maybe<EmpleadoType>;
  resolveEmpleadoEnviado?: Maybe<Array<EmpleadoType>>;
  resolverEmpleadoFolio?: Maybe<EmpleadoType>;
  seguimiento: Scalars['String']['output'];
  tipoDoc?: Maybe<Scalars['String']['output']>;
  usuarioFolio?: Maybe<Scalars['String']['output']>;
  usuarios?: Maybe<Array<Scalars['String']['output']>>;
};

export type EmpleadoInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  auth?: InputMaybe<AuthInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  calle?: InputMaybe<Scalars['String']['input']>;
  colonia?: InputMaybe<Scalars['String']['input']>;
  correo?: InputMaybe<Scalars['String']['input']>;
  deptoId?: InputMaybe<Scalars['ID']['input']>;
  fechaBaja?: InputMaybe<Scalars['Int']['input']>;
  fechaIngreso?: InputMaybe<Scalars['Int']['input']>;
  modificadoPor?: InputMaybe<Array<ModificadoPorInput>>;
  nombreCompleto?: InputMaybe<Scalars['String']['input']>;
  planeacionCentroGestor?: InputMaybe<Scalars['String']['input']>;
  puesto?: InputMaybe<Array<PuestoInput>>;
  telefono?: InputMaybe<Array<TelefonoInput>>;
};

export type EmpleadoType = {
  __typename?: 'EmpleadoType';
  _id?: Maybe<Scalars['ID']['output']>;
  activo?: Maybe<Scalars['Boolean']['output']>;
  auth?: Maybe<AuthType>;
  avatar?: Maybe<Scalars['String']['output']>;
  calle?: Maybe<Scalars['String']['output']>;
  colonia?: Maybe<Scalars['String']['output']>;
  correo?: Maybe<Scalars['String']['output']>;
  deptoEmpleado?: Maybe<DeptoType>;
  deptoId?: Maybe<Scalars['ID']['output']>;
  fechaBaja?: Maybe<Scalars['Int']['output']>;
  fechaIngreso?: Maybe<Scalars['Int']['output']>;
  modificadoPor?: Maybe<Array<ModificadoPorType>>;
  nombreCompleto?: Maybe<Scalars['String']['output']>;
  planeacionCentroGestor?: Maybe<Scalars['String']['output']>;
  puesto?: Maybe<Array<PuestoType>>;
  telefono?: Maybe<Array<TelefonoType>>;
};

export type ErroresType = {
  __typename?: 'ErroresType';
  error?: Maybe<Scalars['String']['output']>;
  exito?: Maybe<Scalars['Boolean']['output']>;
};

export type FormComunInput = {
  dato?: InputMaybe<Scalars['String']['input']>;
  idIndicador?: InputMaybe<Scalars['String']['input']>;
  valorAdicional?: InputMaybe<Scalars['String']['input']>;
};

export type FormComunType = {
  __typename?: 'FormComunType';
  dato?: Maybe<Scalars['String']['output']>;
  idIndicador?: Maybe<Scalars['String']['output']>;
  valorAdicional?: Maybe<Scalars['String']['output']>;
};

export type FormPlantaInput = {
  dqoE?: InputMaybe<Scalars['Float']['input']>;
  grasasAceitesE?: InputMaybe<Scalars['Float']['input']>;
  ptarE?: InputMaybe<Scalars['String']['input']>;
  sstE?: InputMaybe<Scalars['Float']['input']>;
};

export type FormPlantaType = {
  __typename?: 'FormPlantaType';
  dqoE?: Maybe<Scalars['Float']['output']>;
  grasasAceitesE?: Maybe<Scalars['Float']['output']>;
  ptarE?: Maybe<Scalars['String']['output']>;
  sstE?: Maybe<Scalars['Float']['output']>;
};

export type InstalacionInput = {
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  diamAdeme?: InputMaybe<Scalars['Float']['input']>;
  diamCol?: InputMaybe<Scalars['Float']['input']>;
  diamPerforacion?: InputMaybe<Scalars['Float']['input']>;
  direccion?: InputMaybe<Scalars['String']['input']>;
  longCol?: InputMaybe<Scalars['Float']['input']>;
  nivelDinamico?: InputMaybe<Array<MedicionInput>>;
  nivelEstatico?: InputMaybe<Array<MedicionInput>>;
  nombre?: InputMaybe<Scalars['String']['input']>;
  profPozo?: InputMaybe<Scalars['Float']['input']>;
  tipoInstalacion?: InputMaybe<Scalars['String']['input']>;
};

export type InstalacionType = {
  __typename?: 'InstalacionType';
  activo?: Maybe<Scalars['Boolean']['output']>;
  diamAdeme?: Maybe<Scalars['Float']['output']>;
  diamCol?: Maybe<Scalars['Float']['output']>;
  diamPerforacion?: Maybe<Scalars['Float']['output']>;
  direccion?: Maybe<Scalars['String']['output']>;
  longCol?: Maybe<Scalars['Float']['output']>;
  nivelDinamico?: Maybe<Array<MedicionType>>;
  nivelEstatico?: Maybe<Array<MedicionType>>;
  nombre?: Maybe<Scalars['String']['output']>;
  profPozo?: Maybe<Scalars['Float']['output']>;
  tipoInstalacion?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  contrasena?: InputMaybe<Scalars['String']['input']>;
  usuario?: InputMaybe<Scalars['String']['input']>;
};

export type LoginRespuestaType = {
  __typename?: 'LoginRespuestaType';
  datosSesion: DatosSesionType;
  token: Scalars['String']['output'];
};

export type MedicionInput = {
  abril?: InputMaybe<Scalars['Float']['input']>;
  agosto?: InputMaybe<Scalars['Float']['input']>;
  ano?: InputMaybe<Scalars['Int']['input']>;
  diciembre?: InputMaybe<Scalars['Float']['input']>;
  enero?: InputMaybe<Scalars['Float']['input']>;
  febrero?: InputMaybe<Scalars['Float']['input']>;
  julio?: InputMaybe<Scalars['Float']['input']>;
  junio?: InputMaybe<Scalars['Float']['input']>;
  marzo?: InputMaybe<Scalars['Float']['input']>;
  mayo?: InputMaybe<Scalars['Float']['input']>;
  noviembre?: InputMaybe<Scalars['Float']['input']>;
  octubre?: InputMaybe<Scalars['Float']['input']>;
  septiembre?: InputMaybe<Scalars['Float']['input']>;
};

export type MedicionType = {
  __typename?: 'MedicionType';
  abril?: Maybe<Scalars['Float']['output']>;
  agosto?: Maybe<Scalars['Float']['output']>;
  ano?: Maybe<Scalars['Int']['output']>;
  diciembre?: Maybe<Scalars['Float']['output']>;
  enero?: Maybe<Scalars['Float']['output']>;
  febrero?: Maybe<Scalars['Float']['output']>;
  julio?: Maybe<Scalars['Float']['output']>;
  junio?: Maybe<Scalars['Float']['output']>;
  marzo?: Maybe<Scalars['Float']['output']>;
  mayo?: Maybe<Scalars['Float']['output']>;
  noviembre?: Maybe<Scalars['Float']['output']>;
  octubre?: Maybe<Scalars['Float']['output']>;
  septiembre?: Maybe<Scalars['Float']['output']>;
};

export type MedidorInput = {
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  fechaInstalacion?: InputMaybe<Scalars['Date']['input']>;
  fechaRetiro?: InputMaybe<Scalars['Date']['input']>;
  medidor?: InputMaybe<Scalars['String']['input']>;
  reciboCfe?: InputMaybe<Array<RecibosInput>>;
  servicio?: InputMaybe<Scalars['String']['input']>;
};

export type MedidorType = {
  __typename?: 'MedidorType';
  activo?: Maybe<Scalars['Boolean']['output']>;
  fechaInstalacion?: Maybe<Scalars['Date']['output']>;
  fechaRetiro?: Maybe<Scalars['Date']['output']>;
  medidor?: Maybe<Scalars['String']['output']>;
  reciboCfe?: Maybe<Array<RecibosType>>;
  servicio?: Maybe<Scalars['String']['output']>;
};

export type MirCuestionarioInput = {
  avanceAnual?: InputMaybe<Scalars['Float']['input']>;
  avanceTrim1?: InputMaybe<Scalars['Float']['input']>;
  avanceTrim2?: InputMaybe<Scalars['Float']['input']>;
  avanceTrim3?: InputMaybe<Scalars['Float']['input']>;
  avanceTrim4?: InputMaybe<Scalars['Float']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  componente?: InputMaybe<ComponenteInput>;
  correo?: InputMaybe<Scalars['String']['input']>;
  definicionIndicador?: InputMaybe<Scalars['String']['input']>;
  dimension?: InputMaybe<Scalars['String']['input']>;
  frecuenciaMedicion?: InputMaybe<Scalars['String']['input']>;
  idEmpleado?: InputMaybe<Scalars['String']['input']>;
  idIndicador?: InputMaybe<Scalars['String']['input']>;
  lineaBaseAno?: InputMaybe<Scalars['String']['input']>;
  lineaBaseValor?: InputMaybe<Scalars['String']['input']>;
  mediosVerificacion?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['Float']['input']>;
  metodoCalculo?: InputMaybe<Scalars['String']['input']>;
  nivel?: InputMaybe<Scalars['String']['input']>;
  nombreDelIndicador?: InputMaybe<Scalars['String']['input']>;
  programaFinanciacion?: InputMaybe<Scalars['String']['input']>;
  responsable?: InputMaybe<Scalars['String']['input']>;
  resumenNarrativo?: InputMaybe<Scalars['String']['input']>;
  semefAmarillo?: InputMaybe<Scalars['Float']['input']>;
  semefAmarilloV?: InputMaybe<Scalars['Float']['input']>;
  semefRojo?: InputMaybe<Scalars['Float']['input']>;
  semefRojoV?: InputMaybe<Scalars['Float']['input']>;
  semefVerde?: InputMaybe<Scalars['Float']['input']>;
  semefVerdeV?: InputMaybe<Scalars['Float']['input']>;
  sentidoDelIndicador?: InputMaybe<Scalars['String']['input']>;
  supuestos?: InputMaybe<Scalars['String']['input']>;
  tipo?: InputMaybe<Scalars['String']['input']>;
  unidadDeMedida?: InputMaybe<Scalars['String']['input']>;
};

export type MirCuestionarioType = {
  __typename?: 'MirCuestionarioType';
  avanceAnual?: Maybe<Scalars['Float']['output']>;
  avanceTrim1?: Maybe<Scalars['Float']['output']>;
  avanceTrim2?: Maybe<Scalars['Float']['output']>;
  avanceTrim3?: Maybe<Scalars['Float']['output']>;
  avanceTrim4?: Maybe<Scalars['Float']['output']>;
  centroGestor?: Maybe<Scalars['String']['output']>;
  componente?: Maybe<ComponenteType>;
  correo?: Maybe<Scalars['String']['output']>;
  definicionIndicador?: Maybe<Scalars['String']['output']>;
  dimension?: Maybe<Scalars['String']['output']>;
  frecuenciaMedicion?: Maybe<Scalars['String']['output']>;
  idEmpleado?: Maybe<Scalars['String']['output']>;
  idIndicador?: Maybe<Scalars['String']['output']>;
  lineaBaseAno?: Maybe<Scalars['String']['output']>;
  lineaBaseValor?: Maybe<Scalars['String']['output']>;
  mediosVerificacion?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<Scalars['Float']['output']>;
  metodoCalculo?: Maybe<Scalars['String']['output']>;
  nivel?: Maybe<Scalars['String']['output']>;
  nombreDelIndicador?: Maybe<Scalars['String']['output']>;
  programaFinanciacion?: Maybe<Scalars['String']['output']>;
  responsable?: Maybe<Scalars['String']['output']>;
  resumenNarrativo?: Maybe<Scalars['String']['output']>;
  semefAmarillo?: Maybe<Scalars['Float']['output']>;
  semefAmarilloV?: Maybe<Scalars['Float']['output']>;
  semefRojo?: Maybe<Scalars['Float']['output']>;
  semefRojoV?: Maybe<Scalars['Float']['output']>;
  semefVerde?: Maybe<Scalars['Float']['output']>;
  semefVerdeV?: Maybe<Scalars['Float']['output']>;
  sentidoDelIndicador?: Maybe<Scalars['String']['output']>;
  supuestos?: Maybe<Scalars['String']['output']>;
  tipo?: Maybe<Scalars['String']['output']>;
  unidadDeMedida?: Maybe<Scalars['String']['output']>;
};

export type ModificadoPorInput = {
  accion?: InputMaybe<Scalars['String']['input']>;
  fecha?: InputMaybe<Scalars['Int']['input']>;
  usuario?: InputMaybe<Scalars['String']['input']>;
  valorActual?: InputMaybe<Array<Scalars['JSON']['input']>>;
  valorAnterior?: InputMaybe<Array<Scalars['JSON']['input']>>;
};

export type ModificadoPorType = {
  __typename?: 'ModificadoPorType';
  accion?: Maybe<Scalars['String']['output']>;
  fecha?: Maybe<Scalars['Int']['output']>;
  usuario?: Maybe<Scalars['String']['output']>;
  valorActual?: Maybe<Array<Scalars['JSON']['output']>>;
  valorAnterior?: Maybe<Array<Scalars['JSON']['output']>>;
};

export type MotorInput = {
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  amperaje?: InputMaybe<Scalars['Float']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  eficiencia?: InputMaybe<Scalars['Float']['input']>;
  evidenciaInst?: InputMaybe<Array<Scalars['String']['input']>>;
  evidenciaRetiro?: InputMaybe<Array<Scalars['String']['input']>>;
  factPotencia?: InputMaybe<Scalars['Float']['input']>;
  fechaInstalacion?: InputMaybe<Scalars['DateTime']['input']>;
  fechaRetiro?: InputMaybe<Scalars['DateTime']['input']>;
  hp?: InputMaybe<Scalars['Float']['input']>;
  marca?: InputMaybe<Scalars['String']['input']>;
  modelo?: InputMaybe<Scalars['String']['input']>;
  motivoRet?: InputMaybe<Scalars['String']['input']>;
  noSerie?: InputMaybe<Scalars['String']['input']>;
  observaciones?: InputMaybe<Scalars['String']['input']>;
  voltaje?: InputMaybe<Scalars['Float']['input']>;
};

export type MotorType = {
  __typename?: 'MotorType';
  activo?: Maybe<Scalars['Boolean']['output']>;
  amperaje?: Maybe<Scalars['Float']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  eficiencia?: Maybe<Scalars['Float']['output']>;
  evidenciaInst?: Maybe<Array<Scalars['String']['output']>>;
  evidenciaRetiro?: Maybe<Array<Scalars['String']['output']>>;
  factPotencia?: Maybe<Scalars['Float']['output']>;
  fechaInstalacion?: Maybe<Scalars['DateTime']['output']>;
  fechaRetiro?: Maybe<Scalars['DateTime']['output']>;
  hp?: Maybe<Scalars['Float']['output']>;
  marca?: Maybe<Scalars['String']['output']>;
  modelo?: Maybe<Scalars['String']['output']>;
  motivoRet?: Maybe<Scalars['String']['output']>;
  noSerie?: Maybe<Scalars['String']['output']>;
  observaciones?: Maybe<Scalars['String']['output']>;
  voltaje?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  actCtrlPrimerNivel: RolesType;
  actCtrlSegundoNivel: RolesType;
  actCtrlTercerNivel: RolesType;
  actInst: TelemetriaType;
  actLectura: TelemetriaType;
  actPrimerNivel: RolesType;
  actSegundoNivel: RolesType;
  actTercerNivel: RolesType;
  actualizarAvatar: LoginRespuestaType;
  actualizarContrasenaAdmin: EmpleadoType;
  actualizarDepto: DeptoType;
  actualizarResponsable: PlaneacionType;
  agregarBomba: TelemetriaType;
  agregarMotor: TelemetriaType;
  agregarPuesto: DeptoType;
  asigPermisoPrimerNivel: RolesType;
  asigPermisoSegNivel: RolesType;
  asigPermisoTercerNivel: RolesType;
  crearActEmpledo: EmpleadoType;
  crearDepto: DeptoType;
  crearRegLectura: UnionTele;
  crearRoles?: Maybe<RolesType>;
  docActFolio: DocumentoType;
  docFinalizar: DocumentoType;
  docRefFolio: Array<DocumentoType>;
  eliminarDepto: DeptoType;
  eliminarElemento: PlaneacionType;
  eliminarNot: NotificacionType;
  eliminarTodos: Scalars['Int']['output'];
  genFolioSinReg: Scalars['String']['output'];
  inicializarPlaneacion: PlaneacionType;
  login?: Maybe<LoginRespuestaType>;
  reasignarUsuario: DocumentoType;
  recalcularPbr: PlaneacionType;
  reemplazarComp: PlaneacionType;
  regAvancePbr: PlaneacionType;
  regComponente: PlaneacionType;
  regDoc: DocumentoType;
  regInstalacion: UnionTele;
  regMir: PlaneacionType;
  regPbr: PlaneacionType;
  regSeleccion: SeleccionType;
  registroSesion: EmpleadoType;
  subirDocs: DocumentoType;
  sumatoriaPbr: PlaneacionType;
  valoresDefecto: Scalars['Boolean']['output'];
};


export type MutationActCtrlPrimerNivelArgs = {
  ctrl: ActRolesInput;
};


export type MutationActCtrlSegundoNivelArgs = {
  ctrl: ActRolesInput;
};


export type MutationActCtrlTercerNivelArgs = {
  ctrl: ActRolesInput;
};


export type MutationActInstArgs = {
  args: ActInstInput;
};


export type MutationActLecturaArgs = {
  args: TomarMedicionInput;
};


export type MutationActPrimerNivelArgs = {
  role: ActRolesInput;
};


export type MutationActSegundoNivelArgs = {
  role: ActRolesInput;
};


export type MutationActTercerNivelArgs = {
  role: ActRolesInput;
};


export type MutationActualizarAvatarArgs = {
  _id: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationActualizarContrasenaAdminArgs = {
  datos: CambioContrasenaInput;
  modificadoPor: ModificadoPorInput;
};


export type MutationActualizarDeptoArgs = {
  input: DeptoInput;
};


export type MutationActualizarResponsableArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  correo?: InputMaybe<Scalars['String']['input']>;
  cuestionario?: InputMaybe<Scalars['String']['input']>;
  idEmpleado?: InputMaybe<Scalars['ID']['input']>;
  idEmpleadoAnterior?: InputMaybe<Scalars['ID']['input']>;
  responsable?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAgregarBombaArgs = {
  args: AgregarBombaInput;
};


export type MutationAgregarMotorArgs = {
  args: AgregarMotorInput;
};


export type MutationAgregarPuestoArgs = {
  puesto: PuestoDeptoInput;
};


export type MutationAsigPermisoPrimerNivelArgs = {
  asig: ActRolesInput;
};


export type MutationAsigPermisoSegNivelArgs = {
  asig: ActRolesInput;
};


export type MutationAsigPermisoTercerNivelArgs = {
  asig: ActRolesInput;
};


export type MutationCrearActEmpledoArgs = {
  empleadoDatos: RegEmpleadoInput;
};


export type MutationCrearDeptoArgs = {
  input: DeptoInput;
};


export type MutationCrearRegLecturaArgs = {
  args: TomarMedicionInput;
};


export type MutationCrearRolesArgs = {
  args: CrearRolInput;
};


export type MutationDocActFolioArgs = {
  args: DocActFolioInput;
};


export type MutationDocFinalizarArgs = {
  _id: Scalars['String']['input'];
};


export type MutationDocRefFolioArgs = {
  entradas: DocRefFolioInput;
};


export type MutationEliminarDeptoArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEliminarElementoArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  cuestionario?: InputMaybe<Scalars['String']['input']>;
  idIndicador?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEliminarNotArgs = {
  _id: Scalars['String']['input'];
};


export type MutationEliminarTodosArgs = {
  idUsuario: Scalars['String']['input'];
};


export type MutationGenFolioSinRegArgs = {
  args: DocFolioInput;
};


export type MutationInicializarPlaneacionArgs = {
  input: PlaneacionInput;
};


export type MutationLoginArgs = {
  login: LoginInput;
};


export type MutationReasignarUsuarioArgs = {
  usuarios: DocReasignarUsuarioInput;
};


export type MutationRecalcularPbrArgs = {
  args: RecalcularPbrInput;
};


export type MutationReemplazarCompArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  idIndicador?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegAvancePbrArgs = {
  datos: RegAvancesPbrInput;
};


export type MutationRegComponenteArgs = {
  datos: RegComponenteInput;
};


export type MutationRegDocArgs = {
  datos: DocRegInput;
  files?: InputMaybe<UploadInput>;
};


export type MutationRegInstalacionArgs = {
  datos: RegInstalacionInput;
};


export type MutationRegMirArgs = {
  datos: RegMirInput;
};


export type MutationRegPbrArgs = {
  datos: RegPbrInput;
};


export type MutationRegSeleccionArgs = {
  input?: InputMaybe<SeleccionInput>;
};


export type MutationRegistroSesionArgs = {
  _id: Scalars['String']['input'];
  auth: AuthInput;
  modificadoPor: ModificadoPorInput;
};


export type MutationSubirDocsArgs = {
  args?: InputMaybe<DocsSubirInput>;
  files?: InputMaybe<UploadInput>;
  filesAcuse?: InputMaybe<UploadInput>;
};


export type MutationSumatoriaPbrArgs = {
  actualizar: Scalars['Boolean']['input'];
  datos: SumPbrInput;
};

export type NotificacionInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  icono?: InputMaybe<Scalars['String']['input']>;
  idUsuario?: InputMaybe<Scalars['ID']['input']>;
  imagen?: InputMaybe<Scalars['String']['input']>;
  leido?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  tiempo?: InputMaybe<Scalars['Int']['input']>;
  titulo?: InputMaybe<Scalars['String']['input']>;
  usarRouter?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NotificacionType = {
  __typename?: 'NotificacionType';
  _id?: Maybe<Scalars['ID']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  icono?: Maybe<Scalars['String']['output']>;
  idUsuario?: Maybe<Scalars['ID']['output']>;
  imagen?: Maybe<Scalars['String']['output']>;
  leido?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  tiempo?: Maybe<Scalars['Int']['output']>;
  titulo?: Maybe<Scalars['String']['output']>;
  usarRouter?: Maybe<Scalars['Boolean']['output']>;
};

export type PbrInput = {
  abril?: InputMaybe<Scalars['Float']['input']>;
  agosto?: InputMaybe<Scalars['Float']['input']>;
  ano?: InputMaybe<Scalars['Int']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  correo?: InputMaybe<Scalars['String']['input']>;
  dato?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  diciembre?: InputMaybe<Scalars['Float']['input']>;
  enero?: InputMaybe<Scalars['Float']['input']>;
  febrero?: InputMaybe<Scalars['Float']['input']>;
  fechaCompleta?: InputMaybe<Scalars['String']['input']>;
  idEmpleado?: InputMaybe<Scalars['ID']['input']>;
  idIndicador?: InputMaybe<Scalars['String']['input']>;
  julio?: InputMaybe<Scalars['Float']['input']>;
  junio?: InputMaybe<Scalars['Float']['input']>;
  marzo?: InputMaybe<Scalars['Float']['input']>;
  mayo?: InputMaybe<Scalars['Float']['input']>;
  noviembre?: InputMaybe<Scalars['Float']['input']>;
  octubre?: InputMaybe<Scalars['Float']['input']>;
  responsable?: InputMaybe<Scalars['String']['input']>;
  septiembre?: InputMaybe<Scalars['Float']['input']>;
  tipoOperacion?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  trim1?: InputMaybe<Scalars['Float']['input']>;
  trim2?: InputMaybe<Scalars['Float']['input']>;
  trim3?: InputMaybe<Scalars['Float']['input']>;
  trim4?: InputMaybe<Scalars['Float']['input']>;
  unidad?: InputMaybe<Scalars['String']['input']>;
  variableOrigen?: InputMaybe<Scalars['String']['input']>;
};

export type PbrSumatoriaInput = {
  abril?: InputMaybe<Scalars['Float']['input']>;
  agosto?: InputMaybe<Scalars['Float']['input']>;
  ano?: InputMaybe<Scalars['Float']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  diciembre?: InputMaybe<Scalars['Float']['input']>;
  enero?: InputMaybe<Scalars['Float']['input']>;
  febrero?: InputMaybe<Scalars['Float']['input']>;
  idSumatoria?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  julio?: InputMaybe<Scalars['Float']['input']>;
  junio?: InputMaybe<Scalars['Float']['input']>;
  marzo?: InputMaybe<Scalars['Float']['input']>;
  mayo?: InputMaybe<Scalars['Float']['input']>;
  nombreSumatoria?: InputMaybe<Scalars['String']['input']>;
  noviembre?: InputMaybe<Scalars['Float']['input']>;
  octubre?: InputMaybe<Scalars['Float']['input']>;
  septiembre?: InputMaybe<Scalars['Float']['input']>;
  sumTotal?: InputMaybe<Scalars['Boolean']['input']>;
  sumTrim?: InputMaybe<Scalars['Boolean']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  trim1?: InputMaybe<Scalars['Float']['input']>;
  trim2?: InputMaybe<Scalars['Float']['input']>;
  trim3?: InputMaybe<Scalars['Float']['input']>;
  trim4?: InputMaybe<Scalars['Float']['input']>;
};

export type PbrSumatoriaType = {
  __typename?: 'PbrSumatoriaType';
  abril?: Maybe<Scalars['Float']['output']>;
  agosto?: Maybe<Scalars['Float']['output']>;
  ano?: Maybe<Scalars['Float']['output']>;
  centroGestor?: Maybe<Scalars['String']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  diciembre?: Maybe<Scalars['Float']['output']>;
  enero?: Maybe<Scalars['Float']['output']>;
  febrero?: Maybe<Scalars['Float']['output']>;
  idSumatoria?: Maybe<Scalars['String']['output']>;
  ids?: Maybe<Array<Scalars['String']['output']>>;
  julio?: Maybe<Scalars['Float']['output']>;
  junio?: Maybe<Scalars['Float']['output']>;
  marzo?: Maybe<Scalars['Float']['output']>;
  mayo?: Maybe<Scalars['Float']['output']>;
  nombreSumatoria?: Maybe<Scalars['String']['output']>;
  noviembre?: Maybe<Scalars['Float']['output']>;
  octubre?: Maybe<Scalars['Float']['output']>;
  septiembre?: Maybe<Scalars['Float']['output']>;
  sumTotal?: Maybe<Scalars['Boolean']['output']>;
  sumTrim?: Maybe<Scalars['Boolean']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  trim1?: Maybe<Scalars['Float']['output']>;
  trim2?: Maybe<Scalars['Float']['output']>;
  trim3?: Maybe<Scalars['Float']['output']>;
  trim4?: Maybe<Scalars['Float']['output']>;
};

export type PbrType = {
  __typename?: 'PbrType';
  abril?: Maybe<Scalars['Float']['output']>;
  agosto?: Maybe<Scalars['Float']['output']>;
  ano?: Maybe<Scalars['Int']['output']>;
  centroGestor?: Maybe<Scalars['String']['output']>;
  correo?: Maybe<Scalars['String']['output']>;
  dato?: Maybe<Scalars['String']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  diciembre?: Maybe<Scalars['Float']['output']>;
  enero?: Maybe<Scalars['Float']['output']>;
  febrero?: Maybe<Scalars['Float']['output']>;
  fechaCompleta?: Maybe<Scalars['String']['output']>;
  idEmpleado?: Maybe<Scalars['ID']['output']>;
  idIndicador?: Maybe<Scalars['String']['output']>;
  julio?: Maybe<Scalars['Float']['output']>;
  junio?: Maybe<Scalars['Float']['output']>;
  marzo?: Maybe<Scalars['Float']['output']>;
  mayo?: Maybe<Scalars['Float']['output']>;
  noviembre?: Maybe<Scalars['Float']['output']>;
  octubre?: Maybe<Scalars['Float']['output']>;
  responsable?: Maybe<Scalars['String']['output']>;
  septiembre?: Maybe<Scalars['Float']['output']>;
  tipoOperacion?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  trim1?: Maybe<Scalars['Float']['output']>;
  trim2?: Maybe<Scalars['Float']['output']>;
  trim3?: Maybe<Scalars['Float']['output']>;
  trim4?: Maybe<Scalars['Float']['output']>;
  unidad?: Maybe<Scalars['String']['output']>;
  variableOrigen?: Maybe<Scalars['String']['output']>;
};

export type PlaneacionInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  ano?: InputMaybe<Scalars['Int']['input']>;
  copia?: InputMaybe<Scalars['Boolean']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  mirCuestionario?: InputMaybe<Array<MirCuestionarioInput>>;
  pbrCuestionario?: InputMaybe<Array<PbrInput>>;
  pbrSumatoria?: InputMaybe<Array<PbrSumatoriaInput>>;
};

export type PlaneacionType = {
  __typename?: 'PlaneacionType';
  _id?: Maybe<Scalars['ID']['output']>;
  ano?: Maybe<Scalars['Int']['output']>;
  copia?: Maybe<Scalars['Boolean']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  mirCuestionario?: Maybe<Array<MirCuestionarioType>>;
  pbrCuestionario?: Maybe<Array<PbrType>>;
  pbrSumatoria?: Maybe<Array<PbrSumatoriaType>>;
};

export type PuestoDeptoInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  puesto?: InputMaybe<Scalars['String']['input']>;
};

export type PuestoInput = {
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  fechaAsignacion?: InputMaybe<Scalars['Int']['input']>;
  isr?: InputMaybe<Scalars['Float']['input']>;
  puesto?: InputMaybe<Scalars['String']['input']>;
  sueldo?: InputMaybe<Scalars['Float']['input']>;
};

export type PuestoType = {
  __typename?: 'PuestoType';
  activo?: Maybe<Scalars['Boolean']['output']>;
  fechaAsignacion?: Maybe<Scalars['Int']['output']>;
  isr?: Maybe<Scalars['Float']['output']>;
  puesto?: Maybe<Scalars['String']['output']>;
  sueldo?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  deptos: Array<DeptoType>;
  docsBusquedaGral: Array<DocumentoType>;
  docsFechas: Array<DocumentoType>;
  docsRef: Array<DocumentoType>;
  docsUsuarioProceso: Array<DocumentoType>;
  empleados: Array<EmpleadoType>;
  empleadosSesion: Array<EmpleadoType>;
  filTodos: Array<PlaneacionType>;
  filtrarDeptos: Array<DeptoType>;
  instalaciones: Array<TelemetriaType>;
  notificaciones?: Maybe<Array<NotificacionType>>;
  rolesAsig?: Maybe<RolesType>;
  selecciones?: Maybe<SeleccionType>;
};


export type QueryDocsBusquedaGralArgs = {
  consulta?: InputMaybe<Scalars['String']['input']>;
  enviadoPor?: InputMaybe<Scalars['ID']['input']>;
  esEnviadoPor?: InputMaybe<Scalars['Boolean']['input']>;
  usuario?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryDocsFechasArgs = {
  enviadoPor?: InputMaybe<Scalars['ID']['input']>;
  esEnviadoPor?: InputMaybe<Scalars['Boolean']['input']>;
  fechaFinal?: InputMaybe<Scalars['Int']['input']>;
  fechaInicial?: InputMaybe<Scalars['Int']['input']>;
  usuario?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryDocsRefArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  usuario?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryDocsUsuarioProcesoArgs = {
  enviadoPor?: InputMaybe<Scalars['ID']['input']>;
  esEnviadoPor?: InputMaybe<Scalars['Boolean']['input']>;
  proceso?: InputMaybe<Scalars['String']['input']>;
  usuario?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFiltrarDeptosArgs = {
  nombre: Scalars['String']['input'];
};


export type QueryNotificacionesArgs = {
  idUsuario: Scalars['String']['input'];
};


export type QueryRolesAsigArgs = {
  idEmpleado?: InputMaybe<Scalars['ID']['input']>;
};

export type RecalcularPbrInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  tipoOperacion?: InputMaybe<Scalars['String']['input']>;
};

export type RecibosInput = {
  ano?: InputMaybe<Scalars['Int']['input']>;
  costoKw?: InputMaybe<Scalars['Float']['input']>;
  fecha?: InputMaybe<Scalars['Date']['input']>;
  imgRecibo?: InputMaybe<Scalars['String']['input']>;
  lecturaMedidor?: InputMaybe<Scalars['Float']['input']>;
  lecturaRecibo?: InputMaybe<Scalars['Float']['input']>;
  pago?: InputMaybe<Scalars['Float']['input']>;
};

export type RecibosType = {
  __typename?: 'RecibosType';
  ano?: Maybe<Scalars['Int']['output']>;
  costoKw?: Maybe<Scalars['Float']['output']>;
  fecha?: Maybe<Scalars['Date']['output']>;
  imgRecibo?: Maybe<Scalars['String']['output']>;
  lecturaMedidor?: Maybe<Scalars['Float']['output']>;
  lecturaRecibo?: Maybe<Scalars['Float']['output']>;
  pago?: Maybe<Scalars['Float']['output']>;
};

export type RegAvancesPbrInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  abril?: InputMaybe<Scalars['Float']['input']>;
  agosto?: InputMaybe<Scalars['Float']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  diciembre?: InputMaybe<Scalars['Float']['input']>;
  enero?: InputMaybe<Scalars['Float']['input']>;
  febrero?: InputMaybe<Scalars['Float']['input']>;
  idIndicador?: InputMaybe<Scalars['String']['input']>;
  julio?: InputMaybe<Scalars['Float']['input']>;
  junio?: InputMaybe<Scalars['Float']['input']>;
  marzo?: InputMaybe<Scalars['Float']['input']>;
  mayo?: InputMaybe<Scalars['Float']['input']>;
  noviembre?: InputMaybe<Scalars['Float']['input']>;
  octubre?: InputMaybe<Scalars['Float']['input']>;
  septiembre?: InputMaybe<Scalars['Float']['input']>;
  tipoOperacion?: InputMaybe<Scalars['String']['input']>;
};

export type RegComponenteInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  formComun?: InputMaybe<Array<FormComunInput>>;
  formPlanta?: InputMaybe<Array<FormPlantaInput>>;
  idIndicadorMir?: InputMaybe<Scalars['String']['input']>;
  tablaColumnas?: InputMaybe<Array<TablaInput>>;
  tipoForm?: InputMaybe<Scalars['String']['input']>;
  tipoValorAvance?: InputMaybe<Scalars['String']['input']>;
  tipoValorTrim?: InputMaybe<Scalars['String']['input']>;
  valorAdicional?: InputMaybe<Scalars['Float']['input']>;
  valorAdicionalB?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RegEmpleadoInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  auth?: InputMaybe<AuthInput>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  calle?: InputMaybe<Scalars['String']['input']>;
  colonia?: InputMaybe<Scalars['String']['input']>;
  correo?: InputMaybe<Scalars['String']['input']>;
  deptoId?: InputMaybe<Scalars['ID']['input']>;
  fechaBaja?: InputMaybe<Scalars['Int']['input']>;
  fechaIngreso?: InputMaybe<Scalars['Int']['input']>;
  modificadoPor?: InputMaybe<Array<ModificadoPorInput>>;
  nombreCompleto?: InputMaybe<Scalars['String']['input']>;
  planeacionCentroGestor?: InputMaybe<Scalars['String']['input']>;
  puesto?: InputMaybe<Array<PuestoInput>>;
  telefono?: InputMaybe<Array<TelefonoInput>>;
};

export type RegInstalacionInput = {
  instalacion?: InputMaybe<InstalacionInput>;
};

export type RegMirInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  avanceAnual?: InputMaybe<Scalars['Float']['input']>;
  avanceTrim1?: InputMaybe<Scalars['Float']['input']>;
  avanceTrim2?: InputMaybe<Scalars['Float']['input']>;
  avanceTrim3?: InputMaybe<Scalars['Float']['input']>;
  avanceTrim4?: InputMaybe<Scalars['Float']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  componente?: InputMaybe<ComponenteInput>;
  correo?: InputMaybe<Scalars['String']['input']>;
  definicionIndicador?: InputMaybe<Scalars['String']['input']>;
  dimension?: InputMaybe<Scalars['String']['input']>;
  esActualizar?: InputMaybe<Scalars['Boolean']['input']>;
  frecuenciaMedicion?: InputMaybe<Scalars['String']['input']>;
  idEmpleado?: InputMaybe<Scalars['String']['input']>;
  idIndicador?: InputMaybe<Scalars['String']['input']>;
  lineaBaseAno?: InputMaybe<Scalars['String']['input']>;
  lineaBaseValor?: InputMaybe<Scalars['String']['input']>;
  mediosVerificacion?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['Float']['input']>;
  metodoCalculo?: InputMaybe<Scalars['String']['input']>;
  nivel?: InputMaybe<Scalars['String']['input']>;
  nombreDelIndicador?: InputMaybe<Scalars['String']['input']>;
  programaFinanciacion?: InputMaybe<Scalars['String']['input']>;
  responsable?: InputMaybe<Scalars['String']['input']>;
  resumenNarrativo?: InputMaybe<Scalars['String']['input']>;
  semefAmarillo?: InputMaybe<Scalars['Float']['input']>;
  semefAmarilloV?: InputMaybe<Scalars['Float']['input']>;
  semefRojo?: InputMaybe<Scalars['Float']['input']>;
  semefRojoV?: InputMaybe<Scalars['Float']['input']>;
  semefVerde?: InputMaybe<Scalars['Float']['input']>;
  semefVerdeV?: InputMaybe<Scalars['Float']['input']>;
  sentidoDelIndicador?: InputMaybe<Scalars['String']['input']>;
  supuestos?: InputMaybe<Scalars['String']['input']>;
  tipo?: InputMaybe<Scalars['String']['input']>;
  unidadDeMedida?: InputMaybe<Scalars['String']['input']>;
};

export type RegPbrInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  abril?: InputMaybe<Scalars['Float']['input']>;
  agosto?: InputMaybe<Scalars['Float']['input']>;
  ano?: InputMaybe<Scalars['Int']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  correo?: InputMaybe<Scalars['String']['input']>;
  dato?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  diciembre?: InputMaybe<Scalars['Float']['input']>;
  enero?: InputMaybe<Scalars['Float']['input']>;
  esActualizar?: InputMaybe<Scalars['Boolean']['input']>;
  febrero?: InputMaybe<Scalars['Float']['input']>;
  fechaCompleta?: InputMaybe<Scalars['String']['input']>;
  idEmpleado?: InputMaybe<Scalars['ID']['input']>;
  idIndicador?: InputMaybe<Scalars['String']['input']>;
  julio?: InputMaybe<Scalars['Float']['input']>;
  junio?: InputMaybe<Scalars['Float']['input']>;
  marzo?: InputMaybe<Scalars['Float']['input']>;
  mayo?: InputMaybe<Scalars['Float']['input']>;
  noviembre?: InputMaybe<Scalars['Float']['input']>;
  octubre?: InputMaybe<Scalars['Float']['input']>;
  responsable?: InputMaybe<Scalars['String']['input']>;
  septiembre?: InputMaybe<Scalars['Float']['input']>;
  tipoOperacion?: InputMaybe<Scalars['String']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  trim1?: InputMaybe<Scalars['Float']['input']>;
  trim2?: InputMaybe<Scalars['Float']['input']>;
  trim3?: InputMaybe<Scalars['Float']['input']>;
  trim4?: InputMaybe<Scalars['Float']['input']>;
  unidad?: InputMaybe<Scalars['String']['input']>;
  variableOrigen?: InputMaybe<Scalars['String']['input']>;
};

export type RolesInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  idEmpleado?: InputMaybe<Scalars['ID']['input']>;
  roles?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
};

export type RolesType = {
  __typename?: 'RolesType';
  _id?: Maybe<Scalars['ID']['output']>;
  idEmpleado?: Maybe<Scalars['ID']['output']>;
  roles?: Maybe<Array<Scalars['JSONObject']['output']>>;
};

export type SeleccionInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  centroGestor?: InputMaybe<Array<Scalars['String']['input']>>;
  dimension?: InputMaybe<Array<Scalars['String']['input']>>;
  frecuencia?: InputMaybe<Array<Scalars['String']['input']>>;
  tipo?: InputMaybe<Array<Scalars['String']['input']>>;
  unidad?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SeleccionType = {
  __typename?: 'SeleccionType';
  _id?: Maybe<Scalars['ID']['output']>;
  centroGestor?: Maybe<Array<Scalars['String']['output']>>;
  dimension?: Maybe<Array<Scalars['String']['output']>>;
  frecuencia?: Maybe<Array<Scalars['String']['output']>>;
  tipo?: Maybe<Array<Scalars['String']['output']>>;
  unidad?: Maybe<Array<Scalars['String']['output']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notificar: NotificacionType;
  rolCambiado: LoginRespuestaType;
};


export type SubscriptionNotificarArgs = {
  idUsuario: Scalars['String']['input'];
};


export type SubscriptionRolCambiadoArgs = {
  _id: Scalars['String']['input'];
};

export type SumPbrInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  abril?: InputMaybe<Scalars['Float']['input']>;
  agosto?: InputMaybe<Scalars['Float']['input']>;
  ano?: InputMaybe<Scalars['Float']['input']>;
  centroGestor?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  diciembre?: InputMaybe<Scalars['Float']['input']>;
  enero?: InputMaybe<Scalars['Float']['input']>;
  febrero?: InputMaybe<Scalars['Float']['input']>;
  idSumatoria?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  julio?: InputMaybe<Scalars['Float']['input']>;
  junio?: InputMaybe<Scalars['Float']['input']>;
  marzo?: InputMaybe<Scalars['Float']['input']>;
  mayo?: InputMaybe<Scalars['Float']['input']>;
  nombreSumatoria?: InputMaybe<Scalars['String']['input']>;
  noviembre?: InputMaybe<Scalars['Float']['input']>;
  octubre?: InputMaybe<Scalars['Float']['input']>;
  septiembre?: InputMaybe<Scalars['Float']['input']>;
  sumTotal?: InputMaybe<Scalars['Boolean']['input']>;
  sumTrim?: InputMaybe<Scalars['Boolean']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  trim1?: InputMaybe<Scalars['Float']['input']>;
  trim2?: InputMaybe<Scalars['Float']['input']>;
  trim3?: InputMaybe<Scalars['Float']['input']>;
  trim4?: InputMaybe<Scalars['Float']['input']>;
};

export type TablaInput = {
  def?: InputMaybe<Scalars['String']['input']>;
  etiqueta?: InputMaybe<Scalars['String']['input']>;
  formato?: InputMaybe<Scalars['String']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  llaveDato?: InputMaybe<Scalars['String']['input']>;
  tipoDeDato?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['String']['input']>;
};

export type TablaType = {
  __typename?: 'TablaType';
  def?: Maybe<Scalars['String']['output']>;
  etiqueta?: Maybe<Scalars['String']['output']>;
  formato?: Maybe<Scalars['String']['output']>;
  html?: Maybe<Scalars['String']['output']>;
  llaveDato?: Maybe<Scalars['String']['output']>;
  tipoDeDato?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['String']['output']>;
};

export type TelefonoInput = {
  numero?: InputMaybe<Scalars['String']['input']>;
};

export type TelefonoType = {
  __typename?: 'TelefonoType';
  numero?: Maybe<Scalars['String']['output']>;
};

export type TelemetriaInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  bombas?: InputMaybe<Array<BombaInput>>;
  instalacion?: InputMaybe<InstalacionInput>;
  medidores?: InputMaybe<Array<MedidorInput>>;
  motores?: InputMaybe<Array<MotorInput>>;
};

export type TelemetriaType = {
  __typename?: 'TelemetriaType';
  _id?: Maybe<Scalars['ID']['output']>;
  bombas?: Maybe<Array<BombaType>>;
  instalacion?: Maybe<InstalacionType>;
  medidores?: Maybe<Array<MedidorType>>;
  motores?: Maybe<Array<MotorType>>;
};

export type TomarMedicionInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  abril?: InputMaybe<Scalars['Float']['input']>;
  agosto?: InputMaybe<Scalars['Float']['input']>;
  ano?: InputMaybe<Scalars['Int']['input']>;
  diciembre?: InputMaybe<Scalars['Float']['input']>;
  enero?: InputMaybe<Scalars['Float']['input']>;
  febrero?: InputMaybe<Scalars['Float']['input']>;
  julio?: InputMaybe<Scalars['Float']['input']>;
  junio?: InputMaybe<Scalars['Float']['input']>;
  marzo?: InputMaybe<Scalars['Float']['input']>;
  mayo?: InputMaybe<Scalars['Float']['input']>;
  noviembre?: InputMaybe<Scalars['Float']['input']>;
  octubre?: InputMaybe<Scalars['Float']['input']>;
  septiembre?: InputMaybe<Scalars['Float']['input']>;
  tipoNivel?: InputMaybe<Scalars['String']['input']>;
};

export type UnionTele = ErroresType | TelemetriaType;

export type UploadInput = {
  carpeta?: InputMaybe<Scalars['String']['input']>;
  eliminar?: InputMaybe<Scalars['Boolean']['input']>;
  file?: InputMaybe<Array<Scalars['Upload']['input']>>;
  /** Es la url A eliminar en caso de que sea remplazar o eliminar el archivo */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type FragAuthFragment = { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null };

export type FragDatosSesionFragment = { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } };

export type RegistroSesionMutationVariables = Exact<{
  _id: Scalars['String']['input'];
  auth: AuthInput;
  modificadoPor: ModificadoPorInput;
}>;


export type RegistroSesionMutation = { __typename?: 'Mutation', registroSesion: { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } | null } };

export type ActualizarContrasenaAdminMutationVariables = Exact<{
  datos: CambioContrasenaInput;
  modificadoPor: ModificadoPorInput;
}>;


export type ActualizarContrasenaAdminMutation = { __typename?: 'Mutation', actualizarContrasenaAdmin: { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } | null } };

export type RolCambiadoSubscriptionVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RolCambiadoSubscription = { __typename?: 'Subscription', rolCambiado: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } } } };

export type LoginMutationVariables = Exact<{
  login: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } } } | null };

export type ActualizarAvatarMutationVariables = Exact<{
  _id: Scalars['String']['input'];
  url: Scalars['String']['input'];
}>;


export type ActualizarAvatarMutation = { __typename?: 'Mutation', actualizarAvatar: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } } } };

export type FragRolesFragment = { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null };

export type CrearRolesMutationVariables = Exact<{
  args: CrearRolInput;
}>;


export type CrearRolesMutation = { __typename?: 'Mutation', crearRoles?: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } | null };

export type RolesAsigQueryVariables = Exact<{
  idEmpleado: Scalars['ID']['input'];
}>;


export type RolesAsigQuery = { __typename?: 'Query', rolesAsig?: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } | null };

export type ActPrimerNivelMutationVariables = Exact<{
  role: ActRolesInput;
}>;


export type ActPrimerNivelMutation = { __typename?: 'Mutation', actPrimerNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type ActCtrlPrimerNivelMutationVariables = Exact<{
  ctrl: ActRolesInput;
}>;


export type ActCtrlPrimerNivelMutation = { __typename?: 'Mutation', actCtrlPrimerNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type ActSegundoNivelMutationVariables = Exact<{
  role: ActRolesInput;
}>;


export type ActSegundoNivelMutation = { __typename?: 'Mutation', actSegundoNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type ActCtrlSegundoNivelMutationVariables = Exact<{
  ctrl: ActRolesInput;
}>;


export type ActCtrlSegundoNivelMutation = { __typename?: 'Mutation', actCtrlSegundoNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type ActTercerNivelMutationVariables = Exact<{
  role: ActRolesInput;
}>;


export type ActTercerNivelMutation = { __typename?: 'Mutation', actTercerNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type ActCtrlTercerNivelMutationVariables = Exact<{
  ctrl: ActRolesInput;
}>;


export type ActCtrlTercerNivelMutation = { __typename?: 'Mutation', actCtrlTercerNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type AsigPermisoPrimerNivelMutationVariables = Exact<{
  asig: ActRolesInput;
}>;


export type AsigPermisoPrimerNivelMutation = { __typename?: 'Mutation', asigPermisoPrimerNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type AsigPermisoSegNivelMutationVariables = Exact<{
  asig: ActRolesInput;
}>;


export type AsigPermisoSegNivelMutation = { __typename?: 'Mutation', asigPermisoSegNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type AsigPermisoTercerNivelMutationVariables = Exact<{
  asig: ActRolesInput;
}>;


export type AsigPermisoTercerNivelMutation = { __typename?: 'Mutation', asigPermisoTercerNivel: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } };

export type FragDocFragment = { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null };

export type RegDocMutationVariables = Exact<{
  datos: DocRegInput;
  files?: InputMaybe<UploadInput>;
}>;


export type RegDocMutation = { __typename?: 'Mutation', regDoc: { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null } };

export type SubirDocsMutationVariables = Exact<{
  args: DocsSubirInput;
  files?: InputMaybe<UploadInput>;
  filesAcuse?: InputMaybe<UploadInput>;
}>;


export type SubirDocsMutation = { __typename?: 'Mutation', subirDocs: { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null } };

export type DocsUsuarioProcesoQueryVariables = Exact<{
  usuario?: InputMaybe<Scalars['ID']['input']>;
  esEnviadoPor?: InputMaybe<Scalars['Boolean']['input']>;
  enviadoPor?: InputMaybe<Scalars['ID']['input']>;
  proceso: Scalars['String']['input'];
}>;


export type DocsUsuarioProcesoQuery = { __typename?: 'Query', docsUsuarioProceso: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type GenFolioSinRegMutationVariables = Exact<{
  args: DocFolioInput;
}>;


export type GenFolioSinRegMutation = { __typename?: 'Mutation', genFolioSinReg: string };

export type DocActFolioMutationVariables = Exact<{
  args: DocActFolioInput;
}>;


export type DocActFolioMutation = { __typename?: 'Mutation', docActFolio: { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null } };

export type DocFinalizarMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type DocFinalizarMutation = { __typename?: 'Mutation', docFinalizar: { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null } };

export type ReasignarUsuarioMutationVariables = Exact<{
  usuarios: DocReasignarUsuarioInput;
}>;


export type ReasignarUsuarioMutation = { __typename?: 'Mutation', reasignarUsuario: { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null } };

export type DocsFechasQueryVariables = Exact<{
  usuario: Scalars['ID']['input'];
  enviadoPor: Scalars['ID']['input'];
  fechaInicial?: InputMaybe<Scalars['Int']['input']>;
  fechaFinal?: InputMaybe<Scalars['Int']['input']>;
  esEnviadoPor: Scalars['Boolean']['input'];
}>;


export type DocsFechasQuery = { __typename?: 'Query', docsFechas: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type DocsBusquedaGralQueryVariables = Exact<{
  usuario: Scalars['ID']['input'];
  consulta: Scalars['String']['input'];
  enviadoPor: Scalars['ID']['input'];
  esEnviadoPor: Scalars['Boolean']['input'];
}>;


export type DocsBusquedaGralQuery = { __typename?: 'Query', docsBusquedaGral: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type DocsRefQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
  usuario: Scalars['ID']['input'];
}>;


export type DocsRefQuery = { __typename?: 'Query', docsRef: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type DocRefFolioMutationVariables = Exact<{
  entradas: DocRefFolioInput;
}>;


export type DocRefFolioMutation = { __typename?: 'Mutation', docRefFolio: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type FragNotificacionFragment = { __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null };

export type NotificacionesQueryVariables = Exact<{
  idUsuario: Scalars['String']['input'];
}>;


export type NotificacionesQuery = { __typename?: 'Query', notificaciones?: Array<{ __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null }> | null };

export type NotificarSubscriptionVariables = Exact<{
  idUsuario: Scalars['String']['input'];
}>;


export type NotificarSubscription = { __typename?: 'Subscription', notificar: { __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null } };

export type EliminarNotMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type EliminarNotMutation = { __typename?: 'Mutation', eliminarNot: { __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null } };

export type EliminarTodosMutationVariables = Exact<{
  idUsuario: Scalars['String']['input'];
}>;


export type EliminarTodosMutation = { __typename?: 'Mutation', eliminarTodos: number };

export type FragDeptosFragment = { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null };

export type DepartamentosQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartamentosQuery = { __typename?: 'Query', deptos: Array<{ __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null }> };

export type FiltrarDeptosQueryVariables = Exact<{
  nombre: Scalars['String']['input'];
}>;


export type FiltrarDeptosQuery = { __typename?: 'Query', filtrarDeptos: Array<{ __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null }> };

export type CrearDeptoMutationVariables = Exact<{
  input: DeptoInput;
}>;


export type CrearDeptoMutation = { __typename?: 'Mutation', crearDepto: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } };

export type ActualizarDeptoMutationVariables = Exact<{
  input: DeptoInput;
}>;


export type ActualizarDeptoMutation = { __typename?: 'Mutation', actualizarDepto: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } };

export type AgregarPuestoMutationVariables = Exact<{
  puesto: PuestoDeptoInput;
}>;


export type AgregarPuestoMutation = { __typename?: 'Mutation', agregarPuesto: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } };

export type FragTelefonoFragment = { __typename?: 'TelefonoType', numero?: string | null };

export type FragModificadoPorFragment = { __typename?: 'ModificadoPorType', fecha?: number | null, usuario?: string | null, accion?: string | null, valorAnterior?: Array<any> | null, valorActual?: Array<any> | null };

export type FragEmpleadoFragment = { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null };

export type EmpleadosQueryVariables = Exact<{ [key: string]: never; }>;


export type EmpleadosQuery = { __typename?: 'Query', empleados: Array<{ __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } | null, telefono?: Array<{ __typename?: 'TelefonoType', numero?: string | null }> | null, modificadoPor?: Array<{ __typename?: 'ModificadoPorType', fecha?: number | null, usuario?: string | null, accion?: string | null, valorAnterior?: Array<any> | null, valorActual?: Array<any> | null }> | null }> };

export type EmpleadosSesionQueryVariables = Exact<{ [key: string]: never; }>;


export type EmpleadosSesionQuery = { __typename?: 'Query', empleadosSesion: Array<{ __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } | null }> };

export type CrearActEmpledoMutationVariables = Exact<{
  empleadoDatos: RegEmpleadoInput;
}>;


export type CrearActEmpledoMutation = { __typename?: 'Mutation', crearActEmpledo: { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, telefono?: Array<{ __typename?: 'TelefonoType', numero?: string | null }> | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } | null } };

export type FragPuestoFragment = { __typename?: 'PuestoType', puesto?: string | null, activo?: boolean | null, fechaAsignacion?: number | null, isr?: number | null, sueldo?: number | null };

export type FragComponenteFragment = { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null };

export type FragFormComunFragment = { __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null };

export type FragPlantaFragment = { __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null };

export type FragMirFragment = { __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null };

export type FragPbrFragment = { __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null };

export type FragSumPbrFragment = { __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null };

export type FragPlaneacionFragment = { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null };

export type FilTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type FilTodosQuery = { __typename?: 'Query', filTodos: Array<{ __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null }> };

export type InicializarPlaneacionMutationVariables = Exact<{
  input: PlaneacionInput;
}>;


export type InicializarPlaneacionMutation = { __typename?: 'Mutation', inicializarPlaneacion: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type RegMirMutationVariables = Exact<{
  datos: RegMirInput;
}>;


export type RegMirMutation = { __typename?: 'Mutation', regMir: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type RegPbrMutationVariables = Exact<{
  datos: RegPbrInput;
}>;


export type RegPbrMutation = { __typename?: 'Mutation', regPbr: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type ActualizarResponsableMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
  idEmpleado: Scalars['ID']['input'];
  correo?: InputMaybe<Scalars['String']['input']>;
  responsable: Scalars['String']['input'];
  idEmpleadoAnterior: Scalars['ID']['input'];
  cuestionario: Scalars['String']['input'];
}>;


export type ActualizarResponsableMutation = { __typename?: 'Mutation', actualizarResponsable: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type EliminarElementoMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
  idIndicador: Scalars['String']['input'];
  cuestionario: Scalars['String']['input'];
}>;


export type EliminarElementoMutation = { __typename?: 'Mutation', eliminarElemento: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type RegAvancePbrMutationVariables = Exact<{
  datos: RegAvancesPbrInput;
}>;


export type RegAvancePbrMutation = { __typename?: 'Mutation', regAvancePbr: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type SumatoriaPbrMutationVariables = Exact<{
  datos: SumPbrInput;
  actualizar: Scalars['Boolean']['input'];
}>;


export type SumatoriaPbrMutation = { __typename?: 'Mutation', sumatoriaPbr: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type RecalcularPbrMutationVariables = Exact<{
  args: RecalcularPbrInput;
}>;


export type RecalcularPbrMutation = { __typename?: 'Mutation', recalcularPbr: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type RegComponenteMutationVariables = Exact<{
  datos: RegComponenteInput;
}>;


export type RegComponenteMutation = { __typename?: 'Mutation', regComponente: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type ReemplazarCompMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
  idIndicador: Scalars['String']['input'];
}>;


export type ReemplazarCompMutation = { __typename?: 'Mutation', reemplazarComp: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, mediosVerificacion?: string | null, supuestos?: string | null, definicionIndicador?: string | null, lineaBaseAno?: string | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, componente?: { __typename?: 'ComponenteType', tipoValorTrim?: string | null, tipoValorAvance?: string | null, tipoForm?: string | null, valorAdicionalB?: boolean | null, valorAdicional?: number | null, formComun?: Array<{ __typename?: 'FormComunType', idIndicador?: string | null, dato?: string | null, valorAdicional?: string | null }> | null, formPlanta?: Array<{ __typename?: 'FormPlantaType', sstE?: number | null, dqoE?: number | null, grasasAceitesE?: number | null, ptarE?: string | null }> | null } | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, tipoOperacion?: string | null }> | null, pbrSumatoria?: Array<{ __typename?: 'PbrSumatoriaType', idSumatoria?: string | null, centroGestor?: string | null, descripcion?: string | null, ids?: Array<string> | null, nombreSumatoria?: string | null, total?: number | null, abril?: number | null, agosto?: number | null, ano?: number | null, diciembre?: number | null, enero?: number | null, febrero?: number | null, julio?: number | null, junio?: number | null, marzo?: number | null, mayo?: number | null, noviembre?: number | null, octubre?: number | null, septiembre?: number | null, trim1?: number | null, trim2?: number | null, trim3?: number | null, trim4?: number | null, sumTrim?: boolean | null, sumTotal?: boolean | null }> | null } };

export type RegSeleccionMutationVariables = Exact<{
  input?: InputMaybe<SeleccionInput>;
}>;


export type RegSeleccionMutation = { __typename?: 'Mutation', regSeleccion: { __typename?: 'SeleccionType', dimension?: Array<string> | null, frecuencia?: Array<string> | null, tipo?: Array<string> | null, unidad?: Array<string> | null, centroGestor?: Array<string> | null, _id?: string | null } };

export type SeleccionesQueryVariables = Exact<{ [key: string]: never; }>;


export type SeleccionesQuery = { __typename?: 'Query', selecciones?: { __typename?: 'SeleccionType', dimension?: Array<string> | null, frecuencia?: Array<string> | null, tipo?: Array<string> | null, unidad?: Array<string> | null, centroGestor?: Array<string> | null, _id?: string | null } | null };

export type FragSeleccionFragment = { __typename?: 'SeleccionType', dimension?: Array<string> | null, frecuencia?: Array<string> | null, tipo?: Array<string> | null, unidad?: Array<string> | null, centroGestor?: Array<string> | null, _id?: string | null };

export type FragBombaFragment = { __typename?: 'BombaType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, noImpulsores?: number | null, rpm?: number | null, diametro?: number | null, lts?: number | null, eficiencia?: number | null };

export type FragMedidoresFragment = { __typename?: 'MedidorType', activo?: boolean | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, medidor?: string | null, servicio?: string | null, reciboCfe?: Array<{ __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null }> | null };

export type FragReciboFragment = { __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null };

export type FragMotorFragment = { __typename?: 'MotorType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, hp?: number | null, voltaje?: number | null, amperaje?: number | null, factPotencia?: number | null, eficiencia?: number | null };

export type FragInstalacionFragment = { __typename?: 'InstalacionType', activo?: boolean | null, diamAdeme?: number | null, diamCol?: number | null, diamPerforacion?: number | null, direccion?: string | null, longCol?: number | null, nombre?: string | null, profPozo?: number | null, tipoInstalacion?: string | null, nivelDinamico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null, nivelEstatico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null };

export type FragMedicionFragment = { __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null };

export type InstalacionesQueryVariables = Exact<{ [key: string]: never; }>;


export type InstalacionesQuery = { __typename?: 'Query', instalaciones: Array<{ __typename?: 'TelemetriaType', _id?: string | null, instalacion?: { __typename?: 'InstalacionType', activo?: boolean | null, diamAdeme?: number | null, diamCol?: number | null, diamPerforacion?: number | null, direccion?: string | null, longCol?: number | null, nombre?: string | null, profPozo?: number | null, tipoInstalacion?: string | null, nivelDinamico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null, nivelEstatico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null } | null, bombas?: Array<{ __typename?: 'BombaType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, noImpulsores?: number | null, rpm?: number | null, diametro?: number | null, lts?: number | null, eficiencia?: number | null }> | null, motores?: Array<{ __typename?: 'MotorType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, hp?: number | null, voltaje?: number | null, amperaje?: number | null, factPotencia?: number | null, eficiencia?: number | null }> | null, medidores?: Array<{ __typename?: 'MedidorType', activo?: boolean | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, medidor?: string | null, servicio?: string | null, reciboCfe?: Array<{ __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null }> | null }> | null }> };

export type RegInstalacionMutationVariables = Exact<{
  datos: RegInstalacionInput;
}>;


export type RegInstalacionMutation = { __typename?: 'Mutation', regInstalacion: { __typename?: 'ErroresType', error?: string | null, exito?: boolean | null } | { __typename?: 'TelemetriaType', _id?: string | null, instalacion?: { __typename?: 'InstalacionType', activo?: boolean | null, diamAdeme?: number | null, diamCol?: number | null, diamPerforacion?: number | null, direccion?: string | null, longCol?: number | null, nombre?: string | null, profPozo?: number | null, tipoInstalacion?: string | null, nivelDinamico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null, nivelEstatico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null } | null, medidores?: Array<{ __typename?: 'MedidorType', activo?: boolean | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, medidor?: string | null, servicio?: string | null, reciboCfe?: Array<{ __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null }> | null }> | null, bombas?: Array<{ __typename?: 'BombaType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, noImpulsores?: number | null, rpm?: number | null, diametro?: number | null, lts?: number | null, eficiencia?: number | null }> | null, motores?: Array<{ __typename?: 'MotorType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, hp?: number | null, voltaje?: number | null, amperaje?: number | null, factPotencia?: number | null, eficiencia?: number | null }> | null } };

export type ActInstMutationVariables = Exact<{
  args: ActInstInput;
}>;


export type ActInstMutation = { __typename?: 'Mutation', actInst: { __typename?: 'TelemetriaType', _id?: string | null, instalacion?: { __typename?: 'InstalacionType', activo?: boolean | null, diamAdeme?: number | null, diamCol?: number | null, diamPerforacion?: number | null, direccion?: string | null, longCol?: number | null, nombre?: string | null, profPozo?: number | null, tipoInstalacion?: string | null, nivelDinamico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null, nivelEstatico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null } | null, medidores?: Array<{ __typename?: 'MedidorType', activo?: boolean | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, medidor?: string | null, servicio?: string | null, reciboCfe?: Array<{ __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null }> | null }> | null, bombas?: Array<{ __typename?: 'BombaType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, noImpulsores?: number | null, rpm?: number | null, diametro?: number | null, lts?: number | null, eficiencia?: number | null }> | null, motores?: Array<{ __typename?: 'MotorType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, hp?: number | null, voltaje?: number | null, amperaje?: number | null, factPotencia?: number | null, eficiencia?: number | null }> | null } };

export type AgregarMotorMutationVariables = Exact<{
  args: AgregarMotorInput;
}>;


export type AgregarMotorMutation = { __typename?: 'Mutation', agregarMotor: { __typename?: 'TelemetriaType', _id?: string | null, instalacion?: { __typename?: 'InstalacionType', activo?: boolean | null, diamAdeme?: number | null, diamCol?: number | null, diamPerforacion?: number | null, direccion?: string | null, longCol?: number | null, nombre?: string | null, profPozo?: number | null, tipoInstalacion?: string | null, nivelDinamico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null, nivelEstatico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null } | null, medidores?: Array<{ __typename?: 'MedidorType', activo?: boolean | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, medidor?: string | null, servicio?: string | null, reciboCfe?: Array<{ __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null }> | null }> | null, motores?: Array<{ __typename?: 'MotorType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, hp?: number | null, voltaje?: number | null, amperaje?: number | null, factPotencia?: number | null, eficiencia?: number | null }> | null, bombas?: Array<{ __typename?: 'BombaType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, noImpulsores?: number | null, rpm?: number | null, diametro?: number | null, lts?: number | null, eficiencia?: number | null }> | null } };

export type AgregarBombaMutationVariables = Exact<{
  args: AgregarBombaInput;
}>;


export type AgregarBombaMutation = { __typename?: 'Mutation', agregarBomba: { __typename?: 'TelemetriaType', _id?: string | null, instalacion?: { __typename?: 'InstalacionType', activo?: boolean | null, diamAdeme?: number | null, diamCol?: number | null, diamPerforacion?: number | null, direccion?: string | null, longCol?: number | null, nombre?: string | null, profPozo?: number | null, tipoInstalacion?: string | null, nivelDinamico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null, nivelEstatico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null } | null, medidores?: Array<{ __typename?: 'MedidorType', activo?: boolean | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, medidor?: string | null, servicio?: string | null, reciboCfe?: Array<{ __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null }> | null }> | null, motores?: Array<{ __typename?: 'MotorType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, hp?: number | null, voltaje?: number | null, amperaje?: number | null, factPotencia?: number | null, eficiencia?: number | null }> | null, bombas?: Array<{ __typename?: 'BombaType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, noImpulsores?: number | null, rpm?: number | null, diametro?: number | null, lts?: number | null, eficiencia?: number | null }> | null } };

export type CrearRegLecturaMutationVariables = Exact<{
  args: TomarMedicionInput;
}>;


export type CrearRegLecturaMutation = { __typename?: 'Mutation', crearRegLectura: { __typename?: 'ErroresType', error?: string | null, exito?: boolean | null } | { __typename?: 'TelemetriaType', _id?: string | null, instalacion?: { __typename?: 'InstalacionType', activo?: boolean | null, diamAdeme?: number | null, diamCol?: number | null, diamPerforacion?: number | null, direccion?: string | null, longCol?: number | null, nombre?: string | null, profPozo?: number | null, tipoInstalacion?: string | null, nivelDinamico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null, nivelEstatico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null } | null, medidores?: Array<{ __typename?: 'MedidorType', activo?: boolean | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, medidor?: string | null, servicio?: string | null, reciboCfe?: Array<{ __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null }> | null }> | null, motores?: Array<{ __typename?: 'MotorType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, hp?: number | null, voltaje?: number | null, amperaje?: number | null, factPotencia?: number | null, eficiencia?: number | null }> | null, bombas?: Array<{ __typename?: 'BombaType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, noImpulsores?: number | null, rpm?: number | null, diametro?: number | null, lts?: number | null, eficiencia?: number | null }> | null } };

export type ActLecturaMutationVariables = Exact<{
  args: TomarMedicionInput;
}>;


export type ActLecturaMutation = { __typename?: 'Mutation', actLectura: { __typename?: 'TelemetriaType', _id?: string | null, instalacion?: { __typename?: 'InstalacionType', activo?: boolean | null, diamAdeme?: number | null, diamCol?: number | null, diamPerforacion?: number | null, direccion?: string | null, longCol?: number | null, nombre?: string | null, profPozo?: number | null, tipoInstalacion?: string | null, nivelDinamico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null, nivelEstatico?: Array<{ __typename?: 'MedicionType', ano?: number | null, enero?: number | null, febrero?: number | null, marzo?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null }> | null } | null, medidores?: Array<{ __typename?: 'MedidorType', activo?: boolean | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, medidor?: string | null, servicio?: string | null, reciboCfe?: Array<{ __typename?: 'RecibosType', pago?: number | null, imgRecibo?: string | null, fecha?: any | null, costoKw?: number | null, ano?: number | null, lecturaMedidor?: number | null, lecturaRecibo?: number | null }> | null }> | null, motores?: Array<{ __typename?: 'MotorType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, hp?: number | null, voltaje?: number | null, amperaje?: number | null, factPotencia?: number | null, eficiencia?: number | null }> | null, bombas?: Array<{ __typename?: 'BombaType', noSerie?: string | null, modelo?: string | null, fechaInstalacion?: any | null, fechaRetiro?: any | null, evidenciaInst?: Array<string> | null, evidenciaRetiro?: Array<string> | null, marca?: string | null, motivoRet?: string | null, observaciones?: string | null, descripcion?: string | null, activo?: boolean | null, noImpulsores?: number | null, rpm?: number | null, diametro?: number | null, lts?: number | null, eficiencia?: number | null }> | null } };

export type FragErroresFragment = { __typename?: 'ErroresType', error?: string | null, exito?: boolean | null };

export const FragAuthFragmentDoc = gql`
    fragment fragAuth on AuthType {
  usuario
  activo
  roles
  estatus
  guards
  controles
}
    `;
export const FragDatosSesionFragmentDoc = gql`
    fragment fragDatosSesion on DatosSesionType {
  _id
  nombreCompleto
  avatar
  activo
  deptoId
  auth {
    ...fragAuth
  }
}
    ${FragAuthFragmentDoc}`;
export const FragRolesFragmentDoc = gql`
    fragment fragRoles on RolesType {
  _id
  idEmpleado
  roles
}
    `;
export const FragDocFragmentDoc = gql`
    fragment fragDoc on DocumentoType {
  _id
  identificadorDoc
  seguimiento
  folio
  tipoDoc
  esInterno
  dependencia
  comentario
  asunto
  docUrl
  acuseUrl
  fechaRecepcion
  fechaLimiteEntrega
  fechaTerminado
  proceso
  usuarioFolio
  enviadoPor
  ano
  ref
  usuarios
  esRef
}
    `;
export const FragNotificacionFragmentDoc = gql`
    fragment fragNotificacion on NotificacionType {
  _id
  idUsuario
  titulo
  imagen
  icono
  descripcion
  tiempo
  link
  leido
  usarRouter
}
    `;
export const FragDeptosFragmentDoc = gql`
    fragment fragDeptos on DeptoType {
  _id
  nombre
  centroGestor
  puestos
}
    `;
export const FragTelefonoFragmentDoc = gql`
    fragment fragTelefono on TelefonoType {
  numero
}
    `;
export const FragModificadoPorFragmentDoc = gql`
    fragment fragModificadoPor on ModificadoPorType {
  fecha
  usuario
  accion
  valorAnterior
  valorActual
}
    `;
export const FragEmpleadoFragmentDoc = gql`
    fragment fragEmpleado on EmpleadoType {
  _id
  avatar
  nombreCompleto
  calle
  colonia
  fechaIngreso
  fechaBaja
  activo
  correo
  deptoId
}
    `;
export const FragPuestoFragmentDoc = gql`
    fragment fragPuesto on PuestoType {
  puesto
  activo
  fechaAsignacion
  isr
  sueldo
}
    `;
export const FragFormComunFragmentDoc = gql`
    fragment fragFormComun on FormComunType {
  idIndicador
  dato
  valorAdicional
}
    `;
export const FragPlantaFragmentDoc = gql`
    fragment fragPlanta on FormPlantaType {
  sstE
  dqoE
  grasasAceitesE
  ptarE
}
    `;
export const FragComponenteFragmentDoc = gql`
    fragment fragComponente on ComponenteType {
  tipoValorTrim
  tipoValorAvance
  tipoForm
  valorAdicionalB
  valorAdicional
  formComun {
    ...fragFormComun
  }
  formPlanta {
    ...fragPlanta
  }
}
    ${FragFormComunFragmentDoc}
${FragPlantaFragmentDoc}`;
export const FragMirFragmentDoc = gql`
    fragment fragMir on MirCuestionarioType {
  idIndicador
  correo
  responsable
  idEmpleado
  nivel
  programaFinanciacion
  resumenNarrativo
  centroGestor
  nombreDelIndicador
  tipo
  dimension
  metodoCalculo
  unidadDeMedida
  frecuenciaMedicion
  mediosVerificacion
  supuestos
  definicionIndicador
  lineaBaseAno
  lineaBaseValor
  meta
  sentidoDelIndicador
  semefVerde
  semefVerdeV
  semefAmarillo
  semefAmarilloV
  semefRojo
  semefRojoV
  avanceTrim1
  avanceTrim2
  avanceTrim3
  avanceAnual
  avanceTrim4
  componente {
    ...fragComponente
  }
}
    ${FragComponenteFragmentDoc}`;
export const FragPbrFragmentDoc = gql`
    fragment fragPbr on PbrType {
  idIndicador
  fechaCompleta
  variableOrigen
  dato
  unidad
  descripcion
  centroGestor
  idEmpleado
  correo
  responsable
  enero
  febrero
  marzo
  trim1
  abril
  mayo
  junio
  trim2
  julio
  agosto
  septiembre
  trim3
  octubre
  noviembre
  diciembre
  trim4
  total
  tipoOperacion
}
    `;
export const FragSumPbrFragmentDoc = gql`
    fragment fragSumPbr on PbrSumatoriaType {
  idSumatoria
  centroGestor
  descripcion
  ids
  nombreSumatoria
  total
  abril
  agosto
  ano
  diciembre
  enero
  febrero
  julio
  junio
  marzo
  mayo
  noviembre
  octubre
  septiembre
  trim1
  trim2
  trim3
  trim4
  sumTrim
  sumTotal
}
    `;
export const FragPlaneacionFragmentDoc = gql`
    fragment fragPlaneacion on PlaneacionType {
  _id
  ano
  descripcion
  mirCuestionario {
    ...fragMir
  }
  pbrCuestionario {
    ...fragPbr
  }
  pbrSumatoria {
    ...fragSumPbr
  }
}
    ${FragMirFragmentDoc}
${FragPbrFragmentDoc}
${FragSumPbrFragmentDoc}`;
export const FragSeleccionFragmentDoc = gql`
    fragment fragSeleccion on SeleccionType {
  dimension
  frecuencia
  tipo
  unidad
  centroGestor
  _id
}
    `;
export const FragBombaFragmentDoc = gql`
    fragment fragBomba on BombaType {
  noSerie
  modelo
  fechaInstalacion
  fechaRetiro
  evidenciaInst
  evidenciaRetiro
  marca
  motivoRet
  observaciones
  descripcion
  activo
  noImpulsores
  rpm
  diametro
  lts
  eficiencia
}
    `;
export const FragReciboFragmentDoc = gql`
    fragment fragRecibo on RecibosType {
  pago
  imgRecibo
  fecha
  costoKw
  ano
  lecturaMedidor
  lecturaRecibo
}
    `;
export const FragMedidoresFragmentDoc = gql`
    fragment fragMedidores on MedidorType {
  activo
  fechaInstalacion
  fechaRetiro
  medidor
  servicio
  reciboCfe {
    ...fragRecibo
  }
}
    ${FragReciboFragmentDoc}`;
export const FragMotorFragmentDoc = gql`
    fragment fragMotor on MotorType {
  noSerie
  modelo
  fechaInstalacion
  fechaRetiro
  evidenciaInst
  evidenciaRetiro
  marca
  motivoRet
  observaciones
  descripcion
  activo
  hp
  voltaje
  amperaje
  factPotencia
  eficiencia
}
    `;
export const FragMedicionFragmentDoc = gql`
    fragment fragMedicion on MedicionType {
  ano
  enero
  febrero
  marzo
  abril
  mayo
  junio
  julio
  agosto
  septiembre
  octubre
  noviembre
  diciembre
}
    `;
export const FragInstalacionFragmentDoc = gql`
    fragment fragInstalacion on InstalacionType {
  activo
  diamAdeme
  diamCol
  diamPerforacion
  direccion
  longCol
  nombre
  profPozo
  tipoInstalacion
  nivelDinamico {
    ...fragMedicion
  }
  nivelEstatico {
    ...fragMedicion
  }
}
    ${FragMedicionFragmentDoc}`;
export const FragErroresFragmentDoc = gql`
    fragment fragErrores on ErroresType {
  error
  exito
}
    `;
export const RegistroSesionDocument = gql`
    mutation registroSesion($_id: String!, $auth: AuthInput!, $modificadoPor: ModificadoPorInput!) {
  registroSesion(_id: $_id, auth: $auth, modificadoPor: $modificadoPor) {
    ...fragEmpleado
    auth {
      ...fragAuth
    }
    deptoEmpleado {
      ...fragDeptos
    }
  }
}
    ${FragEmpleadoFragmentDoc}
${FragAuthFragmentDoc}
${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegistroSesionGQL extends Apollo.Mutation<RegistroSesionMutation, RegistroSesionMutationVariables> {
    document = RegistroSesionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActualizarContrasenaAdminDocument = gql`
    mutation actualizarContrasenaAdmin($datos: CambioContrasenaInput!, $modificadoPor: ModificadoPorInput!) {
  actualizarContrasenaAdmin(datos: $datos, modificadoPor: $modificadoPor) {
    ...fragEmpleado
    auth {
      ...fragAuth
    }
    deptoEmpleado {
      ...fragDeptos
    }
  }
}
    ${FragEmpleadoFragmentDoc}
${FragAuthFragmentDoc}
${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActualizarContrasenaAdminGQL extends Apollo.Mutation<ActualizarContrasenaAdminMutation, ActualizarContrasenaAdminMutationVariables> {
    document = ActualizarContrasenaAdminDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RolCambiadoDocument = gql`
    subscription rolCambiado($_id: String!) {
  rolCambiado(_id: $_id) {
    token
    datosSesion {
      ...fragDatosSesion
    }
  }
}
    ${FragDatosSesionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RolCambiadoGQL extends Apollo.Subscription<RolCambiadoSubscription, RolCambiadoSubscriptionVariables> {
    document = RolCambiadoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation login($login: LoginInput!) {
  login(login: $login) {
    token
    datosSesion {
      ...fragDatosSesion
    }
  }
}
    ${FragDatosSesionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActualizarAvatarDocument = gql`
    mutation actualizarAvatar($_id: String!, $url: String!) {
  actualizarAvatar(_id: $_id, url: $url) {
    token
    datosSesion {
      ...fragDatosSesion
    }
  }
}
    ${FragDatosSesionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActualizarAvatarGQL extends Apollo.Mutation<ActualizarAvatarMutation, ActualizarAvatarMutationVariables> {
    document = ActualizarAvatarDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CrearRolesDocument = gql`
    mutation crearRoles($args: CrearRolInput!) {
  crearRoles(args: $args) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CrearRolesGQL extends Apollo.Mutation<CrearRolesMutation, CrearRolesMutationVariables> {
    document = CrearRolesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RolesAsigDocument = gql`
    query rolesAsig($idEmpleado: ID!) {
  rolesAsig(idEmpleado: $idEmpleado) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RolesAsigGQL extends Apollo.Query<RolesAsigQuery, RolesAsigQueryVariables> {
    document = RolesAsigDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActPrimerNivelDocument = gql`
    mutation actPrimerNivel($role: ActRolesInput!) {
  actPrimerNivel(role: $role) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActPrimerNivelGQL extends Apollo.Mutation<ActPrimerNivelMutation, ActPrimerNivelMutationVariables> {
    document = ActPrimerNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActCtrlPrimerNivelDocument = gql`
    mutation actCtrlPrimerNivel($ctrl: ActRolesInput!) {
  actCtrlPrimerNivel(ctrl: $ctrl) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActCtrlPrimerNivelGQL extends Apollo.Mutation<ActCtrlPrimerNivelMutation, ActCtrlPrimerNivelMutationVariables> {
    document = ActCtrlPrimerNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActSegundoNivelDocument = gql`
    mutation actSegundoNivel($role: ActRolesInput!) {
  actSegundoNivel(role: $role) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActSegundoNivelGQL extends Apollo.Mutation<ActSegundoNivelMutation, ActSegundoNivelMutationVariables> {
    document = ActSegundoNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActCtrlSegundoNivelDocument = gql`
    mutation actCtrlSegundoNivel($ctrl: ActRolesInput!) {
  actCtrlSegundoNivel(ctrl: $ctrl) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActCtrlSegundoNivelGQL extends Apollo.Mutation<ActCtrlSegundoNivelMutation, ActCtrlSegundoNivelMutationVariables> {
    document = ActCtrlSegundoNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActTercerNivelDocument = gql`
    mutation actTercerNivel($role: ActRolesInput!) {
  actTercerNivel(role: $role) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActTercerNivelGQL extends Apollo.Mutation<ActTercerNivelMutation, ActTercerNivelMutationVariables> {
    document = ActTercerNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActCtrlTercerNivelDocument = gql`
    mutation actCtrlTercerNivel($ctrl: ActRolesInput!) {
  actCtrlTercerNivel(ctrl: $ctrl) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActCtrlTercerNivelGQL extends Apollo.Mutation<ActCtrlTercerNivelMutation, ActCtrlTercerNivelMutationVariables> {
    document = ActCtrlTercerNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AsigPermisoPrimerNivelDocument = gql`
    mutation asigPermisoPrimerNivel($asig: ActRolesInput!) {
  asigPermisoPrimerNivel(asig: $asig) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AsigPermisoPrimerNivelGQL extends Apollo.Mutation<AsigPermisoPrimerNivelMutation, AsigPermisoPrimerNivelMutationVariables> {
    document = AsigPermisoPrimerNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AsigPermisoSegNivelDocument = gql`
    mutation asigPermisoSegNivel($asig: ActRolesInput!) {
  asigPermisoSegNivel(asig: $asig) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AsigPermisoSegNivelGQL extends Apollo.Mutation<AsigPermisoSegNivelMutation, AsigPermisoSegNivelMutationVariables> {
    document = AsigPermisoSegNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AsigPermisoTercerNivelDocument = gql`
    mutation asigPermisoTercerNivel($asig: ActRolesInput!) {
  asigPermisoTercerNivel(asig: $asig) {
    ...fragRoles
  }
}
    ${FragRolesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AsigPermisoTercerNivelGQL extends Apollo.Mutation<AsigPermisoTercerNivelMutation, AsigPermisoTercerNivelMutationVariables> {
    document = AsigPermisoTercerNivelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegDocDocument = gql`
    mutation regDoc($datos: DocRegInput!, $files: UploadInput) {
  regDoc(datos: $datos, files: $files) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegDocGQL extends Apollo.Mutation<RegDocMutation, RegDocMutationVariables> {
    document = RegDocDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SubirDocsDocument = gql`
    mutation subirDocs($args: DocsSubirInput!, $files: UploadInput, $filesAcuse: UploadInput) {
  subirDocs(args: $args, files: $files, filesAcuse: $filesAcuse) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SubirDocsGQL extends Apollo.Mutation<SubirDocsMutation, SubirDocsMutationVariables> {
    document = SubirDocsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocsUsuarioProcesoDocument = gql`
    query docsUsuarioProceso($usuario: ID, $esEnviadoPor: Boolean, $enviadoPor: ID, $proceso: String!) {
  docsUsuarioProceso(
    usuario: $usuario
    esEnviadoPor: $esEnviadoPor
    enviadoPor: $enviadoPor
    proceso: $proceso
  ) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DocsUsuarioProcesoGQL extends Apollo.Query<DocsUsuarioProcesoQuery, DocsUsuarioProcesoQueryVariables> {
    document = DocsUsuarioProcesoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GenFolioSinRegDocument = gql`
    mutation genFolioSinReg($args: DocFolioInput!) {
  genFolioSinReg(args: $args)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GenFolioSinRegGQL extends Apollo.Mutation<GenFolioSinRegMutation, GenFolioSinRegMutationVariables> {
    document = GenFolioSinRegDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocActFolioDocument = gql`
    mutation docActFolio($args: DocActFolioInput!) {
  docActFolio(args: $args) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DocActFolioGQL extends Apollo.Mutation<DocActFolioMutation, DocActFolioMutationVariables> {
    document = DocActFolioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocFinalizarDocument = gql`
    mutation docFinalizar($_id: String!) {
  docFinalizar(_id: $_id) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DocFinalizarGQL extends Apollo.Mutation<DocFinalizarMutation, DocFinalizarMutationVariables> {
    document = DocFinalizarDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReasignarUsuarioDocument = gql`
    mutation reasignarUsuario($usuarios: DocReasignarUsuarioInput!) {
  reasignarUsuario(usuarios: $usuarios) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReasignarUsuarioGQL extends Apollo.Mutation<ReasignarUsuarioMutation, ReasignarUsuarioMutationVariables> {
    document = ReasignarUsuarioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocsFechasDocument = gql`
    query docsFechas($usuario: ID!, $enviadoPor: ID!, $fechaInicial: Int, $fechaFinal: Int, $esEnviadoPor: Boolean!) {
  docsFechas(
    usuario: $usuario
    enviadoPor: $enviadoPor
    fechaInicial: $fechaInicial
    fechaFinal: $fechaFinal
    esEnviadoPor: $esEnviadoPor
  ) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DocsFechasGQL extends Apollo.Query<DocsFechasQuery, DocsFechasQueryVariables> {
    document = DocsFechasDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocsBusquedaGralDocument = gql`
    query docsBusquedaGral($usuario: ID!, $consulta: String!, $enviadoPor: ID!, $esEnviadoPor: Boolean!) {
  docsBusquedaGral(
    usuario: $usuario
    consulta: $consulta
    enviadoPor: $enviadoPor
    esEnviadoPor: $esEnviadoPor
  ) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DocsBusquedaGralGQL extends Apollo.Query<DocsBusquedaGralQuery, DocsBusquedaGralQueryVariables> {
    document = DocsBusquedaGralDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocsRefDocument = gql`
    query docsRef($_id: ID!, $usuario: ID!) {
  docsRef(_id: $_id, usuario: $usuario) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DocsRefGQL extends Apollo.Query<DocsRefQuery, DocsRefQueryVariables> {
    document = DocsRefDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DocRefFolioDocument = gql`
    mutation docRefFolio($entradas: DocRefFolioInput!) {
  docRefFolio(entradas: $entradas) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
    }
    resolverEmpleadoFolio {
      nombreCompleto
    }
    resolveEmpleadoEnviado {
      nombreCompleto
      avatar
    }
  }
}
    ${FragDocFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DocRefFolioGQL extends Apollo.Mutation<DocRefFolioMutation, DocRefFolioMutationVariables> {
    document = DocRefFolioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NotificacionesDocument = gql`
    query notificaciones($idUsuario: String!) {
  notificaciones(idUsuario: $idUsuario) {
    ...fragNotificacion
  }
}
    ${FragNotificacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class NotificacionesGQL extends Apollo.Query<NotificacionesQuery, NotificacionesQueryVariables> {
    document = NotificacionesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const NotificarDocument = gql`
    subscription notificar($idUsuario: String!) {
  notificar(idUsuario: $idUsuario) {
    ...fragNotificacion
  }
}
    ${FragNotificacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class NotificarGQL extends Apollo.Subscription<NotificarSubscription, NotificarSubscriptionVariables> {
    document = NotificarDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EliminarNotDocument = gql`
    mutation eliminarNot($_id: String!) {
  eliminarNot(_id: $_id) {
    ...fragNotificacion
  }
}
    ${FragNotificacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class EliminarNotGQL extends Apollo.Mutation<EliminarNotMutation, EliminarNotMutationVariables> {
    document = EliminarNotDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EliminarTodosDocument = gql`
    mutation eliminarTodos($idUsuario: String!) {
  eliminarTodos(idUsuario: $idUsuario)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EliminarTodosGQL extends Apollo.Mutation<EliminarTodosMutation, EliminarTodosMutationVariables> {
    document = EliminarTodosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DepartamentosDocument = gql`
    query Departamentos {
  deptos {
    ...fragDeptos
  }
}
    ${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class DepartamentosGQL extends Apollo.Query<DepartamentosQuery, DepartamentosQueryVariables> {
    document = DepartamentosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FiltrarDeptosDocument = gql`
    query filtrarDeptos($nombre: String!) {
  filtrarDeptos(nombre: $nombre) {
    ...fragDeptos
  }
}
    ${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class FiltrarDeptosGQL extends Apollo.Query<FiltrarDeptosQuery, FiltrarDeptosQueryVariables> {
    document = FiltrarDeptosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CrearDeptoDocument = gql`
    mutation crearDepto($input: DeptoInput!) {
  crearDepto(input: $input) {
    ...fragDeptos
  }
}
    ${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CrearDeptoGQL extends Apollo.Mutation<CrearDeptoMutation, CrearDeptoMutationVariables> {
    document = CrearDeptoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActualizarDeptoDocument = gql`
    mutation actualizarDepto($input: DeptoInput!) {
  actualizarDepto(input: $input) {
    ...fragDeptos
  }
}
    ${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActualizarDeptoGQL extends Apollo.Mutation<ActualizarDeptoMutation, ActualizarDeptoMutationVariables> {
    document = ActualizarDeptoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AgregarPuestoDocument = gql`
    mutation agregarPuesto($puesto: PuestoDeptoInput!) {
  agregarPuesto(puesto: $puesto) {
    ...fragDeptos
  }
}
    ${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AgregarPuestoGQL extends Apollo.Mutation<AgregarPuestoMutation, AgregarPuestoMutationVariables> {
    document = AgregarPuestoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EmpleadosDocument = gql`
    query empleados {
  empleados {
    ...fragEmpleado
    auth {
      ...fragAuth
    }
    deptoEmpleado {
      ...fragDeptos
    }
    telefono {
      ...fragTelefono
    }
    modificadoPor {
      ...fragModificadoPor
    }
  }
}
    ${FragEmpleadoFragmentDoc}
${FragAuthFragmentDoc}
${FragDeptosFragmentDoc}
${FragTelefonoFragmentDoc}
${FragModificadoPorFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class EmpleadosGQL extends Apollo.Query<EmpleadosQuery, EmpleadosQueryVariables> {
    document = EmpleadosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EmpleadosSesionDocument = gql`
    query empleadosSesion {
  empleadosSesion {
    ...fragEmpleado
    auth {
      ...fragAuth
    }
    deptoEmpleado {
      ...fragDeptos
    }
  }
}
    ${FragEmpleadoFragmentDoc}
${FragAuthFragmentDoc}
${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class EmpleadosSesionGQL extends Apollo.Query<EmpleadosSesionQuery, EmpleadosSesionQueryVariables> {
    document = EmpleadosSesionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CrearActEmpledoDocument = gql`
    mutation crearActEmpledo($empleadoDatos: RegEmpleadoInput!) {
  crearActEmpledo(empleadoDatos: $empleadoDatos) {
    ...fragEmpleado
    telefono {
      ...fragTelefono
    }
    deptoEmpleado {
      ...fragDeptos
    }
  }
}
    ${FragEmpleadoFragmentDoc}
${FragTelefonoFragmentDoc}
${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CrearActEmpledoGQL extends Apollo.Mutation<CrearActEmpledoMutation, CrearActEmpledoMutationVariables> {
    document = CrearActEmpledoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FilTodosDocument = gql`
    query filTodos {
  filTodos {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class FilTodosGQL extends Apollo.Query<FilTodosQuery, FilTodosQueryVariables> {
    document = FilTodosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InicializarPlaneacionDocument = gql`
    mutation inicializarPlaneacion($input: PlaneacionInput!) {
  inicializarPlaneacion(input: $input) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class InicializarPlaneacionGQL extends Apollo.Mutation<InicializarPlaneacionMutation, InicializarPlaneacionMutationVariables> {
    document = InicializarPlaneacionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegMirDocument = gql`
    mutation regMir($datos: RegMirInput!) {
  regMir(datos: $datos) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegMirGQL extends Apollo.Mutation<RegMirMutation, RegMirMutationVariables> {
    document = RegMirDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegPbrDocument = gql`
    mutation regPbr($datos: RegPbrInput!) {
  regPbr(datos: $datos) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegPbrGQL extends Apollo.Mutation<RegPbrMutation, RegPbrMutationVariables> {
    document = RegPbrDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActualizarResponsableDocument = gql`
    mutation actualizarResponsable($_id: ID!, $idEmpleado: ID!, $correo: String, $responsable: String!, $idEmpleadoAnterior: ID!, $cuestionario: String!) {
  actualizarResponsable(
    _id: $_id
    idEmpleado: $idEmpleado
    correo: $correo
    responsable: $responsable
    idEmpleadoAnterior: $idEmpleadoAnterior
    cuestionario: $cuestionario
  ) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActualizarResponsableGQL extends Apollo.Mutation<ActualizarResponsableMutation, ActualizarResponsableMutationVariables> {
    document = ActualizarResponsableDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EliminarElementoDocument = gql`
    mutation eliminarElemento($_id: ID!, $idIndicador: String!, $cuestionario: String!) {
  eliminarElemento(
    _id: $_id
    idIndicador: $idIndicador
    cuestionario: $cuestionario
  ) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class EliminarElementoGQL extends Apollo.Mutation<EliminarElementoMutation, EliminarElementoMutationVariables> {
    document = EliminarElementoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegAvancePbrDocument = gql`
    mutation regAvancePbr($datos: RegAvancesPbrInput!) {
  regAvancePbr(datos: $datos) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegAvancePbrGQL extends Apollo.Mutation<RegAvancePbrMutation, RegAvancePbrMutationVariables> {
    document = RegAvancePbrDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SumatoriaPbrDocument = gql`
    mutation sumatoriaPbr($datos: SumPbrInput!, $actualizar: Boolean!) {
  sumatoriaPbr(datos: $datos, actualizar: $actualizar) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SumatoriaPbrGQL extends Apollo.Mutation<SumatoriaPbrMutation, SumatoriaPbrMutationVariables> {
    document = SumatoriaPbrDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RecalcularPbrDocument = gql`
    mutation recalcularPbr($args: RecalcularPbrInput!) {
  recalcularPbr(args: $args) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RecalcularPbrGQL extends Apollo.Mutation<RecalcularPbrMutation, RecalcularPbrMutationVariables> {
    document = RecalcularPbrDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegComponenteDocument = gql`
    mutation regComponente($datos: RegComponenteInput!) {
  regComponente(datos: $datos) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegComponenteGQL extends Apollo.Mutation<RegComponenteMutation, RegComponenteMutationVariables> {
    document = RegComponenteDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReemplazarCompDocument = gql`
    mutation reemplazarComp($_id: ID!, $idIndicador: String!) {
  reemplazarComp(_id: $_id, idIndicador: $idIndicador) {
    ...fragPlaneacion
  }
}
    ${FragPlaneacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReemplazarCompGQL extends Apollo.Mutation<ReemplazarCompMutation, ReemplazarCompMutationVariables> {
    document = ReemplazarCompDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegSeleccionDocument = gql`
    mutation regSeleccion($input: SeleccionInput) {
  regSeleccion(input: $input) {
    ...fragSeleccion
  }
}
    ${FragSeleccionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegSeleccionGQL extends Apollo.Mutation<RegSeleccionMutation, RegSeleccionMutationVariables> {
    document = RegSeleccionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SeleccionesDocument = gql`
    query selecciones {
  selecciones {
    ...fragSeleccion
  }
}
    ${FragSeleccionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SeleccionesGQL extends Apollo.Query<SeleccionesQuery, SeleccionesQueryVariables> {
    document = SeleccionesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InstalacionesDocument = gql`
    query instalaciones {
  instalaciones {
    _id
    instalacion {
      ...fragInstalacion
    }
    bombas {
      ...fragBomba
    }
    motores {
      ...fragMotor
    }
    medidores {
      ...fragMedidores
    }
  }
}
    ${FragInstalacionFragmentDoc}
${FragBombaFragmentDoc}
${FragMotorFragmentDoc}
${FragMedidoresFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class InstalacionesGQL extends Apollo.Query<InstalacionesQuery, InstalacionesQueryVariables> {
    document = InstalacionesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegInstalacionDocument = gql`
    mutation regInstalacion($datos: RegInstalacionInput!) {
  regInstalacion(datos: $datos) {
    ... on TelemetriaType {
      _id
      instalacion {
        ...fragInstalacion
      }
      medidores {
        ...fragMedidores
      }
      bombas {
        ...fragBomba
      }
      motores {
        ...fragMotor
      }
    }
    ... on ErroresType {
      ...fragErrores
    }
  }
}
    ${FragInstalacionFragmentDoc}
${FragMedidoresFragmentDoc}
${FragBombaFragmentDoc}
${FragMotorFragmentDoc}
${FragErroresFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class RegInstalacionGQL extends Apollo.Mutation<RegInstalacionMutation, RegInstalacionMutationVariables> {
    document = RegInstalacionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActInstDocument = gql`
    mutation actInst($args: ActInstInput!) {
  actInst(args: $args) {
    _id
    instalacion {
      ...fragInstalacion
    }
    medidores {
      ...fragMedidores
    }
    bombas {
      ...fragBomba
    }
    motores {
      ...fragMotor
    }
  }
}
    ${FragInstalacionFragmentDoc}
${FragMedidoresFragmentDoc}
${FragBombaFragmentDoc}
${FragMotorFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActInstGQL extends Apollo.Mutation<ActInstMutation, ActInstMutationVariables> {
    document = ActInstDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AgregarMotorDocument = gql`
    mutation agregarMotor($args: AgregarMotorInput!) {
  agregarMotor(args: $args) {
    _id
    instalacion {
      ...fragInstalacion
    }
    medidores {
      ...fragMedidores
    }
    motores {
      ...fragMotor
    }
    bombas {
      ...fragBomba
    }
  }
}
    ${FragInstalacionFragmentDoc}
${FragMedidoresFragmentDoc}
${FragMotorFragmentDoc}
${FragBombaFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AgregarMotorGQL extends Apollo.Mutation<AgregarMotorMutation, AgregarMotorMutationVariables> {
    document = AgregarMotorDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AgregarBombaDocument = gql`
    mutation agregarBomba($args: AgregarBombaInput!) {
  agregarBomba(args: $args) {
    _id
    instalacion {
      ...fragInstalacion
    }
    medidores {
      ...fragMedidores
    }
    motores {
      ...fragMotor
    }
    bombas {
      ...fragBomba
    }
  }
}
    ${FragInstalacionFragmentDoc}
${FragMedidoresFragmentDoc}
${FragMotorFragmentDoc}
${FragBombaFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AgregarBombaGQL extends Apollo.Mutation<AgregarBombaMutation, AgregarBombaMutationVariables> {
    document = AgregarBombaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CrearRegLecturaDocument = gql`
    mutation crearRegLectura($args: TomarMedicionInput!) {
  crearRegLectura(args: $args) {
    ... on TelemetriaType {
      _id
      instalacion {
        ...fragInstalacion
      }
      medidores {
        ...fragMedidores
      }
      motores {
        ...fragMotor
      }
      bombas {
        ...fragBomba
      }
    }
    ... on ErroresType {
      ...fragErrores
    }
  }
}
    ${FragInstalacionFragmentDoc}
${FragMedidoresFragmentDoc}
${FragMotorFragmentDoc}
${FragBombaFragmentDoc}
${FragErroresFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CrearRegLecturaGQL extends Apollo.Mutation<CrearRegLecturaMutation, CrearRegLecturaMutationVariables> {
    document = CrearRegLecturaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ActLecturaDocument = gql`
    mutation actLectura($args: TomarMedicionInput!) {
  actLectura(args: $args) {
    _id
    instalacion {
      ...fragInstalacion
    }
    medidores {
      ...fragMedidores
    }
    motores {
      ...fragMotor
    }
    bombas {
      ...fragBomba
    }
  }
}
    ${FragInstalacionFragmentDoc}
${FragMedidoresFragmentDoc}
${FragMotorFragmentDoc}
${FragBombaFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ActLecturaGQL extends Apollo.Mutation<ActLecturaMutation, ActLecturaMutationVariables> {
    document = ActLecturaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }