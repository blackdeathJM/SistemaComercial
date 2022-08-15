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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthInput = {
  _id?: InputMaybe<Scalars['String']>;
  contrasena?: InputMaybe<Scalars['String']>;
  correo?: InputMaybe<Scalars['String']>;
  rol?: InputMaybe<Array<RolInput>>;
  usuario?: InputMaybe<Scalars['String']>;
};

export type AuthType = {
  __typename?: 'AuthType';
  _id?: Maybe<Scalars['String']>;
  contrasena?: Maybe<Scalars['String']>;
  correo?: Maybe<Scalars['String']>;
  rol: Array<RolType>;
  usuario?: Maybe<Scalars['String']>;
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

export type EmpleadoInput = {
  _id?: InputMaybe<Scalars['String']>;
  activo?: InputMaybe<Scalars['Boolean']>;
  auth?: InputMaybe<AuthInput>;
  avatar?: InputMaybe<Scalars['String']>;
  calle?: InputMaybe<Scalars['String']>;
  colonia?: InputMaybe<Scalars['String']>;
  deptoId?: InputMaybe<Scalars['String']>;
  fechaBaja?: InputMaybe<Scalars['DateTime']>;
  fechaIngreso?: InputMaybe<Scalars['DateTime']>;
  modificadoPor?: InputMaybe<Array<Scalars['String']>>;
  nombreCompleto?: InputMaybe<Scalars['String']>;
  puesto?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
};

export type EmpleadoType = {
  __typename?: 'EmpleadoType';
  _id?: Maybe<Scalars['String']>;
  activo: Scalars['Boolean'];
  auth?: Maybe<AuthType>;
  avatar?: Maybe<Scalars['String']>;
  calle?: Maybe<Scalars['String']>;
  colonia?: Maybe<Scalars['String']>;
  deptoId?: Maybe<Scalars['String']>;
  fechaBaja?: Maybe<Scalars['DateTime']>;
  fechaIngreso?: Maybe<Scalars['DateTime']>;
  modificadoPor?: Maybe<Array<Scalars['String']>>;
  nombreCompleto?: Maybe<Scalars['String']>;
  puesto?: Maybe<Scalars['String']>;
  telefono?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  contrasena?: InputMaybe<Scalars['String']>;
  usuario?: InputMaybe<Scalars['String']>;
};

export type LoginRespuestaType = {
  __typename?: 'LoginRespuestaType';
  empleado?: Maybe<EmpleadoType>;
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  actualizarDepto: DeptoType;
  asignarAuth: EmpleadoType;
  crearDepto: DeptoType;
  crearEmpleado: EmpleadoType;
  eliminarDepto: DeptoType;
  login?: Maybe<LoginRespuestaType>;
};


export type MutationActualizarDeptoArgs = {
  input: DeptoInput;
};


export type MutationAsignarAuthArgs = {
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

export type Query = {
  __typename?: 'Query';
  deptos: Array<DeptoType>;
  empleados: Array<EmpleadoType>;
};

export type RolInput = {
  departamentoId?: InputMaybe<Scalars['String']>;
  tipoAcceso?: InputMaybe<Scalars['String']>;
};

export type RolType = {
  __typename?: 'RolType';
  departamentoId?: Maybe<Scalars['String']>;
  tipoAcceso?: Maybe<Scalars['String']>;
};

export type FragEmpleadoFragment = { __typename?: 'EmpleadoType', _id?: string | null, nombreCompleto?: string | null, avatar?: string | null, activo: boolean, calle?: string | null, colonia?: string | null, fechaBaja?: any | null, fechaIngreso?: any | null, modificadoPor?: Array<string> | null, telefono?: string | null, puesto?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, correo?: string | null, rol: Array<{ __typename?: 'RolType', departamentoId?: string | null, tipoAcceso?: string | null }> } | null };

export type FragAuthFragment = { __typename?: 'AuthType', usuario?: string | null, correo?: string | null, rol: Array<{ __typename?: 'RolType', departamentoId?: string | null, tipoAcceso?: string | null }> };

export type FragRolFragment = { __typename?: 'RolType', departamentoId?: string | null, tipoAcceso?: string | null };

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', empleados: Array<{ __typename?: 'EmpleadoType', _id?: string | null, nombreCompleto?: string | null, avatar?: string | null, activo: boolean, calle?: string | null, colonia?: string | null, fechaBaja?: any | null, fechaIngreso?: any | null, modificadoPor?: Array<string> | null, telefono?: string | null, puesto?: string | null, auth?: { __typename?: 'AuthType', usuario?: string | null, correo?: string | null, rol: Array<{ __typename?: 'RolType', departamentoId?: string | null, tipoAcceso?: string | null }> } | null }> };

export const FragRolFragmentDoc = gql`
    fragment fragRol on RolType {
  departamentoId
  tipoAcceso
}
    `;
export const FragAuthFragmentDoc = gql`
    fragment fragAuth on AuthType {
  usuario
  correo
  rol {
    ...fragRol
  }
}
    ${FragRolFragmentDoc}`;
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
  modificadoPor
  telefono
  puesto
  auth {
    ...fragAuth
  }
}
    ${FragAuthFragmentDoc}`;
export const Document = gql`
    {
  empleados {
    ...fragEmpleado
  }
}
    ${FragEmpleadoFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GQL extends Apollo.Query<Query, QueryVariables> {
    document = Document;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }