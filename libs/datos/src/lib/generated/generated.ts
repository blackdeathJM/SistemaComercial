import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ActInstInput = {
  _id?: InputMaybe<Scalars['ID']>;
  instalacion?: InputMaybe<InstalacionInput>;
};

export type ActRolesInput = {
  _id?: InputMaybe<Scalars['ID']>;
  acceso?: InputMaybe<Scalars['Boolean']>;
  accesoCtrl?: InputMaybe<Scalars['Boolean']>;
  idCtrl?: InputMaybe<Scalars['String']>;
  idRutaCuarta?: InputMaybe<Scalars['String']>;
  idRutaPrincipal?: InputMaybe<Scalars['String']>;
  idRutaSecundaria?: InputMaybe<Scalars['String']>;
  idRutaTreciaria?: InputMaybe<Scalars['String']>;
  puedeAsigPermisos?: InputMaybe<Scalars['Boolean']>;
};

export type AgregarBombaInput = {
  _id?: InputMaybe<Scalars['ID']>;
  bomba?: InputMaybe<BombaInput>;
};

export type AgregarMotorInput = {
  _id?: InputMaybe<Scalars['ID']>;
  motor?: InputMaybe<MotorInput>;
};

export type AuthInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  asigPermisos?: InputMaybe<Array<Scalars['String']>>;
  contrasena?: InputMaybe<Scalars['String']>;
  controles?: InputMaybe<Array<Scalars['String']>>;
  estatus?: InputMaybe<Scalars['String']>;
  guards?: InputMaybe<Array<Scalars['String']>>;
  roles?: InputMaybe<Array<Scalars['JSONObject']>>;
  usuario?: InputMaybe<Scalars['String']>;
};

export type AuthType = {
  __typename?: 'AuthType';
  activo?: Maybe<Scalars['Boolean']>;
  asigPermisos?: Maybe<Array<Scalars['String']>>;
  contrasena?: Maybe<Scalars['String']>;
  controles?: Maybe<Array<Scalars['String']>>;
  estatus?: Maybe<Scalars['String']>;
  guards?: Maybe<Array<Scalars['String']>>;
  roles?: Maybe<Array<Scalars['JSONObject']>>;
  usuario?: Maybe<Scalars['String']>;
};

export type BombaInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  descripcion?: InputMaybe<Scalars['String']>;
  diametro?: InputMaybe<Scalars['Float']>;
  eficiencia?: InputMaybe<Scalars['Float']>;
  evidenciaInst?: InputMaybe<Array<Scalars['String']>>;
  evidenciaRetiro?: InputMaybe<Array<Scalars['String']>>;
  fechaInstalacion?: InputMaybe<Scalars['DateTime']>;
  fechaRetiro?: InputMaybe<Scalars['DateTime']>;
  lts?: InputMaybe<Scalars['Float']>;
  marca?: InputMaybe<Scalars['String']>;
  modelo?: InputMaybe<Scalars['String']>;
  motivoRet?: InputMaybe<Scalars['String']>;
  noImpulsores?: InputMaybe<Scalars['Int']>;
  noSerie?: InputMaybe<Scalars['String']>;
  observaciones?: InputMaybe<Scalars['String']>;
  rpm?: InputMaybe<Scalars['Int']>;
};

export type BombaType = {
  __typename?: 'BombaType';
  activo?: Maybe<Scalars['Boolean']>;
  descripcion?: Maybe<Scalars['String']>;
  diametro?: Maybe<Scalars['Float']>;
  eficiencia?: Maybe<Scalars['Float']>;
  evidenciaInst?: Maybe<Array<Scalars['String']>>;
  evidenciaRetiro?: Maybe<Array<Scalars['String']>>;
  fechaInstalacion?: Maybe<Scalars['DateTime']>;
  fechaRetiro?: Maybe<Scalars['DateTime']>;
  lts?: Maybe<Scalars['Float']>;
  marca?: Maybe<Scalars['String']>;
  modelo?: Maybe<Scalars['String']>;
  motivoRet?: Maybe<Scalars['String']>;
  noImpulsores?: Maybe<Scalars['Int']>;
  noSerie?: Maybe<Scalars['String']>;
  observaciones?: Maybe<Scalars['String']>;
  rpm?: Maybe<Scalars['Int']>;
};

export type CambioContrasenaInput = {
  _id?: InputMaybe<Scalars['ID']>;
  contrasena?: InputMaybe<Scalars['String']>;
};

export type CrearRolInput = {
  idEmpleado?: InputMaybe<Scalars['ID']>;
  roles?: InputMaybe<Array<Scalars['JSONObject']>>;
};

export type DatosSesionType = {
  __typename?: 'DatosSesionType';
  _id: Scalars['ID'];
  activo: Scalars['Boolean'];
  auth: AuthType;
  avatar?: Maybe<Scalars['String']>;
  deptoId?: Maybe<Scalars['ID']>;
  nombreCompleto: Scalars['String'];
};

export type DeptoInput = {
  _id?: InputMaybe<Scalars['ID']>;
  centroGestor?: InputMaybe<Scalars['String']>;
  nombre?: InputMaybe<Scalars['String']>;
  puestos?: InputMaybe<Array<Scalars['String']>>;
};

export type DeptoType = {
  __typename?: 'DeptoType';
  _id?: Maybe<Scalars['ID']>;
  centroGestor?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  puestos?: Maybe<Array<Scalars['String']>>;
};

export type DocActFolioInput = {
  _id?: InputMaybe<Scalars['ID']>;
  deptoId?: InputMaybe<Scalars['String']>;
  tipoDoc?: InputMaybe<Scalars['String']>;
  usuarioFolio?: InputMaybe<Scalars['String']>;
};

export type DocFolioInput = {
  deptoId?: InputMaybe<Scalars['ID']>;
  tipoDoc?: InputMaybe<Scalars['String']>;
};

export type DocReasignarUsuarioInput = {
  _id?: InputMaybe<Scalars['ID']>;
  usuarios?: InputMaybe<Array<Scalars['String']>>;
};

export type DocRefFolioInput = {
  _id?: InputMaybe<Scalars['ID']>;
  folio?: InputMaybe<Scalars['String']>;
  ref?: InputMaybe<Array<Scalars['String']>>;
  usuarioFolio?: InputMaybe<Scalars['String']>;
};

export type DocRegInput = {
  acuseUrl?: InputMaybe<Scalars['String']>;
  ano?: InputMaybe<Scalars['Int']>;
  asunto?: InputMaybe<Scalars['String']>;
  comentario?: InputMaybe<Scalars['String']>;
  dependencia?: InputMaybe<Scalars['String']>;
  docUrl?: InputMaybe<Scalars['String']>;
  enviadoPor?: InputMaybe<Scalars['String']>;
  esInterno?: InputMaybe<Scalars['Boolean']>;
  esRef?: InputMaybe<Scalars['Boolean']>;
  fechaLimiteEntrega?: InputMaybe<Scalars['Int']>;
  fechaRecepcion?: InputMaybe<Scalars['Int']>;
  fechaTerminado?: InputMaybe<Scalars['Int']>;
  folio?: InputMaybe<Scalars['String']>;
  identificadorDoc?: InputMaybe<Scalars['String']>;
  proceso?: InputMaybe<Scalars['String']>;
  seguimiento: Scalars['String'];
  tipoDoc?: InputMaybe<Scalars['String']>;
  usuarioFolio?: InputMaybe<Scalars['String']>;
  usuarios?: InputMaybe<Array<Scalars['String']>>;
};

export type DocsSubirInput = {
  _id?: InputMaybe<Scalars['ID']>;
  acuseUrl?: InputMaybe<Scalars['String']>;
  docUrl?: InputMaybe<Scalars['String']>;
};

export type DocumentoInput = {
  _id?: InputMaybe<Scalars['ID']>;
  acuseUrl?: InputMaybe<Scalars['String']>;
  ano?: InputMaybe<Scalars['Int']>;
  asunto?: InputMaybe<Scalars['String']>;
  comentario?: InputMaybe<Scalars['String']>;
  dependencia?: InputMaybe<Scalars['String']>;
  docUrl?: InputMaybe<Scalars['String']>;
  enviadoPor?: InputMaybe<Scalars['String']>;
  esInterno?: InputMaybe<Scalars['Boolean']>;
  esRef?: InputMaybe<Scalars['Boolean']>;
  fechaLimiteEntrega?: InputMaybe<Scalars['Int']>;
  fechaRecepcion?: InputMaybe<Scalars['Int']>;
  fechaTerminado?: InputMaybe<Scalars['Int']>;
  folio?: InputMaybe<Scalars['String']>;
  identificadorDoc?: InputMaybe<Scalars['String']>;
  proceso?: InputMaybe<Scalars['String']>;
  ref?: InputMaybe<Array<Scalars['String']>>;
  seguimiento: Scalars['String'];
  tipoDoc?: InputMaybe<Scalars['String']>;
  usuarioFolio?: InputMaybe<Scalars['String']>;
  usuarios?: InputMaybe<Array<Scalars['String']>>;
};

export type DocumentoType = {
  __typename?: 'DocumentoType';
  _id?: Maybe<Scalars['ID']>;
  acuseUrl?: Maybe<Scalars['String']>;
  ano?: Maybe<Scalars['Int']>;
  asunto?: Maybe<Scalars['String']>;
  comentario?: Maybe<Scalars['String']>;
  dependencia?: Maybe<Scalars['String']>;
  docUrl?: Maybe<Scalars['String']>;
  enviadoPor?: Maybe<Scalars['String']>;
  esInterno?: Maybe<Scalars['Boolean']>;
  esRef?: Maybe<Scalars['Boolean']>;
  fechaLimiteEntrega?: Maybe<Scalars['Int']>;
  fechaRecepcion?: Maybe<Scalars['Int']>;
  fechaTerminado?: Maybe<Scalars['Int']>;
  folio?: Maybe<Scalars['String']>;
  identificadorDoc?: Maybe<Scalars['String']>;
  proceso?: Maybe<Scalars['String']>;
  ref?: Maybe<Array<Scalars['String']>>;
  resolveEmpleado?: Maybe<EmpleadoType>;
  resolveEmpleadoEnviado?: Maybe<Array<EmpleadoType>>;
  resolverEmpleadoFolio?: Maybe<EmpleadoType>;
  seguimiento: Scalars['String'];
  tipoDoc?: Maybe<Scalars['String']>;
  usuarioFolio?: Maybe<Scalars['String']>;
  usuarios?: Maybe<Array<Scalars['String']>>;
};

export type EmpleadoInput = {
  _id?: InputMaybe<Scalars['ID']>;
  activo?: InputMaybe<Scalars['Boolean']>;
  auth?: InputMaybe<AuthInput>;
  avatar?: InputMaybe<Scalars['String']>;
  calle?: InputMaybe<Scalars['String']>;
  colonia?: InputMaybe<Scalars['String']>;
  correo?: InputMaybe<Scalars['String']>;
  deptoId?: InputMaybe<Scalars['ID']>;
  fechaBaja?: InputMaybe<Scalars['Int']>;
  fechaIngreso?: InputMaybe<Scalars['Int']>;
  modificadoPor?: InputMaybe<Array<ModificadoPorInput>>;
  nombreCompleto?: InputMaybe<Scalars['String']>;
  planeacionCentroGestor?: InputMaybe<Scalars['String']>;
  puesto?: InputMaybe<Array<PuestoInput>>;
  telefono?: InputMaybe<Array<TelefonoInput>>;
};

export type EmpleadoType = {
  __typename?: 'EmpleadoType';
  _id?: Maybe<Scalars['ID']>;
  activo?: Maybe<Scalars['Boolean']>;
  auth?: Maybe<AuthType>;
  avatar?: Maybe<Scalars['String']>;
  calle?: Maybe<Scalars['String']>;
  colonia?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  deptoEmpleado?: Maybe<DeptoType>;
  deptoId?: Maybe<Scalars['ID']>;
  fechaBaja?: Maybe<Scalars['Int']>;
  fechaIngreso?: Maybe<Scalars['Int']>;
  modificadoPor?: Maybe<Array<ModificadoPorType>>;
  nombreCompleto?: Maybe<Scalars['String']>;
  planeacionCentroGestor?: Maybe<Scalars['String']>;
  puesto?: Maybe<Array<PuestoType>>;
  telefono?: Maybe<Array<TelefonoType>>;
};

export type ErroresType = {
  __typename?: 'ErroresType';
  error?: Maybe<Scalars['String']>;
  exito?: Maybe<Scalars['Boolean']>;
};

export type InstalacionInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  diamAdeme?: InputMaybe<Scalars['Float']>;
  diamCol?: InputMaybe<Scalars['Float']>;
  diamPerforacion?: InputMaybe<Scalars['Float']>;
  direccion?: InputMaybe<Scalars['String']>;
  longCol?: InputMaybe<Scalars['Float']>;
  nivelDinamico?: InputMaybe<Array<MedicionInput>>;
  nivelEstatico?: InputMaybe<Array<MedicionInput>>;
  nombre?: InputMaybe<Scalars['String']>;
  profPozo?: InputMaybe<Scalars['Float']>;
  tipoInstalacion?: InputMaybe<Scalars['String']>;
};

export type InstalacionType = {
  __typename?: 'InstalacionType';
  activo?: Maybe<Scalars['Boolean']>;
  diamAdeme?: Maybe<Scalars['Float']>;
  diamCol?: Maybe<Scalars['Float']>;
  diamPerforacion?: Maybe<Scalars['Float']>;
  direccion?: Maybe<Scalars['String']>;
  longCol?: Maybe<Scalars['Float']>;
  nivelDinamico?: Maybe<Array<MedicionType>>;
  nivelEstatico?: Maybe<Array<MedicionType>>;
  nombre?: Maybe<Scalars['String']>;
  profPozo?: Maybe<Scalars['Float']>;
  tipoInstalacion?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  contrasena?: InputMaybe<Scalars['String']>;
  usuario?: InputMaybe<Scalars['String']>;
};

export type LoginRespuestaType = {
  __typename?: 'LoginRespuestaType';
  datosSesion: DatosSesionType;
  token: Scalars['String'];
};

export type MedicionInput = {
  abril?: InputMaybe<Scalars['Float']>;
  agosto?: InputMaybe<Scalars['Float']>;
  ano?: InputMaybe<Scalars['Int']>;
  diciembre?: InputMaybe<Scalars['Float']>;
  enero?: InputMaybe<Scalars['Float']>;
  febrero?: InputMaybe<Scalars['Float']>;
  julio?: InputMaybe<Scalars['Float']>;
  junio?: InputMaybe<Scalars['Float']>;
  marzo?: InputMaybe<Scalars['Float']>;
  mayo?: InputMaybe<Scalars['Float']>;
  noviembre?: InputMaybe<Scalars['Float']>;
  octubre?: InputMaybe<Scalars['Float']>;
  septiembre?: InputMaybe<Scalars['Float']>;
};

export type MedicionType = {
  __typename?: 'MedicionType';
  abril?: Maybe<Scalars['Float']>;
  agosto?: Maybe<Scalars['Float']>;
  ano?: Maybe<Scalars['Int']>;
  diciembre?: Maybe<Scalars['Float']>;
  enero?: Maybe<Scalars['Float']>;
  febrero?: Maybe<Scalars['Float']>;
  julio?: Maybe<Scalars['Float']>;
  junio?: Maybe<Scalars['Float']>;
  marzo?: Maybe<Scalars['Float']>;
  mayo?: Maybe<Scalars['Float']>;
  noviembre?: Maybe<Scalars['Float']>;
  octubre?: Maybe<Scalars['Float']>;
  septiembre?: Maybe<Scalars['Float']>;
};

export type MedidorInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  fechaInstalacion?: InputMaybe<Scalars['Date']>;
  fechaRetiro?: InputMaybe<Scalars['Date']>;
  medidor?: InputMaybe<Scalars['String']>;
  reciboCfe?: InputMaybe<Array<RecibosInput>>;
  servicio?: InputMaybe<Scalars['String']>;
};

export type MedidorType = {
  __typename?: 'MedidorType';
  activo?: Maybe<Scalars['Boolean']>;
  fechaInstalacion?: Maybe<Scalars['Date']>;
  fechaRetiro?: Maybe<Scalars['Date']>;
  medidor?: Maybe<Scalars['String']>;
  reciboCfe?: Maybe<Array<RecibosType>>;
  servicio?: Maybe<Scalars['String']>;
};

export type MirCuestionarioInput = {
  avanceAnual?: InputMaybe<Scalars['Float']>;
  avanceTrim1?: InputMaybe<Scalars['Float']>;
  avanceTrim2?: InputMaybe<Scalars['Float']>;
  avanceTrim3?: InputMaybe<Scalars['Float']>;
  avanceTrim4?: InputMaybe<Scalars['Float']>;
  centroGestor?: InputMaybe<Scalars['String']>;
  correo?: InputMaybe<Scalars['String']>;
  dimension?: InputMaybe<Scalars['String']>;
  formulaAnual?: InputMaybe<Scalars['String']>;
  formulaTrim1?: InputMaybe<Scalars['String']>;
  formulaTrim2?: InputMaybe<Scalars['String']>;
  formulaTrim3?: InputMaybe<Scalars['String']>;
  formulaTrim4?: InputMaybe<Scalars['String']>;
  frecuenciaMedicion?: InputMaybe<Scalars['String']>;
  idEmpleado?: InputMaybe<Scalars['String']>;
  idIndicador?: InputMaybe<Scalars['String']>;
  lineaBaseAno?: InputMaybe<Scalars['Int']>;
  lineaBaseValor?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['Float']>;
  metodoCalculo?: InputMaybe<Scalars['String']>;
  nivel?: InputMaybe<Scalars['String']>;
  nombreDelIndicador?: InputMaybe<Scalars['String']>;
  programaFinanciacion?: InputMaybe<Scalars['String']>;
  responsable?: InputMaybe<Scalars['String']>;
  resumenNarrativo?: InputMaybe<Scalars['String']>;
  semefAmarillo?: InputMaybe<Scalars['Float']>;
  semefAmarilloV?: InputMaybe<Scalars['Float']>;
  semefRojo?: InputMaybe<Scalars['Float']>;
  semefRojoV?: InputMaybe<Scalars['Float']>;
  semefVerde?: InputMaybe<Scalars['Float']>;
  semefVerdeV?: InputMaybe<Scalars['Float']>;
  sentidoDelIndicador?: InputMaybe<Scalars['String']>;
  tipo?: InputMaybe<Scalars['String']>;
  unidadDeMedida?: InputMaybe<Scalars['String']>;
};

export type MirCuestionarioType = {
  __typename?: 'MirCuestionarioType';
  avanceAnual?: Maybe<Scalars['Float']>;
  avanceTrim1?: Maybe<Scalars['Float']>;
  avanceTrim2?: Maybe<Scalars['Float']>;
  avanceTrim3?: Maybe<Scalars['Float']>;
  avanceTrim4?: Maybe<Scalars['Float']>;
  centroGestor?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
  formulaAnual?: Maybe<Scalars['String']>;
  formulaTrim1?: Maybe<Scalars['String']>;
  formulaTrim2?: Maybe<Scalars['String']>;
  formulaTrim3?: Maybe<Scalars['String']>;
  formulaTrim4?: Maybe<Scalars['String']>;
  frecuenciaMedicion?: Maybe<Scalars['String']>;
  idEmpleado?: Maybe<Scalars['String']>;
  idIndicador?: Maybe<Scalars['String']>;
  lineaBaseAno?: Maybe<Scalars['Int']>;
  lineaBaseValor?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['Float']>;
  metodoCalculo?: Maybe<Scalars['String']>;
  nivel?: Maybe<Scalars['String']>;
  nombreDelIndicador?: Maybe<Scalars['String']>;
  programaFinanciacion?: Maybe<Scalars['String']>;
  responsable?: Maybe<Scalars['String']>;
  resumenNarrativo?: Maybe<Scalars['String']>;
  semefAmarillo?: Maybe<Scalars['Float']>;
  semefAmarilloV?: Maybe<Scalars['Float']>;
  semefRojo?: Maybe<Scalars['Float']>;
  semefRojoV?: Maybe<Scalars['Float']>;
  semefVerde?: Maybe<Scalars['Float']>;
  semefVerdeV?: Maybe<Scalars['Float']>;
  sentidoDelIndicador?: Maybe<Scalars['String']>;
  tipo?: Maybe<Scalars['String']>;
  unidadDeMedida?: Maybe<Scalars['String']>;
};

export type ModificadoPorInput = {
  accion?: InputMaybe<Scalars['String']>;
  fecha?: InputMaybe<Scalars['Int']>;
  usuario?: InputMaybe<Scalars['String']>;
  valorActual?: InputMaybe<Array<Scalars['JSON']>>;
  valorAnterior?: InputMaybe<Array<Scalars['JSON']>>;
};

export type ModificadoPorType = {
  __typename?: 'ModificadoPorType';
  accion?: Maybe<Scalars['String']>;
  fecha?: Maybe<Scalars['Int']>;
  usuario?: Maybe<Scalars['String']>;
  valorActual?: Maybe<Array<Scalars['JSON']>>;
  valorAnterior?: Maybe<Array<Scalars['JSON']>>;
};

export type MotorInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  amperaje?: InputMaybe<Scalars['Float']>;
  descripcion?: InputMaybe<Scalars['String']>;
  eficiencia?: InputMaybe<Scalars['Float']>;
  evidenciaInst?: InputMaybe<Array<Scalars['String']>>;
  evidenciaRetiro?: InputMaybe<Array<Scalars['String']>>;
  factPotencia?: InputMaybe<Scalars['Float']>;
  fechaInstalacion?: InputMaybe<Scalars['DateTime']>;
  fechaRetiro?: InputMaybe<Scalars['DateTime']>;
  hp?: InputMaybe<Scalars['Float']>;
  marca?: InputMaybe<Scalars['String']>;
  modelo?: InputMaybe<Scalars['String']>;
  motivoRet?: InputMaybe<Scalars['String']>;
  noSerie?: InputMaybe<Scalars['String']>;
  observaciones?: InputMaybe<Scalars['String']>;
  voltaje?: InputMaybe<Scalars['Float']>;
};

export type MotorType = {
  __typename?: 'MotorType';
  activo?: Maybe<Scalars['Boolean']>;
  amperaje?: Maybe<Scalars['Float']>;
  descripcion?: Maybe<Scalars['String']>;
  eficiencia?: Maybe<Scalars['Float']>;
  evidenciaInst?: Maybe<Array<Scalars['String']>>;
  evidenciaRetiro?: Maybe<Array<Scalars['String']>>;
  factPotencia?: Maybe<Scalars['Float']>;
  fechaInstalacion?: Maybe<Scalars['DateTime']>;
  fechaRetiro?: Maybe<Scalars['DateTime']>;
  hp?: Maybe<Scalars['Float']>;
  marca?: Maybe<Scalars['String']>;
  modelo?: Maybe<Scalars['String']>;
  motivoRet?: Maybe<Scalars['String']>;
  noSerie?: Maybe<Scalars['String']>;
  observaciones?: Maybe<Scalars['String']>;
  voltaje?: Maybe<Scalars['Float']>;
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
  crearDepto: DeptoType;
  crearEmpleado: EmpleadoType;
  crearRegLectura: UnionTele;
  crearRoles?: Maybe<RolesType>;
  docActFolio: DocumentoType;
  docFinalizar: DocumentoType;
  docRefFolio: Array<DocumentoType>;
  eliminarDepto: DeptoType;
  eliminarElemento: PlaneacionType;
  eliminarNot: NotificacionType;
  eliminarTodos: Scalars['Int'];
  genFolioSinReg: Scalars['String'];
  inicializarPlaneacion: PlaneacionType;
  login?: Maybe<LoginRespuestaType>;
  reasignarUsuario: DocumentoType;
  regAvancePbr: PlaneacionType;
  regDoc: DocumentoType;
  regInstalacion: UnionTele;
  regMir: PlaneacionType;
  regPbr: PlaneacionType;
  regSeleccion: SeleccionType;
  registroSesion: EmpleadoType;
  subirDocs: DocumentoType;
  valoresDefecto: Scalars['Boolean'];
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
  _id: Scalars['String'];
  url: Scalars['String'];
};


export type MutationActualizarContrasenaAdminArgs = {
  datos: CambioContrasenaInput;
  modificadoPor: ModificadoPorInput;
};


export type MutationActualizarDeptoArgs = {
  input: DeptoInput;
};


export type MutationActualizarResponsableArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  correo?: InputMaybe<Scalars['String']>;
  cuestionario?: InputMaybe<Scalars['String']>;
  idEmpleado?: InputMaybe<Scalars['ID']>;
  idEmpleadoAnterior?: InputMaybe<Scalars['ID']>;
  responsable?: InputMaybe<Scalars['String']>;
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


export type MutationCrearDeptoArgs = {
  input: DeptoInput;
};


export type MutationCrearEmpleadoArgs = {
  empleadoDatos: RegEmpleadoInput;
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
  _id: Scalars['String'];
};


export type MutationDocRefFolioArgs = {
  entradas: DocRefFolioInput;
};


export type MutationEliminarDeptoArgs = {
  _id: Scalars['String'];
};


export type MutationEliminarElementoArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  cuestionario?: InputMaybe<Scalars['String']>;
  idIndicador?: InputMaybe<Scalars['String']>;
};


export type MutationEliminarNotArgs = {
  _id: Scalars['String'];
};


export type MutationEliminarTodosArgs = {
  idUsuario: Scalars['String'];
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


export type MutationRegAvancePbrArgs = {
  datos: RegAvancesPbrInput;
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
  _id: Scalars['String'];
  auth: AuthInput;
  modificadoPor: ModificadoPorInput;
};


export type MutationSubirDocsArgs = {
  args?: InputMaybe<DocsSubirInput>;
  files?: InputMaybe<UploadInput>;
  filesAcuse?: InputMaybe<UploadInput>;
};

export type NotificacionInput = {
  _id?: InputMaybe<Scalars['ID']>;
  descripcion?: InputMaybe<Scalars['String']>;
  icono?: InputMaybe<Scalars['String']>;
  idUsuario?: InputMaybe<Scalars['ID']>;
  imagen?: InputMaybe<Scalars['String']>;
  leido?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  tiempo?: InputMaybe<Scalars['Int']>;
  titulo?: InputMaybe<Scalars['String']>;
  usarRouter?: InputMaybe<Scalars['Boolean']>;
};

export type NotificacionType = {
  __typename?: 'NotificacionType';
  _id?: Maybe<Scalars['ID']>;
  descripcion?: Maybe<Scalars['String']>;
  icono?: Maybe<Scalars['String']>;
  idUsuario?: Maybe<Scalars['ID']>;
  imagen?: Maybe<Scalars['String']>;
  leido?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  tiempo?: Maybe<Scalars['Int']>;
  titulo?: Maybe<Scalars['String']>;
  usarRouter?: Maybe<Scalars['Boolean']>;
};

export type PbrInput = {
  abril?: InputMaybe<Scalars['Float']>;
  agosto?: InputMaybe<Scalars['Float']>;
  ano?: InputMaybe<Scalars['Int']>;
  centroGestor?: InputMaybe<Scalars['String']>;
  correo?: InputMaybe<Scalars['String']>;
  dato?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  diciembre?: InputMaybe<Scalars['Float']>;
  enero?: InputMaybe<Scalars['Float']>;
  esSumatoriaTotal?: InputMaybe<Scalars['Boolean']>;
  esSumatoriaTrim?: InputMaybe<Scalars['Boolean']>;
  febrero?: InputMaybe<Scalars['Float']>;
  fechaCompleta?: InputMaybe<Scalars['String']>;
  idEmpleado?: InputMaybe<Scalars['ID']>;
  idIndicador?: InputMaybe<Scalars['String']>;
  julio?: InputMaybe<Scalars['Float']>;
  junio?: InputMaybe<Scalars['Float']>;
  marzo?: InputMaybe<Scalars['Float']>;
  mayo?: InputMaybe<Scalars['Float']>;
  noviembre?: InputMaybe<Scalars['Float']>;
  octubre?: InputMaybe<Scalars['Float']>;
  responsable?: InputMaybe<Scalars['String']>;
  septiembre?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
  trim1?: InputMaybe<Scalars['Float']>;
  trim2?: InputMaybe<Scalars['Float']>;
  trim3?: InputMaybe<Scalars['Float']>;
  trim4?: InputMaybe<Scalars['Float']>;
  unidad?: InputMaybe<Scalars['String']>;
  variableOrigen?: InputMaybe<Scalars['String']>;
};

export type PbrType = {
  __typename?: 'PbrType';
  abril?: Maybe<Scalars['Float']>;
  agosto?: Maybe<Scalars['Float']>;
  ano?: Maybe<Scalars['Int']>;
  centroGestor?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  dato?: Maybe<Scalars['String']>;
  descripcion?: Maybe<Scalars['String']>;
  diciembre?: Maybe<Scalars['Float']>;
  enero?: Maybe<Scalars['Float']>;
  esSumatoriaTotal?: Maybe<Scalars['Boolean']>;
  esSumatoriaTrim?: Maybe<Scalars['Boolean']>;
  febrero?: Maybe<Scalars['Float']>;
  fechaCompleta?: Maybe<Scalars['String']>;
  idEmpleado?: Maybe<Scalars['ID']>;
  idIndicador?: Maybe<Scalars['String']>;
  julio?: Maybe<Scalars['Float']>;
  junio?: Maybe<Scalars['Float']>;
  marzo?: Maybe<Scalars['Float']>;
  mayo?: Maybe<Scalars['Float']>;
  noviembre?: Maybe<Scalars['Float']>;
  octubre?: Maybe<Scalars['Float']>;
  responsable?: Maybe<Scalars['String']>;
  septiembre?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  trim1?: Maybe<Scalars['Float']>;
  trim2?: Maybe<Scalars['Float']>;
  trim3?: Maybe<Scalars['Float']>;
  trim4?: Maybe<Scalars['Float']>;
  unidad?: Maybe<Scalars['String']>;
  variableOrigen?: Maybe<Scalars['String']>;
};

export type PlaneacionInput = {
  _id?: InputMaybe<Scalars['ID']>;
  ano?: InputMaybe<Scalars['Int']>;
  copia?: InputMaybe<Scalars['Boolean']>;
  descripcion?: InputMaybe<Scalars['String']>;
  mirCuestionario?: InputMaybe<Array<MirCuestionarioInput>>;
  pbrCuestionario?: InputMaybe<Array<PbrInput>>;
};

export type PlaneacionType = {
  __typename?: 'PlaneacionType';
  _id?: Maybe<Scalars['ID']>;
  ano?: Maybe<Scalars['Int']>;
  copia?: Maybe<Scalars['Boolean']>;
  descripcion?: Maybe<Scalars['String']>;
  mirCuestionario?: Maybe<Array<MirCuestionarioType>>;
  pbrCuestionario?: Maybe<Array<PbrType>>;
};

export type PuestoDeptoInput = {
  _id?: InputMaybe<Scalars['ID']>;
  puesto?: InputMaybe<Scalars['String']>;
};

export type PuestoInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  fechaAsignacion?: InputMaybe<Scalars['Int']>;
  isr?: InputMaybe<Scalars['Float']>;
  puesto?: InputMaybe<Scalars['String']>;
  sueldo?: InputMaybe<Scalars['Float']>;
};

export type PuestoType = {
  __typename?: 'PuestoType';
  activo?: Maybe<Scalars['Boolean']>;
  fechaAsignacion?: Maybe<Scalars['Int']>;
  isr?: Maybe<Scalars['Float']>;
  puesto?: Maybe<Scalars['String']>;
  sueldo?: Maybe<Scalars['Float']>;
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
  filtrarEmpleados: Array<EmpleadoType>;
  instalaciones: Array<TelemetriaType>;
  notificaciones?: Maybe<Array<NotificacionType>>;
  rolesAsig?: Maybe<RolesType>;
  selecciones?: Maybe<SeleccionType>;
};


export type QueryDocsBusquedaGralArgs = {
  consulta?: InputMaybe<Scalars['String']>;
  enviadoPor?: InputMaybe<Scalars['ID']>;
  esEnviadoPor?: InputMaybe<Scalars['Boolean']>;
  usuario?: InputMaybe<Scalars['ID']>;
};


export type QueryDocsFechasArgs = {
  enviadoPor?: InputMaybe<Scalars['ID']>;
  esEnviadoPor?: InputMaybe<Scalars['Boolean']>;
  fechaFinal?: InputMaybe<Scalars['Int']>;
  fechaInicial?: InputMaybe<Scalars['Int']>;
  usuario?: InputMaybe<Scalars['ID']>;
};


export type QueryDocsRefArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  usuario?: InputMaybe<Scalars['ID']>;
};


export type QueryDocsUsuarioProcesoArgs = {
  enviadoPor?: InputMaybe<Scalars['ID']>;
  esEnviadoPor?: InputMaybe<Scalars['Boolean']>;
  proceso?: InputMaybe<Scalars['String']>;
  usuario?: InputMaybe<Scalars['ID']>;
};


export type QueryFiltrarDeptosArgs = {
  nombre: Scalars['String'];
};


export type QueryFiltrarEmpleadosArgs = {
  consulta: Scalars['String'];
};


export type QueryNotificacionesArgs = {
  idUsuario: Scalars['String'];
};


export type QueryRolesAsigArgs = {
  idEmpleado?: InputMaybe<Scalars['ID']>;
};

export type RecibosInput = {
  ano?: InputMaybe<Scalars['Int']>;
  costoKw?: InputMaybe<Scalars['Float']>;
  fecha?: InputMaybe<Scalars['Date']>;
  imgRecibo?: InputMaybe<Scalars['String']>;
  lecturaMedidor?: InputMaybe<Scalars['Float']>;
  lecturaRecibo?: InputMaybe<Scalars['Float']>;
  pago?: InputMaybe<Scalars['Float']>;
};

export type RecibosType = {
  __typename?: 'RecibosType';
  ano?: Maybe<Scalars['Int']>;
  costoKw?: Maybe<Scalars['Float']>;
  fecha?: Maybe<Scalars['Date']>;
  imgRecibo?: Maybe<Scalars['String']>;
  lecturaMedidor?: Maybe<Scalars['Float']>;
  lecturaRecibo?: Maybe<Scalars['Float']>;
  pago?: Maybe<Scalars['Float']>;
};

export type RegAvancesPbrInput = {
  _id?: InputMaybe<Scalars['ID']>;
  abril?: InputMaybe<Scalars['Float']>;
  agosto?: InputMaybe<Scalars['Float']>;
  diciembre?: InputMaybe<Scalars['Float']>;
  enero?: InputMaybe<Scalars['Float']>;
  esSumatoriaTotal?: InputMaybe<Scalars['Boolean']>;
  esSumatoriaTrim?: InputMaybe<Scalars['Boolean']>;
  febrero?: InputMaybe<Scalars['Float']>;
  idIndicador?: InputMaybe<Scalars['String']>;
  julio?: InputMaybe<Scalars['Float']>;
  junio?: InputMaybe<Scalars['Float']>;
  marzo?: InputMaybe<Scalars['Float']>;
  mayo?: InputMaybe<Scalars['Float']>;
  noviembre?: InputMaybe<Scalars['Float']>;
  octubre?: InputMaybe<Scalars['Float']>;
  septiembre?: InputMaybe<Scalars['Float']>;
};

export type RegEmpleadoInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  avatar?: InputMaybe<Scalars['String']>;
  calle?: InputMaybe<Scalars['String']>;
  colonia?: InputMaybe<Scalars['String']>;
  correo?: InputMaybe<Scalars['String']>;
  deptoId?: InputMaybe<Scalars['ID']>;
  fechaIngreso?: InputMaybe<Scalars['Int']>;
  modificadoPor?: InputMaybe<Array<ModificadoPorInput>>;
  nombreCompleto?: InputMaybe<Scalars['String']>;
  planeacionCentroGestor?: InputMaybe<Scalars['String']>;
  puesto?: InputMaybe<Array<PuestoInput>>;
  telefono?: InputMaybe<Array<TelefonoInput>>;
};

export type RegInstalacionInput = {
  instalacion?: InputMaybe<InstalacionInput>;
};

export type RegMirInput = {
  _id?: InputMaybe<Scalars['ID']>;
  avanceAnual?: InputMaybe<Scalars['Float']>;
  avanceTrim1?: InputMaybe<Scalars['Float']>;
  avanceTrim2?: InputMaybe<Scalars['Float']>;
  avanceTrim3?: InputMaybe<Scalars['Float']>;
  avanceTrim4?: InputMaybe<Scalars['Float']>;
  centroGestor?: InputMaybe<Scalars['String']>;
  correo?: InputMaybe<Scalars['String']>;
  dimension?: InputMaybe<Scalars['String']>;
  esActualizar?: InputMaybe<Scalars['Boolean']>;
  formulaAnual?: InputMaybe<Scalars['String']>;
  formulaTrim1?: InputMaybe<Scalars['String']>;
  formulaTrim2?: InputMaybe<Scalars['String']>;
  formulaTrim3?: InputMaybe<Scalars['String']>;
  formulaTrim4?: InputMaybe<Scalars['String']>;
  frecuenciaMedicion?: InputMaybe<Scalars['String']>;
  idEmpleado?: InputMaybe<Scalars['String']>;
  idIndicador?: InputMaybe<Scalars['String']>;
  lineaBaseAno?: InputMaybe<Scalars['Int']>;
  lineaBaseValor?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['Float']>;
  metodoCalculo?: InputMaybe<Scalars['String']>;
  nivel?: InputMaybe<Scalars['String']>;
  nombreDelIndicador?: InputMaybe<Scalars['String']>;
  programaFinanciacion?: InputMaybe<Scalars['String']>;
  responsable?: InputMaybe<Scalars['String']>;
  resumenNarrativo?: InputMaybe<Scalars['String']>;
  semefAmarillo?: InputMaybe<Scalars['Float']>;
  semefAmarilloV?: InputMaybe<Scalars['Float']>;
  semefRojo?: InputMaybe<Scalars['Float']>;
  semefRojoV?: InputMaybe<Scalars['Float']>;
  semefVerde?: InputMaybe<Scalars['Float']>;
  semefVerdeV?: InputMaybe<Scalars['Float']>;
  sentidoDelIndicador?: InputMaybe<Scalars['String']>;
  tipo?: InputMaybe<Scalars['String']>;
  unidadDeMedida?: InputMaybe<Scalars['String']>;
};

export type RegPbrInput = {
  _id?: InputMaybe<Scalars['ID']>;
  abril?: InputMaybe<Scalars['Float']>;
  agosto?: InputMaybe<Scalars['Float']>;
  ano?: InputMaybe<Scalars['Int']>;
  centroGestor?: InputMaybe<Scalars['String']>;
  correo?: InputMaybe<Scalars['String']>;
  dato?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  diciembre?: InputMaybe<Scalars['Float']>;
  enero?: InputMaybe<Scalars['Float']>;
  esActualizar?: InputMaybe<Scalars['Boolean']>;
  esSumatoriaTotal?: InputMaybe<Scalars['Boolean']>;
  esSumatoriaTrim?: InputMaybe<Scalars['Boolean']>;
  febrero?: InputMaybe<Scalars['Float']>;
  fechaCompleta?: InputMaybe<Scalars['String']>;
  idEmpleado?: InputMaybe<Scalars['ID']>;
  idIndicador?: InputMaybe<Scalars['String']>;
  julio?: InputMaybe<Scalars['Float']>;
  junio?: InputMaybe<Scalars['Float']>;
  marzo?: InputMaybe<Scalars['Float']>;
  mayo?: InputMaybe<Scalars['Float']>;
  noviembre?: InputMaybe<Scalars['Float']>;
  octubre?: InputMaybe<Scalars['Float']>;
  responsable?: InputMaybe<Scalars['String']>;
  septiembre?: InputMaybe<Scalars['Float']>;
  total?: InputMaybe<Scalars['Float']>;
  trim1?: InputMaybe<Scalars['Float']>;
  trim2?: InputMaybe<Scalars['Float']>;
  trim3?: InputMaybe<Scalars['Float']>;
  trim4?: InputMaybe<Scalars['Float']>;
  unidad?: InputMaybe<Scalars['String']>;
  variableOrigen?: InputMaybe<Scalars['String']>;
};

