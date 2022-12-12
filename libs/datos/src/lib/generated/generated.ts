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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  contrasena?: InputMaybe<Scalars['String']>;
  estatus?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Array<Scalars['JSON']>>;
  usuario?: InputMaybe<Scalars['String']>;
};

export type AuthType = {
  __typename?: 'AuthType';
  activo?: Maybe<Scalars['Boolean']>;
  contrasena?: Maybe<Scalars['String']>;
  estatus?: Maybe<Scalars['String']>;
  role?: Maybe<Array<Scalars['JSON']>>;
  usuario?: Maybe<Scalars['String']>;
};

export type CambioContrasenaInput = {
  _id?: InputMaybe<Scalars['ID']>;
  contrasena?: InputMaybe<Scalars['String']>;
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
};

export type DeptoType = {
  __typename?: 'DeptoType';
  _id?: Maybe<Scalars['ID']>;
  centroGestor?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
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
  resolveEmpleado?: InputMaybe<EmpleadoInput>;
  resolveEmpleadoEnviado?: InputMaybe<Array<EmpleadoInput>>;
  resolverEmpleadoFolio?: InputMaybe<EmpleadoInput>;
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
  deptoEmpleado?: InputMaybe<DeptoInput>;
  deptoId?: InputMaybe<Scalars['ID']>;
  fechaBaja?: InputMaybe<Scalars['Int']>;
  fechaIngreso?: InputMaybe<Scalars['Int']>;
  modificadoPor?: InputMaybe<Array<ModificadoPorInput>>;
  nombreCompleto?: InputMaybe<Scalars['String']>;
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
  telefono?: Maybe<Array<TelefonoType>>;
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

export type Mutation = {
  __typename?: 'Mutation';
  actualizarAvatar: LoginRespuestaType;
  actualizarContrasenaAdmin: EmpleadoType;
  actualizarDepto: DeptoType;
  asignarAuth: EmpleadoType;
  crearDepto: DeptoType;
  crearEmpleado: EmpleadoType;
  docActFolio: DocumentoType;
  docFinalizar: DocumentoType;
  docRefFolio: Array<DocumentoType>;
  eliminarDepto: DeptoType;
  eliminarNot: NotificacionType;
  eliminarTodos: Scalars['Int'];
  genFolioSinReg: Scalars['String'];
  login?: Maybe<LoginRespuestaType>;
  marcarLeido: NotificacionType;
  reasignarUsuario: DocumentoType;
  regDoc: DocumentoType;
  subirDocs: DocumentoType;
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


export type MutationAsignarAuthArgs = {
  _id: Scalars['String'];
  auth: AuthInput;
  modificadoPor: ModificadoPorInput;
};


export type MutationCrearDeptoArgs = {
  input: DeptoInput;
};


export type MutationCrearEmpleadoArgs = {
  empleadoDatos: RegEmpleadoInput;
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


export type MutationEliminarNotArgs = {
  _id: Scalars['String'];
};


export type MutationEliminarTodosArgs = {
  idUsuario: Scalars['String'];
};


export type MutationGenFolioSinRegArgs = {
  args: DocFolioInput;
};


export type MutationLoginArgs = {
  login: LoginInput;
};


export type MutationMarcarLeidoArgs = {
  _id: Scalars['String'];
};


export type MutationReasignarUsuarioArgs = {
  usuarios: DocReasignarUsuarioInput;
};


export type MutationRegDocArgs = {
  datos: DocRegInput;
  files?: InputMaybe<UploadInput>;
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

export type Query = {
  __typename?: 'Query';
  deptos: Array<DeptoType>;
  docsBusquedaGral: Array<DocumentoType>;
  docsFechas: Array<DocumentoType>;
  docsRef: Array<DocumentoType>;
  docsUsuarioProceso: Array<DocumentoType>;
  empleados: Array<EmpleadoType>;
  empleadosSesion: Array<EmpleadoType>;
  notificaciones?: Maybe<Array<NotificacionType>>;
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


export type QueryNotificacionesArgs = {
  idUsuario: Scalars['String'];
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
  telefono?: InputMaybe<Array<TelefonoInput>>;
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

export type UploadInput = {
  carpeta?: InputMaybe<Scalars['String']>;
  eliminar?: InputMaybe<Scalars['Boolean']>;
  file?: InputMaybe<Array<Scalars['Upload']>>;
  /** Es la url A eliminar en caso de que sea remplazar o eliminar el archivo */
  url?: InputMaybe<Scalars['String']>;
};

export type FragDeptosFragment = { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null };

export type DepartamentosQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartamentosQuery = { __typename?: 'Query', deptos: Array<{ __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null }> };

export type CrearDeptoMutationVariables = Exact<{
  input: DeptoInput;
}>;


export type CrearDeptoMutation = { __typename?: 'Mutation', crearDepto: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } };

export type ActualizarDeptoMutationVariables = Exact<{
  input: DeptoInput;
}>;


export type ActualizarDeptoMutation = { __typename?: 'Mutation', actualizarDepto: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } };

export type FragAuthFragment = { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null };

export type FragDatosSesionFragment = { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null } };

export type AsignarAuthMutationVariables = Exact<{
  _id: Scalars['String'];
  auth: AuthInput;
  modificadoPor: ModificadoPorInput;
}>;


export type AsignarAuthMutation = { __typename?: 'Mutation', asignarAuth: { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null } };

export type ActualizarContrasenaAdminMutationVariables = Exact<{
  datos: CambioContrasenaInput;
  modificadoPor: ModificadoPorInput;
}>;


export type ActualizarContrasenaAdminMutation = { __typename?: 'Mutation', actualizarContrasenaAdmin: { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null } };

export type RolCambiadoSubscriptionVariables = Exact<{
  _id: Scalars['String'];
}>;


export type RolCambiadoSubscription = { __typename?: 'Subscription', rolCambiado: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null } } } };

