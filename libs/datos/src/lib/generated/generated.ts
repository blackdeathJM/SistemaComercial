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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ArchivoInput = {
  carpeta?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Array<Scalars['Upload']>>;
};

export type AuthInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  contrasena?: InputMaybe<Scalars['String']>;
  estatus?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Array<RolInput>>;
  usuario?: InputMaybe<Scalars['String']>;
};

export type AuthType = {
  __typename?: 'AuthType';
  activo?: Maybe<Scalars['Boolean']>;
  contrasena?: Maybe<Scalars['String']>;
  estatus?: Maybe<Scalars['String']>;
  role?: Maybe<Array<RolType>>;
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

export type DocsUsuarioProcesoInput = {
  ano?: InputMaybe<Scalars['Int']>;
  enviadoPor?: InputMaybe<Scalars['String']>;
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
  fechaLimiteEntrega?: InputMaybe<Scalars['Int']>;
  fechaRecepcion?: InputMaybe<Scalars['Int']>;
  fechaTerminado?: InputMaybe<Scalars['Int']>;
  folio?: InputMaybe<Scalars['String']>;
  identificadorDoc?: InputMaybe<Scalars['String']>;
  noSeguimiento: Scalars['Int'];
  proceso?: InputMaybe<Scalars['String']>;
  ref?: InputMaybe<Array<Scalars['String']>>;
  resolveEmpleado?: InputMaybe<EmpleadoInput>;
  resolverEmpleadoFolio?: InputMaybe<EmpleadoInput>;
  tipoDoc?: InputMaybe<Scalars['String']>;
  usuarioFolio?: InputMaybe<Scalars['String']>;
  usuarios?: InputMaybe<Array<Scalars['String']>>;
};

export type DocumentoRegInput = {
  ano?: InputMaybe<Scalars['Int']>;
  asunto?: InputMaybe<Scalars['String']>;
  comentario?: InputMaybe<Scalars['String']>;
  dependencia?: InputMaybe<Scalars['String']>;
  docUrl?: InputMaybe<Scalars['String']>;
  enviadoPor?: InputMaybe<Scalars['String']>;
  esInterno?: InputMaybe<Scalars['Boolean']>;
  fechaLimiteEntrega?: InputMaybe<Scalars['Int']>;
  fechaRecepcion?: InputMaybe<Scalars['Int']>;
  identificadorDoc?: InputMaybe<Scalars['String']>;
  noSeguimiento: Scalars['Int'];
  proceso?: InputMaybe<Scalars['String']>;
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
  fechaLimiteEntrega?: Maybe<Scalars['Int']>;
  fechaRecepcion?: Maybe<Scalars['Int']>;
  fechaTerminado?: Maybe<Scalars['Int']>;
  folio?: Maybe<Scalars['String']>;
  identificadorDoc?: Maybe<Scalars['String']>;
  noSeguimiento: Scalars['Int'];
  proceso?: Maybe<Scalars['String']>;
  ref?: Maybe<Array<Scalars['String']>>;
  resolveEmpleado?: Maybe<EmpleadoType>;
  resolverEmpleadoFolio?: Maybe<EmpleadoType>;
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
  nombreCompleto?: InputMaybe<Scalars['String']>;
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
  nombreCompleto?: Maybe<Scalars['String']>;
};

export type HijosInput = {
  hijos?: InputMaybe<Array<HijosInput>>;
  id?: InputMaybe<Scalars['String']>;
  oculto?: InputMaybe<Scalars['Boolean']>;
  tipoAcceso?: InputMaybe<Scalars['String']>;
  titulo?: InputMaybe<Scalars['String']>;
};

export type HijosType = {
  __typename?: 'HijosType';
  hijos?: Maybe<Array<HijosType>>;
  id?: Maybe<Scalars['String']>;
  oculto?: Maybe<Scalars['Boolean']>;
  tipoAcceso?: Maybe<Scalars['String']>;
  titulo?: Maybe<Scalars['String']>;
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

export type ModificadoInput = {
  accion?: InputMaybe<Scalars['String']>;
  fecha?: InputMaybe<Scalars['Int']>;
  usuario?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  actualizarContrasenaAdmin: EmpleadoType;
  actualizarDepto: DeptoType;
  actualizarRol: EmpleadoType;
  asignarAuth: EmpleadoType;
  crearDepto: DeptoType;
  crearEmpleado: EmpleadoType;
  eliminarDepto: DeptoType;
  login?: Maybe<LoginRespuestaType>;
  regDoc: DocumentoType;
  subirArchivo: Array<Scalars['String']>;
};


export type MutationActualizarContrasenaAdminArgs = {
  datos: CambioContrasenaInput;
};


export type MutationActualizarDeptoArgs = {
  input: DeptoInput;
};


export type MutationActualizarRolArgs = {
  _id: Scalars['String'];
  modificadoPor: ModificadoInput;
  rol: RolInput;
};


export type MutationAsignarAuthArgs = {
  _id: Scalars['String'];
  auth: AuthInput;
};


export type MutationCrearDeptoArgs = {
  input: DeptoInput;
};


export type MutationCrearEmpleadoArgs = {
  empleadoDatos: EmpleadoInput;
};


export type MutationEliminarDeptoArgs = {
  _id: Scalars['String'];
};


export type MutationLoginArgs = {
  login: LoginInput;
};


export type MutationRegDocArgs = {
  datos: DocumentoRegInput;
};


export type MutationSubirArchivoArgs = {
  files: ArchivoInput;
};

export type Query = {
  __typename?: 'Query';
  deptos: Array<DeptoType>;
  docsUsuarioProceso: Array<DocumentoType>;
  empleados: Array<EmpleadoType>;
  empleadosSesion: Array<EmpleadoType>;
};


export type QueryDocsUsuarioProcesoArgs = {
  datos: DocsUsuarioProcesoInput;
};

export type RolInput = {
  hijos?: InputMaybe<Array<HijosInput>>;
  id?: InputMaybe<Scalars['String']>;
  oculto?: InputMaybe<Scalars['Boolean']>;
  tipoAcceso?: InputMaybe<Scalars['String']>;
  titulo?: InputMaybe<Scalars['String']>;
};

export type RolType = {
  __typename?: 'RolType';
  hijos?: Maybe<Array<HijosType>>;
  id?: Maybe<Scalars['String']>;
  oculto?: Maybe<Scalars['Boolean']>;
  tipoAcceso?: Maybe<Scalars['String']>;
  titulo?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  rolCambiado: LoginRespuestaType;
};


export type SubscriptionRolCambiadoArgs = {
  _id: Scalars['String'];
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

export type EliminarDeptoMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type EliminarDeptoMutation = { __typename?: 'Mutation', eliminarDepto: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } };

export type FragAuthFragment = { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null };

export type FragRolFragment = { __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null };

export type FragDatosSesionFragment = { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null } };

export type AsignarAuthMutationVariables = Exact<{
  _id: Scalars['String'];
  auth: AuthInput;
}>;


export type AsignarAuthMutation = { __typename?: 'Mutation', asignarAuth: { __typename?: 'EmpleadoType', _id?: string | null, nombreCompleto?: string | null, avatar?: string | null, activo?: boolean | null, calle?: string | null, colonia?: string | null, fechaBaja?: number | null, fechaIngreso?: number | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null } };

export type ActualizarContrasenaAdminMutationVariables = Exact<{
  datos: CambioContrasenaInput;
}>;


export type ActualizarContrasenaAdminMutation = { __typename?: 'Mutation', actualizarContrasenaAdmin: { __typename?: 'EmpleadoType', _id?: string | null, nombreCompleto?: string | null, avatar?: string | null, activo?: boolean | null, calle?: string | null, colonia?: string | null, fechaBaja?: number | null, fechaIngreso?: number | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null } };

export type ActualizarRolMutationVariables = Exact<{
  _id: Scalars['String'];
  rol: RolInput;
  modificadoPor: ModificadoInput;
}>;


export type ActualizarRolMutation = { __typename?: 'Mutation', actualizarRol: { __typename?: 'EmpleadoType', _id?: string | null, nombreCompleto?: string | null, avatar?: string | null, activo?: boolean | null, calle?: string | null, colonia?: string | null, fechaBaja?: number | null, fechaIngreso?: number | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null } };

export type RolCambiadoSubscriptionVariables = Exact<{
  _id: Scalars['String'];
}>;


export type RolCambiadoSubscription = { __typename?: 'Subscription', rolCambiado: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null } } } };