export type RolesInput = {
  _id?: InputMaybe<Scalars['ID']>;
  idEmpleado?: InputMaybe<Scalars['ID']>;
  roles?: InputMaybe<Array<Scalars['JSONObject']>>;
};

export type RolesType = {
  __typename?: 'RolesType';
  _id?: Maybe<Scalars['ID']>;
  idEmpleado?: Maybe<Scalars['ID']>;
  roles?: Maybe<Array<Scalars['JSONObject']>>;
};

export type SeleccionInput = {
  _id?: InputMaybe<Scalars['ID']>;
  centroGestor?: InputMaybe<Array<Scalars['String']>>;
  dimension?: InputMaybe<Array<Scalars['String']>>;
  frecuencia?: InputMaybe<Array<Scalars['String']>>;
  tipo?: InputMaybe<Array<Scalars['String']>>;
  unidad?: InputMaybe<Array<Scalars['String']>>;
};

export type SeleccionType = {
  __typename?: 'SeleccionType';
  _id?: Maybe<Scalars['ID']>;
  centroGestor?: Maybe<Array<Scalars['String']>>;
  dimension?: Maybe<Array<Scalars['String']>>;
  frecuencia?: Maybe<Array<Scalars['String']>>;
  tipo?: Maybe<Array<Scalars['String']>>;
  unidad?: Maybe<Array<Scalars['String']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notificar: NotificacionType;
  rolCambiado: LoginRespuestaType;
};


export type SubscriptionNotificarArgs = {
  idUsuario: Scalars['String'];
};


export type SubscriptionRolCambiadoArgs = {
  _id: Scalars['String'];
};

export type TelefonoInput = {
  numero?: InputMaybe<Scalars['String']>;
};

export type TelefonoType = {
  __typename?: 'TelefonoType';
  numero?: Maybe<Scalars['String']>;
};

export type TelemetriaInput = {
  _id?: InputMaybe<Scalars['ID']>;
  bombas?: InputMaybe<Array<BombaInput>>;
  instalacion?: InputMaybe<InstalacionInput>;
  medidores?: InputMaybe<Array<MedidorInput>>;
  motores?: InputMaybe<Array<MotorInput>>;
};

export type TelemetriaType = {
  __typename?: 'TelemetriaType';
  _id?: Maybe<Scalars['ID']>;
  bombas?: Maybe<Array<BombaType>>;
  instalacion?: Maybe<InstalacionType>;
  medidores?: Maybe<Array<MedidorType>>;
  motores?: Maybe<Array<MotorType>>;
};

export type TomarMedicionInput = {
  _id?: InputMaybe<Scalars['ID']>;
  abril?: InputMaybe<Scalars['Float']>;
  agosto?: InputMaybe<Scalars['Float']>;
  ano?: InputMaybe<Scalars['Int']>;
  diciembre?: InputMaybe<Scalars['Float']>;
  enero?: InputMaybe<Scalars['Float']>;
  febrero?: InputMaybe<Scalars['Float']>;
  julio?: InputMaybe<Scalars['Float']>;
  junio?: InputMaybe<Scalars['Float']>;
  marzo?: InputMaybe<Scalars['Float']>;
  mayo?: InputMaybe<Scalars['Float']>;
  noviembre?: InputMaybe<Scalars['Float']>;
  octubre?: InputMaybe<Scalars['Float']>;
  septiembre?: InputMaybe<Scalars['Float']>;
  tipoNivel?: InputMaybe<Scalars['String']>;
};

export type UnionTele = ErroresType | TelemetriaType;

export type UploadInput = {
  carpeta?: InputMaybe<Scalars['String']>;
  eliminar?: InputMaybe<Scalars['Boolean']>;
  file?: InputMaybe<Array<Scalars['Upload']>>;
  /** Es la url A eliminar en caso de que sea remplazar o eliminar el archivo */
  url?: InputMaybe<Scalars['String']>;
};

export type FragAuthFragment = { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null };

export type FragDatosSesionFragment = { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } };

export type RegistroSesionMutationVariables = Exact<{
  _id: Scalars['String'];
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
  _id: Scalars['String'];
}>;


export type RolCambiadoSubscription = { __typename?: 'Subscription', rolCambiado: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } } } };

export type LoginMutationVariables = Exact<{
  login: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } } } | null };

export type ActualizarAvatarMutationVariables = Exact<{
  _id: Scalars['String'];
  url: Scalars['String'];
}>;


export type ActualizarAvatarMutation = { __typename?: 'Mutation', actualizarAvatar: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } } } };

export type FragRolesFragment = { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null };

export type CrearRolesMutationVariables = Exact<{
  args: CrearRolInput;
}>;


export type CrearRolesMutation = { __typename?: 'Mutation', crearRoles?: { __typename?: 'RolesType', _id?: string | null, idEmpleado?: string | null, roles?: Array<any> | null } | null };

export type RolesAsigQueryVariables = Exact<{
  idEmpleado: Scalars['ID'];
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
  usuario?: InputMaybe<Scalars['ID']>;
  esEnviadoPor?: InputMaybe<Scalars['Boolean']>;
  enviadoPor?: InputMaybe<Scalars['ID']>;
  proceso: Scalars['String'];
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
  _id: Scalars['String'];
}>;


export type DocFinalizarMutation = { __typename?: 'Mutation', docFinalizar: { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null } };

export type ReasignarUsuarioMutationVariables = Exact<{
  usuarios: DocReasignarUsuarioInput;
}>;


export type ReasignarUsuarioMutation = { __typename?: 'Mutation', reasignarUsuario: { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null } };

export type DocsFechasQueryVariables = Exact<{
  usuario: Scalars['ID'];
  enviadoPor: Scalars['ID'];
  fechaInicial?: InputMaybe<Scalars['Int']>;
  fechaFinal?: InputMaybe<Scalars['Int']>;
  esEnviadoPor: Scalars['Boolean'];
}>;


export type DocsFechasQuery = { __typename?: 'Query', docsFechas: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type DocsBusquedaGralQueryVariables = Exact<{
  usuario: Scalars['ID'];
  consulta: Scalars['String'];
  enviadoPor: Scalars['ID'];
  esEnviadoPor: Scalars['Boolean'];
}>;


export type DocsBusquedaGralQuery = { __typename?: 'Query', docsBusquedaGral: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type DocsRefQueryVariables = Exact<{
  _id: Scalars['ID'];
  usuario: Scalars['ID'];
}>;


export type DocsRefQuery = { __typename?: 'Query', docsRef: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type DocRefFolioMutationVariables = Exact<{
  entradas: DocRefFolioInput;
}>;


export type DocRefFolioMutation = { __typename?: 'Mutation', docRefFolio: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, seguimiento: string, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, esRef?: boolean | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null, resolveEmpleadoEnviado?: Array<{ __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null }> | null }> };

export type FragNotificacionFragment = { __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null };

export type NotificacionesQueryVariables = Exact<{
  idUsuario: Scalars['String'];
}>;


export type NotificacionesQuery = { __typename?: 'Query', notificaciones?: Array<{ __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null }> | null };

export type NotificarSubscriptionVariables = Exact<{
  idUsuario: Scalars['String'];
}>;


export type NotificarSubscription = { __typename?: 'Subscription', notificar: { __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null } };

export type EliminarNotMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type EliminarNotMutation = { __typename?: 'Mutation', eliminarNot: { __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null } };

export type EliminarTodosMutationVariables = Exact<{
  idUsuario: Scalars['String'];
}>;


export type EliminarTodosMutation = { __typename?: 'Mutation', eliminarTodos: number };

export type FragDeptosFragment = { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null };

export type DepartamentosQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartamentosQuery = { __typename?: 'Query', deptos: Array<{ __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null }> };

export type FiltrarDeptosQueryVariables = Exact<{
  nombre: Scalars['String'];
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

export type FiltrarEmpleadosQueryVariables = Exact<{
  consulta: Scalars['String'];
}>;


export type FiltrarEmpleadosQuery = { __typename?: 'Query', filtrarEmpleados: Array<{ __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, roles?: Array<any> | null, estatus?: string | null, guards?: Array<string> | null, controles?: Array<string> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null, puestos?: Array<string> | null } | null }> };

export type CrearEmpleadoMutationVariables = Exact<{
  empleadoDatos: RegEmpleadoInput;
}>;


export type CrearEmpleadoMutation = { __typename?: 'Mutation', crearEmpleado: { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, telefono?: Array<{ __typename?: 'TelefonoType', numero?: string | null }> | null } };

export type FragPuestoFragment = { __typename?: 'PuestoType', puesto?: string | null, activo?: boolean | null, fechaAsignacion?: number | null, isr?: number | null, sueldo?: number | null };

export type FragMirFragment = { __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null };

export type FragPbrFragment = { __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null };

export type FragPlaneacionFragment = { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null }> | null };

export type FilTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type FilTodosQuery = { __typename?: 'Query', filTodos: Array<{ __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null }> | null }> };

export type InicializarPlaneacionMutationVariables = Exact<{
  input: PlaneacionInput;
}>;


export type InicializarPlaneacionMutation = { __typename?: 'Mutation', inicializarPlaneacion: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null }> | null } };

export type RegMirMutationVariables = Exact<{
  datos: RegMirInput;
}>;


export type RegMirMutation = { __typename?: 'Mutation', regMir: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null }> | null } };

export type RegPbrMutationVariables = Exact<{
  datos: RegPbrInput;
}>;


export type RegPbrMutation = { __typename?: 'Mutation', regPbr: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null }> | null } };

export type ActualizarResponsableMutationVariables = Exact<{
  _id: Scalars['ID'];
  idEmpleado: Scalars['ID'];
  correo?: InputMaybe<Scalars['String']>;
  responsable: Scalars['String'];
  idEmpleadoAnterior: Scalars['ID'];
  cuestionario: Scalars['String'];
}>;


export type ActualizarResponsableMutation = { __typename?: 'Mutation', actualizarResponsable: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null }> | null } };

export type EliminarElementoMutationVariables = Exact<{
  _id: Scalars['ID'];
  idIndicador: Scalars['String'];
  cuestionario: Scalars['String'];
}>;


export type EliminarElementoMutation = { __typename?: 'Mutation', eliminarElemento: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null }> | null } };

export type RegAvancePbrMutationVariables = Exact<{
  datos: RegAvancesPbrInput;
}>;


export type RegAvancePbrMutation = { __typename?: 'Mutation', regAvancePbr: { __typename?: 'PlaneacionType', _id?: string | null, ano?: number | null, descripcion?: string | null, mirCuestionario?: Array<{ __typename?: 'MirCuestionarioType', idIndicador?: string | null, correo?: string | null, responsable?: string | null, idEmpleado?: string | null, nivel?: string | null, programaFinanciacion?: string | null, resumenNarrativo?: string | null, centroGestor?: string | null, nombreDelIndicador?: string | null, tipo?: string | null, dimension?: string | null, metodoCalculo?: string | null, unidadDeMedida?: string | null, frecuenciaMedicion?: string | null, lineaBaseAno?: number | null, lineaBaseValor?: string | null, meta?: number | null, sentidoDelIndicador?: string | null, semefVerde?: number | null, semefVerdeV?: number | null, semefAmarillo?: number | null, semefAmarilloV?: number | null, semefRojo?: number | null, semefRojoV?: number | null, avanceTrim1?: number | null, avanceTrim2?: number | null, avanceTrim3?: number | null, avanceAnual?: number | null, avanceTrim4?: number | null, formulaTrim1?: string | null, formulaTrim2?: string | null, formulaTrim3?: string | null, formulaTrim4?: string | null, formulaAnual?: string | null }> | null, pbrCuestionario?: Array<{ __typename?: 'PbrType', idIndicador?: string | null, fechaCompleta?: string | null, variableOrigen?: string | null, dato?: string | null, unidad?: string | null, descripcion?: string | null, centroGestor?: string | null, idEmpleado?: string | null, correo?: string | null, responsable?: string | null, enero?: number | null, febrero?: number | null, marzo?: number | null, trim1?: number | null, abril?: number | null, mayo?: number | null, junio?: number | null, trim2?: number | null, julio?: number | null, agosto?: number | null, septiembre?: number | null, trim3?: number | null, octubre?: number | null, noviembre?: number | null, diciembre?: number | null, trim4?: number | null, total?: number | null, esSumatoriaTrim?: boolean | null, esSumatoriaTotal?: boolean | null }> | null } };

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
  formulaTrim1
  formulaTrim2
  formulaTrim3
  formulaTrim4
  formulaAnual
}
    `;
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
  esSumatoriaTrim
  esSumatoriaTotal
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
}
    ${FragMirFragmentDoc}
${FragPbrFragmentDoc}`;
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
export const FiltrarEmpleadosDocument = gql`
    query filtrarEmpleados($consulta: String!) {
  filtrarEmpleados(consulta: $consulta) {
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
  export class FiltrarEmpleadosGQL extends Apollo.Query<FiltrarEmpleadosQuery, FiltrarEmpleadosQueryVariables> {
    document = FiltrarEmpleadosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CrearEmpleadoDocument = gql`
    mutation crearEmpleado($empleadoDatos: RegEmpleadoInput!) {
  crearEmpleado(empleadoDatos: $empleadoDatos) {
    ...fragEmpleado
    telefono {
      ...fragTelefono
    }
  }
}
    ${FragEmpleadoFragmentDoc}
${FragTelefonoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CrearEmpleadoGQL extends Apollo.Mutation<CrearEmpleadoMutation, CrearEmpleadoMutationVariables> {
    document = CrearEmpleadoDocument;
    
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