export type LoginMutationVariables = Exact<{
  login: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null } } } | null };

export type ActualizarAvatarMutationVariables = Exact<{
  _id: Scalars['String'];
  url: Scalars['String'];
}>;


export type ActualizarAvatarMutation = { __typename?: 'Mutation', actualizarAvatar: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, deptoId?: string | null, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null } } } };

export type FragTelefonoFragment = { __typename?: 'TelefonoType', numero?: string | null };

export type FragModificadoPorFragment = { __typename?: 'ModificadoPorType', fecha?: number | null, usuario?: string | null, accion?: string | null, valorAnterior?: Array<any> | null, valorActual?: Array<any> | null };

export type FragEmpleadoFragment = { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null };

export type EmpleadosQueryVariables = Exact<{ [key: string]: never; }>;


export type EmpleadosQuery = { __typename?: 'Query', empleados: Array<{ __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null, telefono?: Array<{ __typename?: 'TelefonoType', numero?: string | null }> | null, modificadoPor?: Array<{ __typename?: 'ModificadoPorType', fecha?: number | null, usuario?: string | null, accion?: string | null, valorAnterior?: Array<any> | null, valorActual?: Array<any> | null }> | null }> };

export type EmpleadosSesionQueryVariables = Exact<{ [key: string]: never; }>;


export type EmpleadosSesionQuery = { __typename?: 'Query', empleadosSesion: Array<{ __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<any> | null, estatus?: string | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null }> };

export type CrearEmpleadoMutationVariables = Exact<{
  empleadoDatos: RegEmpleadoInput;
}>;


export type CrearEmpleadoMutation = { __typename?: 'Mutation', crearEmpleado: { __typename?: 'EmpleadoType', _id?: string | null, avatar?: string | null, nombreCompleto?: string | null, calle?: string | null, colonia?: string | null, fechaIngreso?: number | null, fechaBaja?: number | null, activo?: boolean | null, correo?: string | null, deptoId?: string | null, telefono?: Array<{ __typename?: 'TelefonoType', numero?: string | null }> | null } };

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

export type MarcarLeidoMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type MarcarLeidoMutation = { __typename?: 'Mutation', marcarLeido: { __typename?: 'NotificacionType', _id?: string | null, idUsuario?: string | null, titulo?: string | null, imagen?: string | null, icono?: string | null, descripcion?: string | null, tiempo?: number | null, link?: string | null, leido?: boolean | null, usarRouter?: boolean | null } };

export type EliminarTodosMutationVariables = Exact<{
  idUsuario: Scalars['String'];
}>;


export type EliminarTodosMutation = { __typename?: 'Mutation', eliminarTodos: number };

export const FragDeptosFragmentDoc = gql`
    fragment fragDeptos on DeptoType {
  _id
  nombre
  centroGestor
}
    `;
export const FragAuthFragmentDoc = gql`
    fragment fragAuth on AuthType {
  usuario
  activo
  role
  estatus
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
export const AsignarAuthDocument = gql`
    mutation asignarAuth($_id: String!, $auth: AuthInput!, $modificadoPor: ModificadoPorInput!) {
  asignarAuth(_id: $_id, auth: $auth, modificadoPor: $modificadoPor) {
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
  export class AsignarAuthGQL extends Apollo.Mutation<AsignarAuthMutation, AsignarAuthMutationVariables> {
    document = AsignarAuthDocument;
    
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
export const MarcarLeidoDocument = gql`
    mutation marcarLeido($_id: String!) {
  marcarLeido(_id: $_id) {
    ...fragNotificacion
  }
}
    ${FragNotificacionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MarcarLeidoGQL extends Apollo.Mutation<MarcarLeidoMutation, MarcarLeidoMutationVariables> {
    document = MarcarLeidoDocument;
    
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