export type LoginMutationVariables = Exact<{
  login: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginRespuestaType', token: string, datosSesion: { __typename?: 'DatosSesionType', _id: string, nombreCompleto: string, avatar?: string | null, activo: boolean, auth: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null } } } | null };

export type FragEmpleadoFragment = { __typename?: 'EmpleadoType', _id?: string | null, nombreCompleto?: string | null, avatar?: string | null, activo?: boolean | null, calle?: string | null, colonia?: string | null, fechaBaja?: number | null, fechaIngreso?: number | null, deptoId?: string | null };

export type EmpleadosQueryVariables = Exact<{ [key: string]: never; }>;


export type EmpleadosQuery = { __typename?: 'Query', empleados: Array<{ __typename?: 'EmpleadoType', _id?: string | null, nombreCompleto?: string | null, avatar?: string | null, activo?: boolean | null, calle?: string | null, colonia?: string | null, fechaBaja?: number | null, fechaIngreso?: number | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null }> };

export type EmpleadosSesionQueryVariables = Exact<{ [key: string]: never; }>;


export type EmpleadosSesionQuery = { __typename?: 'Query', empleadosSesion: Array<{ __typename?: 'EmpleadoType', _id?: string | null, nombreCompleto?: string | null, avatar?: string | null, activo?: boolean | null, calle?: string | null, colonia?: string | null, fechaBaja?: number | null, fechaIngreso?: number | null, deptoId?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, activo?: boolean | null, role?: Array<{ __typename?: 'RolType', id?: string | null, tipoAcceso?: string | null, oculto?: boolean | null, titulo?: string | null, hijos?: Array<{ __typename?: 'HijosType', titulo?: string | null, oculto?: boolean | null, tipoAcceso?: string | null, id?: string | null }> | null }> | null } | null, deptoEmpleado?: { __typename?: 'DeptoType', _id?: string | null, nombre?: string | null, centroGestor?: string | null } | null }> };

export type FragDocFragment = { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null };

export type RegDocMutationVariables = Exact<{
  datos: DocumentoRegInput;
}>;


export type RegDocMutation = { __typename?: 'Mutation', regDoc: { __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null } };

export type DocsUsuarioProcesoQueryVariables = Exact<{
  datos: DocsUsuarioProcesoInput;
}>;


export type DocsUsuarioProcesoQuery = { __typename?: 'Query', docsUsuarioProceso: Array<{ __typename?: 'DocumentoType', _id?: string | null, identificadorDoc?: string | null, folio?: string | null, tipoDoc?: string | null, esInterno?: boolean | null, dependencia?: string | null, comentario?: string | null, asunto?: string | null, docUrl?: string | null, acuseUrl?: string | null, fechaRecepcion?: number | null, fechaLimiteEntrega?: number | null, fechaTerminado?: number | null, proceso?: string | null, usuarioFolio?: string | null, enviadoPor?: string | null, ano?: number | null, ref?: Array<string> | null, usuarios?: Array<string> | null, resolveEmpleado?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null, avatar?: string | null } | null, resolverEmpleadoFolio?: { __typename?: 'EmpleadoType', nombreCompleto?: string | null } | null }> };

export type SubirArchivoMutationVariables = Exact<{
  files: ArchivoInput;
}>;


export type SubirArchivoMutation = { __typename?: 'Mutation', subirArchivo: Array<string> };

export const FragDeptosFragmentDoc = gql`
    fragment fragDeptos on DeptoType {
  _id
  nombre
  centroGestor
}
    `;
export const FragRolFragmentDoc = gql`
    fragment fragRol on RolType {
  id
  tipoAcceso
  oculto
  titulo
  hijos {
    titulo
    oculto
    tipoAcceso
    id
  }
}
    `;
export const FragAuthFragmentDoc = gql`
    fragment fragAuth on AuthType {
  usuario
  activo
  role {
    ...fragRol
  }
}
    ${FragRolFragmentDoc}`;
export const FragDatosSesionFragmentDoc = gql`
    fragment fragDatosSesion on DatosSesionType {
  _id
  nombreCompleto
  avatar
  activo
  auth {
    ...fragAuth
  }
}
    ${FragAuthFragmentDoc}`;
export const FragEmpleadoFragmentDoc = gql`
    fragment fragEmpleado on EmpleadoType {
  _id
  nombreCompleto
  avatar
  activo
  calle
  colonia
  fechaBaja
  fechaIngreso
  deptoId
}
    `;
export const FragDocFragmentDoc = gql`
    fragment fragDoc on DocumentoType {
  _id
  identificadorDoc
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
export const EliminarDeptoDocument = gql`
    mutation eliminarDepto($_id: String!) {
  eliminarDepto(_id: $_id) {
    ...fragDeptos
  }
}
    ${FragDeptosFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class EliminarDeptoGQL extends Apollo.Mutation<EliminarDeptoMutation, EliminarDeptoMutationVariables> {
    document = EliminarDeptoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AsignarAuthDocument = gql`
    mutation asignarAuth($_id: String!, $auth: AuthInput!) {
  asignarAuth(_id: $_id, auth: $auth) {
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
    mutation actualizarContrasenaAdmin($datos: CambioContrasenaInput!) {
  actualizarContrasenaAdmin(datos: $datos) {
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
export const ActualizarRolDocument = gql`
    mutation actualizarRol($_id: String!, $rol: RolInput!, $modificadoPor: ModificadoInput!) {
  actualizarRol(_id: $_id, rol: $rol, modificadoPor: $modificadoPor) {
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
  export class ActualizarRolGQL extends Apollo.Mutation<ActualizarRolMutation, ActualizarRolMutationVariables> {
    document = ActualizarRolDocument;
    
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
  }
}
    ${FragEmpleadoFragmentDoc}
${FragAuthFragmentDoc}
${FragDeptosFragmentDoc}`;

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
export const RegDocDocument = gql`
    mutation regDoc($datos: DocumentoRegInput!) {
  regDoc(datos: $datos) {
    ...fragDoc
    resolveEmpleado {
      nombreCompleto
      avatar
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
export const DocsUsuarioProcesoDocument = gql`
    query docsUsuarioProceso($datos: DocsUsuarioProcesoInput!) {
  docsUsuarioProceso(datos: $datos) {
    ...fragDoc
    resolveEmpleado {
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
  export class DocsUsuarioProcesoGQL extends Apollo.Query<DocsUsuarioProcesoQuery, DocsUsuarioProcesoQueryVariables> {
    document = DocsUsuarioProcesoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SubirArchivoDocument = gql`
    mutation subirArchivo($files: ArchivoInput!) {
  subirArchivo(files: $files)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SubirArchivoGQL extends Apollo.Mutation<SubirArchivoMutation, SubirArchivoMutationVariables> {
    document = SubirArchivoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }