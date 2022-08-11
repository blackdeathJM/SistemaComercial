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

export type Mutation = {
  __typename?: 'Mutation';
  actualizarDepto: DeptoType;
  crearDepto: DeptoType;
  eliminarDepto: DeptoType;
};


export type MutationActualizarDeptoArgs = {
  input: DeptoInput;
};


export type MutationCrearDeptoArgs = {
  input: DeptoInput;
};


export type MutationEliminarDeptoArgs = {
  _id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  deptos: Array<DeptoType>;
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

export const FragDeptosFragmentDoc = gql`
    fragment fragDeptos on DeptoType {
  _id
  nombre
  centroGestor
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